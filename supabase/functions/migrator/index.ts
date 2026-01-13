import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Column mappings for different platforms
const columnMappings: Record<string, Record<string, string>> = {
  shopify: {
    "Title": "name",
    "Body (HTML)": "description",
    "Vendor": "category",
    "Type": "category",
    "Tags": "tags",
    "Variant Price": "price",
    "Variant Compare At Price": "compare_at_price",
    "Variant SKU": "sku",
    "Variant Barcode": "barcode",
    "Variant Inventory Qty": "quantity",
    "Image Src": "images",
  },
  woocommerce: {
    "Name": "name",
    "Description": "description",
    "Categories": "category",
    "Tags": "tags",
    "Regular price": "price",
    "Sale price": "compare_at_price",
    "SKU": "sku",
    "Stock": "quantity",
    "Images": "images",
  },
  generic: {
    "nome": "name",
    "name": "name",
    "titulo": "name",
    "title": "name",
    "descricao": "description",
    "description": "description",
    "preco": "price",
    "price": "price",
    "valor": "price",
    "categoria": "category",
    "category": "category",
    "estoque": "quantity",
    "stock": "quantity",
    "quantity": "quantity",
    "sku": "sku",
    "codigo": "sku",
    "imagem": "images",
    "image": "images",
    "images": "images",
  },
};

function parseCSV(csvText: string): Record<string, string>[] {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g, ""));
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map(v => v.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] || "";
    });
    rows.push(row);
  }

  return rows;
}

function mapColumns(row: Record<string, string>, platform: string): Record<string, any> {
  const mapping = { ...columnMappings.generic, ...columnMappings[platform] };
  const product: Record<string, any> = {};

  for (const [csvCol, dbCol] of Object.entries(mapping)) {
    const lowerCsvCol = csvCol.toLowerCase();
    for (const [key, value] of Object.entries(row)) {
      if (key.toLowerCase() === lowerCsvCol || key.toLowerCase().includes(lowerCsvCol)) {
        if (dbCol === "price" || dbCol === "compare_at_price" || dbCol === "quantity") {
          const numValue = parseFloat(value.replace(/[^\d.,]/g, "").replace(",", "."));
          product[dbCol] = isNaN(numValue) ? 0 : numValue;
        } else if (dbCol === "tags") {
          product[dbCol] = value.split(",").map(t => t.trim()).filter(Boolean);
        } else if (dbCol === "images") {
          product[dbCol] = value ? [value] : [];
        } else {
          product[dbCol] = value;
        }
        break;
      }
    }
  }

  return product;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { csvData, platform } = await req.json();

    if (!csvData) {
      return new Response(
        JSON.stringify({ error: "CSV é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Usuário não autenticado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse CSV
    const rows = parseCSV(csvData);
    console.log(`Parsed ${rows.length} rows from CSV`);

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "CSV vazio ou inválido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Map and insert products
    const insertedProducts = [];
    const errors = [];

    for (let i = 0; i < rows.length; i++) {
      const mappedProduct = mapColumns(rows[i], platform || "generic");

      if (!mappedProduct.name) {
        errors.push(`Linha ${i + 2}: Nome do produto não encontrado`);
        continue;
      }

      const { data: savedProduct, error: saveError } = await supabaseClient
        .from("products")
        .insert({
          user_id: user.id,
          name: mappedProduct.name,
          description: mappedProduct.description || "",
          price: mappedProduct.price || 0,
          compare_at_price: mappedProduct.compare_at_price || null,
          category: mappedProduct.category || "Importado",
          tags: mappedProduct.tags || [],
          sku: mappedProduct.sku || null,
          barcode: mappedProduct.barcode || null,
          quantity: mappedProduct.quantity || 0,
          images: mappedProduct.images || [],
          is_active: true,
        })
        .select()
        .single();

      if (saveError) {
        errors.push(`Linha ${i + 2}: ${saveError.message}`);
      } else if (savedProduct) {
        insertedProducts.push(savedProduct);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        platform: platform || "generic",
        rowsProcessed: rows.length,
        productsImported: insertedProducts.length,
        errors: errors.slice(0, 10), // Limit errors to first 10
        products: insertedProducts.slice(0, 5), // Return first 5 for preview
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in migrator function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AnalysisResult {
  metric: string;
  value: number;
  status: "good" | "warning" | "critical";
  suggestion: string;
  priority: "high" | "medium" | "low";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    // Fetch analytics data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [ordersResult, visitsResult, productsResult, storeResult] = await Promise.all([
      supabaseClient
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .gte("created_at", thirtyDaysAgo.toISOString()),
      supabaseClient
        .from("visits")
        .select("*")
        .eq("user_id", user.id)
        .gte("created_at", thirtyDaysAgo.toISOString()),
      supabaseClient
        .from("products")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true),
      supabaseClient
        .from("stores")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle(),
    ]);

    const orders = ordersResult.data || [];
    const visits = visitsResult.data || [];
    const products = productsResult.data || [];
    const store = storeResult.data;

    // Calculate metrics
    const totalVisits = visits.length;
    const totalOrders = orders.filter(o => o.status !== "pending").length;
    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const abandonedOrders = orders.filter(o => o.abandoned_at !== null).length;
    
    const conversionRate = totalVisits > 0 ? (totalOrders / totalVisits) * 100 : 0;
    const abandonmentRate = totalOrders + abandonedOrders > 0 
      ? (abandonedOrders / (totalOrders + abandonedOrders)) * 100 
      : 0;

    const totalRevenue = orders
      .filter(o => o.payment_status === "paid")
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Products without images
    const productsWithoutImages = products.filter(
      p => !p.images || p.images.length === 0
    ).length;

    // Products with low stock
    const lowStockProducts = products.filter(p => p.quantity < 5).length;

    // Build analysis results
    const results: AnalysisResult[] = [];

    // Conversion Rate Analysis
    if (conversionRate < 1) {
      results.push({
        metric: "Taxa de Conversão",
        value: conversionRate,
        status: "critical",
        suggestion: "🖼️ Melhore as fotos dos produtos e adicione descrições mais detalhadas",
        priority: "high",
      });
    } else if (conversionRate < 3) {
      results.push({
        metric: "Taxa de Conversão",
        value: conversionRate,
        status: "warning",
        suggestion: "💡 Adicione avaliações de clientes e selos de confiança",
        priority: "medium",
      });
    } else {
      results.push({
        metric: "Taxa de Conversão",
        value: conversionRate,
        status: "good",
        suggestion: "✅ Conversão saudável! Continue monitorando",
        priority: "low",
      });
    }

    // Abandonment Rate Analysis
    if (abandonmentRate > 50) {
      results.push({
        metric: "Taxa de Abandono",
        value: abandonmentRate,
        status: "critical",
        suggestion: "🛒 Ative o Recuperador de Vendas para enviar lembretes automáticos",
        priority: "high",
      });
    } else if (abandonmentRate > 30) {
      results.push({
        metric: "Taxa de Abandono",
        value: abandonmentRate,
        status: "warning",
        suggestion: "💬 Configure cupons de desconto para carrinhos abandonados",
        priority: "medium",
      });
    }

    // Products without images
    if (productsWithoutImages > 0) {
      results.push({
        metric: "Produtos sem Foto",
        value: productsWithoutImages,
        status: productsWithoutImages > 5 ? "critical" : "warning",
        suggestion: `📷 ${productsWithoutImages} produtos sem imagem. Adicione fotos de qualidade`,
        priority: productsWithoutImages > 5 ? "high" : "medium",
      });
    }

    // Low stock
    if (lowStockProducts > 0) {
      results.push({
        metric: "Estoque Baixo",
        value: lowStockProducts,
        status: "warning",
        suggestion: `📦 ${lowStockProducts} produtos com estoque baixo. Reponha antes de acabar`,
        priority: "medium",
      });
    }

    // Store configuration
    if (!store?.logo_url) {
      results.push({
        metric: "Logo da Loja",
        value: 0,
        status: "warning",
        suggestion: "🎨 Adicione um logo profissional para aumentar a credibilidade",
        priority: "medium",
      });
    }

    if (!store?.brand_voice) {
      results.push({
        metric: "Identidade da Marca",
        value: 0,
        status: "warning",
        suggestion: "🗣️ Configure a identidade verbal para ter uma comunicação consistente",
        priority: "low",
      });
    }

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    results.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return new Response(
      JSON.stringify({
        success: true,
        period: "30 dias",
        summary: {
          totalVisits,
          totalOrders,
          totalRevenue,
          conversionRate: conversionRate.toFixed(2),
          abandonmentRate: abandonmentRate.toFixed(2),
          avgOrderValue: avgOrderValue.toFixed(2),
          totalProducts: products.length,
        },
        checklist: results,
        criticalCount: results.filter(r => r.status === "critical").length,
        warningCount: results.filter(r => r.status === "warning").length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in growth-engine function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

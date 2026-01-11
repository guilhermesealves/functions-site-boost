import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendVerificationRequest {
  email: string;
  userId: string;
  name?: string;
  type?: 'signup' | 'resend';
}

const generateToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
};

const getVerificationEmailTemplate = (name: string, verifyUrl: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirme seu Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          <tr>
            <td style="padding: 48px 40px 32px; text-align: center; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
              <div style="font-size: 48px; margin-bottom: 16px;">✨</div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                Confirme seu Email
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px; font-size: 18px; color: #e0e0e0; line-height: 1.6;">
                Olá <strong style="color: #f97316;">${name}</strong>! 👋
              </p>
              <p style="margin: 0 0 32px; font-size: 16px; color: #a0a0a0; line-height: 1.7;">
                Você está a um clique de desbloquear todo o poder da Codia IA. Confirme seu email para começar a criar sites, logos e muito mais!
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding: 8px 0 32px;">
                    <a href="${verifyUrl}" style="display: inline-block; padding: 18px 48px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; border-radius: 12px; box-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);">
                      ✅ Confirmar Email
                    </a>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(234, 88, 12, 0.1) 100%); border-radius: 16px; border: 1px solid rgba(249, 115, 22, 0.3);">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <div style="font-size: 36px; margin-bottom: 12px;">🎁</div>
                    <p style="margin: 0 0 8px; font-size: 20px; font-weight: 700; color: #f97316;">
                      +15 Créditos Grátis
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #a0a0a0;">
                      Ao confirmar seu email
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin: 24px 0 0; font-size: 13px; color: #666; text-align: center;">
                ⏰ Este link expira em <strong style="color: #f97316;">60 minutos</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="margin: 0 0 8px; font-size: 12px; color: #666; text-align: center;">
                Se o botão não funcionar, copie e cole este link:
              </p>
              <p style="margin: 0 0 16px; font-size: 11px; color: #444; text-align: center; word-break: break-all;">
                ${verifyUrl}
              </p>
              <p style="margin: 0; font-size: 11px; color: #444; text-align: center;">
                Não solicitou esta conta? Ignore este email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Codia IA <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, userId, name, type = 'signup' }: SendVerificationRequest = await req.json();

    if (!email || !userId) {
      return new Response(
        JSON.stringify({ error: "Email e userId são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limit (max 3 emails per hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("email_verifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", oneHourAgo);

    if (count && count >= 3) {
      return new Response(
        JSON.stringify({ error: "Limite de reenvios atingido. Tente novamente em 1 hora." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = generateToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const { error: insertError } = await supabase
      .from("email_verifications")
      .insert({
        user_id: userId,
        email,
        token,
        type,
        expires_at: expiresAt.toISOString()
      });

    if (insertError) {
      console.error("Error storing verification:", insertError);
      throw new Error("Erro ao criar verificação");
    }

    await supabase
      .from("profiles")
      .update({
        verification_token: token,
        verification_token_expires: expiresAt.toISOString(),
        verification_sent_at: new Date().toISOString()
      })
      .eq("user_id", userId);

    const appUrl = Deno.env.get("APP_URL") || "https://codia.app";
    const verifyUrl = `${appUrl}/verify-email?token=${token}`;

    const displayName = name || email.split("@")[0];
    await sendEmail(
      email,
      "✅ Confirme seu email - Codia IA",
      getVerificationEmailTemplate(displayName, verifyUrl)
    );

    console.log("Verification email sent to:", email);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email de verificação enviado",
        expiresIn: 60
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-verification-email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erro ao enviar email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);

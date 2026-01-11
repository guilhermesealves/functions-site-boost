import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendWelcomeRequest {
  email: string;
  name?: string;
  referralCode?: string;
}

const getWelcomeEmailTemplate = (name: string, referralCode: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bem-vindo à Codia IA!</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 520px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          <tr>
            <td style="padding: 48px 40px 32px; text-align: center; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);">
              <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff;">
                Bem-vindo à Codia IA!
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px; font-size: 18px; color: #e0e0e0;">
                Olá <strong style="color: #f97316;">${name}</strong>! 🚀
              </p>
              <p style="margin: 0 0 32px; font-size: 16px; color: #a0a0a0; line-height: 1.7;">
                Sua conta está ativa e você está pronto para criar sites, logos e muito mais com inteligência artificial!
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.1) 100%); border-radius: 16px; border: 1px solid rgba(34, 197, 94, 0.3); margin-bottom: 24px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <div style="font-size: 36px; margin-bottom: 12px;">🎁</div>
                    <p style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #22c55e;">
                      15 Créditos Grátis
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #a0a0a0;">
                      Creditados na sua conta!
                    </p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" style="padding: 8px;">
                    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; text-align: center;">
                      <div style="font-size: 24px; margin-bottom: 8px;">🎨</div>
                      <p style="margin: 0; font-size: 13px; color: #a0a0a0;">Logos</p>
                    </div>
                  </td>
                  <td width="50%" style="padding: 8px;">
                    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; text-align: center;">
                      <div style="font-size: 24px; margin-bottom: 8px;">🌐</div>
                      <p style="margin: 0; font-size: 13px; color: #a0a0a0;">Sites</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 8px;">
                    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; text-align: center;">
                      <div style="font-size: 24px; margin-bottom: 8px;">📱</div>
                      <p style="margin: 0; font-size: 13px; color: #a0a0a0;">Posts</p>
                    </div>
                  </td>
                  <td width="50%" style="padding: 8px;">
                    <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; text-align: center;">
                      <div style="font-size: 24px; margin-bottom: 8px;">✨</div>
                      <p style="margin: 0; font-size: 13px; color: #a0a0a0;">Branding</p>
                    </div>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding: 32px 0 16px;">
                    <a href="https://codia.app/builder" style="display: inline-block; padding: 18px 48px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: #ffffff; font-size: 16px; font-weight: 700; text-decoration: none; border-radius: 12px; box-shadow: 0 8px 24px rgba(249, 115, 22, 0.4);">
                      🚀 Começar Agora
                    </a>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(255,255,255,0.03); border-radius: 12px; margin-top: 16px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 8px; font-size: 13px; color: #666;">
                      Indique amigos e ganhe créditos!
                    </p>
                    <p style="margin: 0; font-size: 16px; font-weight: 700; color: #f97316; letter-spacing: 2px;">
                      ${referralCode}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="margin: 0; font-size: 12px; color: #444; text-align: center;">
                Precisa de ajuda? Responda este email.<br>
                © 2024 Codia IA. Todos os direitos reservados.
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
    const { email, name, referralCode }: SendWelcomeRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const displayName = name || email.split("@")[0];
    const code = referralCode || "CODIA2024";

    await sendEmail(
      email,
      "🎉 Bem-vindo à Codia IA! Seus 15 créditos estão prontos",
      getWelcomeEmailTemplate(displayName, code)
    );

    console.log("Welcome email sent to:", email);

    return new Response(
      JSON.stringify({ success: true, message: "Email de boas-vindas enviado" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-welcome-email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erro ao enviar email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);

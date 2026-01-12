import { useState } from "react";
import { toast } from "sonner";

interface UseToolsAIOptions {
  tool: string;
  onComplete?: (result: string) => void;
}

export const useToolsAI = ({ tool, onComplete }: UseToolsAIOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);

  const execute = async (action: string, data: Record<string, any>) => {
    setIsLoading(true);
    setResult("");
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tools-ai`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ tool, action, data }),
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Limite de requisições excedido. Aguarde alguns segundos.");
        }
        if (response.status === 402) {
          throw new Error("Créditos insuficientes. Adicione créditos para continuar.");
        }
        throw new Error("Erro ao processar sua solicitação");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Erro ao ler resposta");

      const decoder = new TextDecoder();
      let buffer = "";
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullContent += content;
              setResult(fullContent);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      onComplete?.(fullContent);
      return fullContent;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro desconhecido";
      setError(message);
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, result, error, setResult };
};

import fetch from "node-fetch"; // Certifique-se de que "node-fetch" está instalado

/**
 * Função para traduzir texto usando LibreTranslate
 * @param {string} text - Texto para traduzir
 * @param {string} targetLang - Idioma de destino (exemplo: 'pt')
 * @param {string} sourceLang - Idioma de origem (opcional, 'auto' para detecção automática)
 * @param {string} format - Formato do texto (padrão: 'text')
 * @param {number} alternatives - Número de alternativas de tradução (opcional)
 * @returns {Promise<Object>} - Resposta JSON da tradução
 */
export async function translate(text, targetLang, sourceLang = "auto", format = "text", alternatives = 1) {
  const url = "http://127.0.0.1:5000/translate";

  // Certifique-se de que 'text' seja uma string
  const stringifiedText = typeof text === "string" ? text : JSON.stringify(text);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        q: stringifiedText,
        source: sourceLang,
        target: targetLang,
        format: format,
        alternatives: alternatives,
        api_key: "" // Não há chave de API necessária para LibreTranslate local
      }),
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao traduzir texto:", error);
    throw error;
  }
}

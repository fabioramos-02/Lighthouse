import prisma from "./prisma"; // Certifique-se de ter o arquivo prisma.js configurado

export async function saveAnalysisToDB(analysisData) {
  const {
    siteUrl,
    score,
    performance,
    accessibility,
    bestPractices,
    seo,
    rawReport,
    relatorioTraduzido,
  } = analysisData;

  console.log("Preparando para salvar análise:", {
    siteUrl,
    score,
    performance,
    accessibility,
    bestPractices,
    seo,
    rawReport,
    relatorioTraduzido,
  });

  // Busca ou cria o site no banco de dados
  const site = await prisma.site.upsert({
    where: { url: siteUrl },
    update: {}, // Não atualiza nada se o site já existir
    create: {
      nome: "Site Desconhecido", // Defina um valor padrão ou obtenha de outra fonte
      url: siteUrl,
      orgao: "Desconhecido", // Valor padrão
      ativo: true,
    },
  });

  console.log("Site encontrado ou criado:", site);

  // Salva a análise associada ao site
  const savedAnalysis = await prisma.siteAnalysis.create({
    data: {
      siteId: site.id, // Relaciona a análise ao site correto
      siteUrl,
      score,
      performance,
      accessibility,
      bestPractices,
      seo,
      dataAnalise: new Date(),
      rawReport: rawReport || null,
      relatorioTraduzido: relatorioTraduzido || null,
    },
  });

  // console.log("Análise salva no banco de dados:", savedAnalysis);

  return savedAnalysis;
}

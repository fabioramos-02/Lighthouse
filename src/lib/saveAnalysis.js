import prisma from "./prisma"; // Certifique-se de ter o arquivo prisma.js configurado

export async function saveAnalysisToDB(analysisData) {
  const {
    siteUrl,
    score,
    performance,
    accessibility,
    bestPractices,
    seo,
    rawReport, // Relatório bruto
    relatorioTraduzido, // Relatório traduzido
  } = analysisData;

  // Busca ou cria o site no banco de dados
  const site = await prisma.site.upsert({
    where: { url: siteUrl },
    update: {}, // Não atualiza nada se o site já existir
    create: {
      nome: siteUrl, // Usa o URL como nome padrão (ajuste se necessário)
      url: siteUrl,
      orgao: "Desconhecido", // Defina um valor padrão ou obtenha de outro lugar
      ativo: true,
    },
  });

  // Salva a análise associada ao site encontrado ou criado
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
      rawReport: rawReport || null, // Salva o relatório bruto
      relatorioTraduzido: relatorioTraduzido || null, // Salva o relatório traduzido
    },
  });

  return savedAnalysis;
}

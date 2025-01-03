// lib/saveAnalysis.js
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

  const savedAnalysis = await prisma.siteAnalysis.create({
    data: {
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

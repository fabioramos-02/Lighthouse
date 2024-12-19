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
    jsonReport, // Adicionado para salvar o relatório JSON
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
      rawReport: jsonReport || null, // Garante que será nulo se não houver conteúdo
    },
  });

  return savedAnalysis;
}

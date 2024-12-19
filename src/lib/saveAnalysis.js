// lib/saveAnalysis.js
import prisma from './prisma'; // Certifique-se de ter o arquivo prisma.js configurado

export async function saveAnalysisToDB(analysisData) {
  const { siteUrl, score, performance, accessibility, bestPractices, seo } = analysisData;

  const savedAnalysis = await prisma.siteAnalysis.create({
    data: {
      siteUrl,
      score,
      performance,
      accessibility,
      bestPractices,
      seo,
      dataAnalise: new Date(),
    },
  });

  return savedAnalysis;
}

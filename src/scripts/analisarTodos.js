// scripts/analisarTodos.js
import fetch from 'node-fetch';
import fs from 'fs/promises';

const sites = JSON.parse(await fs.readFile('sites.json', 'utf-8'));

async function analisarSite(siteUrl) {
  const apiUrl = `http://localhost:3000/api/analisar?siteUrl=${encodeURIComponent(siteUrl)}&device=desktop`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
      console.log(`Análise concluída para: ${siteUrl}`);
    } else {
      console.error(`Erro na análise de ${siteUrl}:`, data.error);
    }
  } catch (error) {
    console.error(`Falha na requisição para ${siteUrl}:`, error.message);
  }
}

async function main() {
  for (const site of sites) {
    await analisarSite(site);
  }
  console.log('Todas as análises foram concluídas.');
}

main();

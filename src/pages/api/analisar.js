// pages/api/analisar.js
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import getConfig from "./unlighthouse.config";
import { saveAnalysisToDB } from "../../lib/saveAnalysis";

const execPromise = promisify(exec);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido, use GET" });
  }

  const { siteUrl, device = "desktop" } = req.query;

  if (!siteUrl) {
    return res.status(400).json({ error: 'Parâmetro "siteUrl" é obrigatório' });
  }

  // Define o diretório base de saída
  const baseOutputDir = path.resolve(process.cwd(), "reports");
  const tempConfigPath = path.resolve("unlighthouse.config.temp.ts");
  const jsonFilePath = path.join(baseOutputDir, "ci-result.json");

  try {
    // Obtemos a configuração dinâmica com a URL e o dispositivo
    const config = getConfig(siteUrl, device);

    // Escreve a configuração no arquivo temporário
    const configContent = `module.exports = ${JSON.stringify(
      config,
      null,
      2
    )};`;
    await fs.writeFile(tempConfigPath, configContent, "utf-8");

    // Comando para executar o Unlighthouse
    const command = `npx unlighthouse-ci \
      --config-file ${tempConfigPath} \
      --urls / \
      --reporter json \
      --output-path ${baseOutputDir}`;

    console.log(`Executando comando: ${command}`);

    // Executa o comando
    const { stdout, stderr } = await execPromise(command);

    if (stdout) console.log("Saída:", stdout);
    if (stderr) console.error("Erro:", stderr);

    // Lê o arquivo JSON gerado
    const fileData = await fs.readFile(jsonFilePath, "utf-8");
    const result = JSON.parse(fileData);

    // Remove o arquivo de configuração temporário
    await fs.unlink(tempConfigPath);

    // Extrai os dados da análise
    const analysis = result[0];
    const {
      score,
      performance,
      accessibility,
      "best-practices": bestPractices,
      seo,
    } = analysis;

    // Caminho do arquivo JSON gerado
    let jsonReport = null;
    try {
      const jsonReportPath = path.join(
        baseOutputDir,
        "reports",
        "lighthouse.json"
      );

      jsonReport = JSON.parse(await fs.readFile(jsonReportPath, "utf-8"));
    } catch (err) {
      jsonReport = null; // Define como nulo em caso de erro
    }
    // Salvar no banco de dados utilizando a função modularizada
    const savedAnalysis = await saveAnalysisToDB({
      siteUrl,
      score,
      performance,
      accessibility,
      bestPractices,
      seo,
      jsonReport,
    });

    return res.status(200).json({
      message: "Relatório gerado e salvo com sucesso",
      data: savedAnalysis,
    });
  } catch (error) {
    console.error("Erro:", error);
    return res.status(500).json({
      error: "Falha ao processar o relatório",
      details: error.message,
    });
  }
}

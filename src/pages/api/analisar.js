import { exec } from 'child_process';
import { promisify } from 'util';

//qual curl
// http://localhost:3000/api/analisar?siteUrl=
const execPromise = promisify(exec);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido, use GET' });
  }

  const { siteUrl } = req.query;

  if (!siteUrl) {
    return res.status(400).json({ error: 'Parâmetro "siteUrl" é obrigatório' });
  }

  try {
    // Executa o Unlighthouse CLI com o arquivo de configuração
    const command = `unlighthouse-ci --site ${siteUrl} --config-file unlighthouse.config.ts --reporter json`;
    const { stdout, stderr } = await execPromise(command);

    if (stderr) {
      return res.status(500).json({ error: 'Erro ao executar o Unlighthouse', details: stderr });
    }

    const result = JSON.parse(stdout); // Converte o JSON de saída
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Falha ao processar a URL', details: error.message });
  }
}

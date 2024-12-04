import express, { json, static as serveStatic } from 'express';
import cors from 'cors';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
app.use(json());
app.use(cors());

// Usando import.meta.url para obter o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Rota para servir arquivos estáticos (HTML, CSS, JS)
app.use(serveStatic(join(__dirname, '../public')));

// Rota para a análise (sem alteração)
app.get('/api/avaliar', async (req, res) => {
    const { url } = req.query;
    let resposta = { erro: false, conteudo: {} };

    try {
        const chrome = await launch({ chromeFlags: ['--headless'] });
        const options = {
            logLevel: 'info',
            output: 'json',
            onlyCategories: ['performance', 'accessibility', 'seo'],
            port: chrome.port,
        };

        const runnerResult = await lighthouse(url, options);
        await chrome.kill();

        const { performance, accessibility, seo } = runnerResult.lhr.categories;

        resposta.erro = false;
        resposta.conteudo = {
            performance: performance.score * 100,
            accessibility: accessibility.score * 100,
            seo: seo.score * 100,
        };

        return res.json(resposta);
    } catch (erro) {
        resposta.erro = true;
        resposta.conteudo = "Falha ao avaliar a página. Erro: " + erro;

        return res.json(resposta);
    }
});

// Rota padrão para exibir o formulário
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'));
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
    console.log('Acesse: http://localhost:3000');
});

export default {
  ci: {
    reporter: ["json"], // Relatório em formato JSON
  },
  site: "https://mscultural.ms.gov.br/", // Substitua pelo seu site
  debug: true, // Habilitar depuração, caso necessário
  excludeUrls: [
    "^https://mscultural.ms.gov.br/.*", // Expressão regular para excluir URLs
  ],
  includeUrls: [
    "^/$", // Apenas a página principal (índice)
  ],
  scanner: {
    device: "desktop", // Simulação de dispositivo de desktop
  },
};
//documentação unlighthouse
// https://unlighthouse.dev/integrations/ci#build-static-report

// comando CLI para executar somente a página principal
//unlighthouse https://mscultural.ms.gov.br --config-file unlighthouse.config.ts --urls /

// comanda CI para executar somente a página principal e salvar o resultado em json
// unlighthouse-ci --config-file unlighthouse.config.ts --urls / --reporter json --output-path ./resultado.json


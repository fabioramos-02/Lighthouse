export default {
    site: 'https://mscultural.ms.gov.br/',  // Substitua pelo seu site
    debug: true,  // Habilitar depuração, caso necessário
    excludeUrls: [
      '^https://mscultural.ms.gov.br/.*'  // Expressão regular para excluir URLs
    ],
    includeUrls: [
      '^/$'  // Apenas a página principal (índice)
    ],
    scanner: {
      device: 'desktop'  // Simulação de dispositivo de desktop
    }
  }
  
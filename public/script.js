

document
  .getElementById("siteForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Impede o envio tradicional do formulário

    const urlInput = document.getElementById("url").value;
    const csvInput = document.getElementById("csv").files[0];
    const resultDiv = document.getElementById("result");
    const loader = document.getElementById("loader");

    resultDiv.style.display = "none"; // Esconde o resultado anterior
    loader.style.display = "block"; // Exibe a animação de carregamento

    let formData = new FormData();
    if (urlInput) {
      formData.append("url", urlInput);
      // Envia a URL diretamente para a API
      const response = await fetch(
        "/api/avaliar?url=" + encodeURIComponent(urlInput),
        {
          method: "GET", // Usando GET para enviar a URL como parâmetro de consulta
        }
      );
      const data = await response.json();
      displayResults(data); // Chama displayResults após o fetch
    } else if (csvInput) {
      formData.append("csv", csvInput);
      // Processar o CSV
      const reader = new FileReader();
      reader.onload = async function (event) {
        const csvText = event.target.result;
        const urls = csvText
          .split("\n")
          .map((line) => line.split(",")[1].trim()); // Considerando que o CSV tem o formato "Nome, URL"
        let results = [];
        for (let url of urls) {
          const response = await fetch(
            `/api/avaliar?url=${encodeURIComponent(url)}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          results.push({ url, ...data });
        }
        displayResults(results); // Chama displayResults com os resultados do CSV
      };
      reader.readAsText(csvInput);
    }
  });
// Defina a função displayResults no escopo global
function displayResults(results) {
    const loader = document.getElementById("loader");
    const resultDiv = document.getElementById("result");
    const ctx = document.getElementById("resultChart").getContext("2d");
  
    loader.style.display = "none"; // Esconde a animação de carregamento
    resultDiv.style.display = "block"; // Exibe o gráfico de resultados
  
    let labels = ["Performance", "Acessibilidade", "SEO"];
    let data = {
      labels: labels,
      datasets: [], // Certifique-se de que datasets é inicializado corretamente
    };
  
    if (Array.isArray(results)) {
      results.forEach((result) => {
        const { performance, accessibility, seo } = result.conteudo;
        data.datasets.push({
          label: result.url,
          data: [performance, accessibility, seo],
          backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"],
          borderColor: ["#2980b9", "#27ae60", "#c0392b"],
          borderWidth: 1,
        });
      });
    } else {
      const { performance, accessibility, seo } = results.conteudo;
      data.datasets.push({
        label: "Resultado",
        data: [performance, accessibility, seo],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"],
        borderColor: ["#2980b9", "#27ae60", "#c0392b"],
        borderWidth: 1,
      });
    }
  
    new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
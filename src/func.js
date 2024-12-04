const url_api = 'http://localhost:3000/api';

var lista =[];
function avaliarSite(e){
    e.preventDefault();

    var url_site = document.getElementById('url_site').value;
    if(url_site == ''){
        alert('Informe a URL do site');
        return;
    }
    var url_request = url_api+ '/avaliar?url=' + url_site;

    fazerRequisicao(url_request).then(function  (response){
        if(response.erro){
            alert(response.conteudo);
            return;
        }

        var conteudo = response.conteudo;
        var performance = conteudo.categories.performance.score * 100;
        var acessibilidade = conteudo.categories.accessibility.score * 100;
        var seo = conteudo.categories.seo.score * 100;

        var item = {
            url: url_site,
            performance: performance,
            acessibilidade: acessibilidade,
            seo: seo
        };

        lista.push(item);
        atualizarTabela();
    });
}
const reqConteudo = new Request("markdown.html");

fetch(reqConteudo)
    .then(e => {
        document.body.innerHTML += e.text();
    })
    .catch(er => {
        alert("Erro ao exibir a página!");
    })

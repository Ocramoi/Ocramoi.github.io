const reqConteudo = new Request("https://raw.githubusercontent.com/Ocramoi/Ocramoi.github.io/master/pessoal/markdown.html");

fetch(reqConteudo)
    .then(e => {
        e.text().then(text => {
            document.getElementsByTagName('main')[0].innerHTML += text;
        });
    })
    .catch(er => {
        alert("Erro ao exibir a página!");
    })

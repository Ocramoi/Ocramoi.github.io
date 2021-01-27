const tempoTexto = "Tempo:",
      divMsg = document.getElementById("vitoria"),
      numImgs = 16;


var tempoInit,
    tempoTmout,
    jogoInit = false,
    pecas = document.getElementsByClassName("imgJogo"),
    possiveisImgs = [
        'Anfiteatro Vitória Régia - Dia.jpg',
        'Anfiteatro Vitória Régia pela noite.jpg',
        'Copaíba - Avenida Getúlio Vargas.jpg',
        'Copaíba - Avenida Getúlio Vargas, Silhueta.jpg',
        'Herma Ernesto Monte.jpg',
        'Herma Ernesto Monte - Perfil.jpg',
        'Leão - Avenida Nações Unidas, Frente.jpg',
        'Leão - Avenida Nações Unidas, Lado.jpg',
        'Locomotiva - Bosque da Comunidade, Frente.jpg',
        'Locomotiva - Bosque da Comunidade, Lado.jpg',
        'Luiz Zuiane - Busto, Frente.jpg',
        'Luiz Zuiane - Busto.jpg',
        'Monumento Índio Aimoré - Lauro de Souza Lima, Frente.jpg',
        'Monumento Índio Aimoré - Lauro de Souza Lima.jpg',
        'Placa das Nações.jpg',
        'Placa das Nações, Poema.jpg',
        'Pomba - Praça da Paz.jpg',
        'Pomba, Praça da Paz.jpg',
        'Praça das Cerejeiras - Ponte.jpg',
        'Praça do Líbano - Fonte.jpg',
        'Praça do Penta.jpg',
        'Praça Espanha.jpg',
        'Praça Itália.jpg'
    ],
    imgs = [],
    clickedImgs = [],
    clickTimeout = false,
    descobertas = 0;

document.getElementById("botComeco").onclick = (e) => {
    tempoInit = new Date();
    tempoTmout = setInterval(tempoUpdate, 1000);
    divMsg.style.display = "none";
}

window.onload = (e) => {
    divMsg.style.display = "table";

    for (let i = 0; i < numImgs/2; ++i) {
        let idx = Math.floor(Math.random() * possiveisImgs.length);
        imgs.push(possiveisImgs[idx]);
        imgs.push(possiveisImgs[idx]);
        possiveisImgs = possiveisImgs.filter(el => el != imgs[imgs.length - 1]);
    }

    for (let i = 0; i < numImgs; ++i) {
        pecas[i].onclick = (e) => pecaClick(e);
    }

    imgs = shuffle(imgs);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function tempoUpdate() {
    document.getElementById("tempo").innerText = `${tempoTexto} ${Math.round((new Date() - tempoInit)/1000)}s`;
}

function pecaClick(evento) {
    if (clickTimeout || (clickedImgs.includes(evento.target))) return;

    let idx = parseInt(evento.target.id);
    pecas[idx].src = `assets/imgs/${imgs[idx]}`;
    checkClicks(evento.target)
}

function fimDeJogo() {
    clearInterval(tempoTmout);
    divMsg.style.display = "block";
    divMsg.style.height = "90%";
    let textoVitoria = `Você venceu!<br>Seu tempo foi <b>${(new Date() - tempoInit)/1000} segundos</b><br><br><i>Imagens encontradas:</i><br><br>`,
        imgsRegistradas = [];
    for (let i = 0; i < imgs.length; ++i) {
        if (!(imgsRegistradas.includes(imgs[i]))) {
            imgsRegistradas.push(imgs[i]);
            textoVitoria += `<b>${imgs[i].split('.')[0]}</b><br><img src='assets/imgs/${imgs[i]}'><br>`;
        }
    }
    textoVitoria += "<br><button onclick='location.reload()'>Jogar novamente</button><br><br>";
    document.getElementById("textoVitoria").innerHTML = textoVitoria;
}

function checkClicks(clicada) {
    clickedImgs.push(clicada);
    console.log(clickedImgs);
    if (clickedImgs.length == 2) {
        if (clickedImgs[0].src === clickedImgs[1].src) {
            descobertas += 1;
            clickedImgs[0].onclick = clickedImgs[1].onclick = null;
            if (descobertas === 8) {
                fimDeJogo();
            }
            clickedImgs = [];
        }
        else {
            clickTimeout = true;
            setTimeout(() => { clickTimeout = false; clickedImgs[0].src = clickedImgs[1].src = ""; clickedImgs = []; }, 800);
        }
    }
}

class EntradaPopUp {
    constructor(
        header,
        titulo,
        texto,
        imagens,
        site,
        email,
        telefone
    ) {
        this.header = header;
        this.titulo = titulo;
        this.texto = texto;
        this.imagens = imagens;
        this.email = email;
        this.telefone = telefone,
        this.site = site;
    }
}

const popupDiv = document.getElementById("popup99"),
      popupEsquerda = document.getElementById("popupEsquerda"),
      popupDireita = document.getElementById("popupDireita"),
      popupFiltros = document.getElementById("filtrosPopup").children,
      popupThumbs = document.getElementById("thumbsPopup");

const valoresPopup = [
    [
        new EntradaPopUp(
            "https://img.ibxk.com.br/2020/06/25/25160731499532.jpg?w=1120&h=420&mode=crop&scale=both",
            "YouTube",
            "Site de compartilhamento de vídeos online.",
            [
                "https://yt3.ggpht.com/ytc/AKedOLTlTuiUdnqXk34_yknK3vhCf-8EW3AQsYvHDC1ZLw=s900-c-k-c0x00ffffff-no-rj",
                "https://img.ibxk.com.br/2019/06/03/03074401060004.jpg?w=1120&h=420&mode=crop&scale=both"
            ],
            "youtube.com",
            "yt@gmail.com",
            "+1 11-000",
        )
    ],
    [
        new EntradaPopUp(
            "https://img.ibxk.com.br/2017/07/07/07160155479276.jpg?w=1120&h=420&mode=crop&scale=both",
            "Twitter",
            "Rede social gratuita.",
            [
                "https://store-images.s-microsoft.com/image/apps.50484.9007199266244427.4d45042b-d7a5-4a83-be66-97779553b24d.2c71c1ea-c28f-4dd1-b72d-c43cdd3476f4",
                "https://www.showmetech.com.br/wp-content/uploads//2019/10/20-dicas-e-truques-do-twitter.jpg"
            ],
            "twitter.com",
            "twitter@gmail.com",
            "+1 00-111"
        )
    ]
]

function setPopup(obj) {
    document.getElementById("headerPopup").setAttribute("src", obj.header);
    document.getElementById("tituloPopup").innerText = obj.titulo;
    document.getElementById("linkPopup").innerText = obj.site;
    document.getElementById("mailPopup").innerText = obj.email;
    document.getElementById("phonePopup").innerText = obj.telefone;

    document.getElementById("txtPopup").innerHTML =
        `<b>RESUMO</b><br/><br/>${obj.texto}<br/><br/>`;

    document.getElementById("imgsTxtPopup").innerHTML = "";
    obj.imagens.forEach((link, idx) => {
        let curDom = document.createElement("img");

        curDom.setAttribute("src", link);
        curDom.setAttribute("style", "height: 50px");

        document.getElementById("imgsTxtPopup").appendChild(curDom);
    });
}

function evThumbs() {
    let thumbs = document.getElementsByClassName("thumbPopup");
    for (let i = 0; i < thumbs.length; ++i) {
        thumbs.item(i).addEventListener("click", (e) => {
            let idxs = thumbs.item(i).getAttribute("idxs").split(",");
            setPopup(
                valoresPopup[
                    parseInt(idxs[0])
                ][
                    parseInt(idxs[1])
                ]
            );
            document.getElementById("popup99").setAttribute("style", "display: grid;")
        });
    }
}

function popupInsereLista(ar, iter) {
    ar.forEach((obj, idx) => {
        let curObj = obj,
            curDom = document.createElement("img");

        curDom.setAttribute("src", curObj.header);
        curDom.setAttribute("style", "height: 70px");
        curDom.setAttribute("idxs", `${iter},${idx}`);
        curDom.setAttribute("class", "thumbPopup");

        popupThumbs.appendChild(curDom);
    });
}

function aplicaFiltro(idx) {
    popupThumbs.innerHTML = "";

    if (idx == 0) {
        valoresPopup.forEach((ar, idx) => {
            popupInsereLista(ar, idx);
        });
    } else
        popupInsereLista(valoresPopup[idx - 1], idx - 1);

    for (let i = 0; i < popupFiltros.length; ++i)
        popupFiltros.item(i).setAttribute("style", "background-color: white; color: black;");

    popupFiltros.item(idx).setAttribute("style", "background-color: black; color: white;")
    evThumbs();
}

for (let i = 0; i < popupFiltros.length; ++i) {
    popupFiltros.item(i).addEventListener("click", (e) => {
        aplicaFiltro(i);
    });
}

document.getElementById("fecharPopUp").addEventListener("click", (e) => {
    document.getElementById("popup99").setAttribute("style", "display: none;")
});

aplicaFiltro(0);

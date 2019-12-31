var musica = new Audio("mus.mp3"), corneta = new Audio("corn.mp3"), nComemora = 15, nPixels = 0.2, tempo = 3, objs = [], tempoComemora = 18000;

$(document).ready(()=>
{
    atualiza();
    setInterval(atualiza, 1000);
});

// $('body').on('keydown', ativa);

function atualiza()
{
    var d = new Date();
    var h = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    var m = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    var s = (d.getSeconds() < 10) ? "0" + d.getSeconds() : d.getSeconds();
    $('main').text(h+":"+m+":"+s);
    if(d.getFullYear() === 2020) { ativa(); }
}

function ativa()
{
    corneta.play(); musica.play(); comemora();
}

function tamanho(tam)
{
    $('main').css('font-size', tam)
}

function comemora()
{
    objs = [];
    for(var k = 0; k < nComemora; k++)
    {
        var $temp = $('<div class="com" style="left: ' + (Math.random() * 100 - 1) + "vw" + '; top: 100vh;">🎉</div>');
        $('body').append($temp);
        objs.push($temp);
    }
    objs.forEach(e => {
        setInterval(() => {sobe(e);}, tempo + Math.random()*tempo);
    });
    setTimeout(comemora, tempoComemora);
}

function sobe(obj)
{
    obj.css('top', obj.position().top - nPixels);
    if(obj.position().top <= -150) { obj.remove(); }
}
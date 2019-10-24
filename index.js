var musica = new Audio('minhamenina.mp3');
var flag = true;

$(document).ready((e) => { $('#mundo').draggable(); });

$(document).scroll(toca);

function toca()
{
    if(flag) 
    {
        let playPromise = musica.play();
        playPromise.catch(toca);
        playPromise.then(() => {flag = false;});
    } 
}
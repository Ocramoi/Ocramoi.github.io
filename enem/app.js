let musica = new Audio("assets/guns_of_brixton.mp3");

musica.loop = false;

let flag = false;

document.getElementById("play").addEventListener("click", () =>
{
    flag = !flag;
    if(flag)
    {
        document.getElementById("play").src = "assets/square.svg";
        musica.play();
    }
    else
    {
        document.getElementById("play").src = "assets/play-button.svg";
        musica.pause();
        musica = new Audio("assets/guns_of_brixton.mp3");
    }
});
let musica = new Audio("which_side_are_you_on_boys.mp3");
musica.loop = false;

let flag = false;

document.getElementById("play").addEventListener("click", () =>
{
    flag = !flag;
    if(flag)
    {
        document.getElementById("play").innerText = "☐";
        musica.play();
    }
    else
    {
        document.getElementById("play").innerText = "▷";
        musica.pause();
        musica = new Audio("which_side_are_you_on_boys.mp3");
    }
});
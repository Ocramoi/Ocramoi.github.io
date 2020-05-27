let menuComp = document.getElementById("menu");
let dropDown = document.getElementById("dropDown");
let menuState = false;

menuComp.addEventListener("click", () =>
{
    menuState = !menuState;
    if(menuState)
        dropDown.style.display = "block";
    else
        dropDown.style.display = "none";
})
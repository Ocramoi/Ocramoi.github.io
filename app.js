var icon = document.getElementById('iconeMenu');

window.addEventListener('load', event=>
{
    if('serviceWorker' in navigator)
    {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('Sw ok');
        } catch (error) {
            console.log('Sw error');
        }
    }
});

icon.addEventListener('click', function icone(e)
{
    var x = document.getElementById("menuInicial");
    if (x.className === "menuInit") {
        x.className += " responsive";
        icon.innerHTML='▲';
    } else {
        x.className = "menuInit";
        icon.innerHTML='▼';
    }
});
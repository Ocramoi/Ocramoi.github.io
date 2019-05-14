const tknMapBox = "pk.eyJ1Ijoib2NyYW1vaSIsImEiOiJjanZvOHJlcXcxdzEzNDRxcjd1ZWZiNm0wIn0.JMcj2yGoeojqmBKjP6EqKA";
var posx = -22.338563, posy = -49.026800, precisao = null;

if(!navigator.geolocation)
{
    alert('Seu navegador não permite que sua localização seja acessada, por favor navegue manualmente no mapa.');
}
else
{
    navigator.geolocation.getCurrentPosition(
        posicao=>
        {
            posx = posicao.coords.latitude;
            posy = posicao.coords.longitude;
            precisao = posicao.coords.accuracy;
            console.log(posicao.coords.accuracy);
            carregaMapa();
        },
        erro=>
        {
            alert('Erro ao acessar sua localização! Por favor navegue manualmente.<br>'+
                  'Erro: ' + erro.message);
            carregaMapa();
        }
    );
}

async function carregaMapa()
{
    var mapa = L.map('mapa', {
        center: [posx, posy],
        zoom: 15
    });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: tknMapBox
    }).addTo(mapa);

    if(precisao != null)
    {
        L.circle([posx, posy], {
            color: '#e01a68',
            fillColor: '#ffd6e6',
            fillOpacity: 0.5,
            radius: precisao
        }).addTo(mapa);
    }
}
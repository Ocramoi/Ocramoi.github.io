const tknMapBox = "pk.eyJ1Ijoib2NyYW1vaSIsImEiOiJjanZvOHJlcXcxdzEzNDRxcjd1ZWZiNm0wIn0.JMcj2yGoeojqmBKjP6EqKA";
const baseUrlPlaces = "https://places.cit.api.here.com/places/v1/discover/search?";
const opsUrlPlaces = ";r=5000&q=police-station&app_id=mXPKF0rXuX2B4sbsq9yA&app_code=PvubbGo7cP7S2Lfw2j-nSw";
const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=";
var posx = -22.338563, posy = -49.026800, precisao = null, mapa;

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
            carregaMapa();
            carregaDelegacias();
        },
        erro=>
        {
            alert('Erro ao acessar sua localização! Por favor navegue manualmente. '+
                  'Erro: ' + erro.message);
            carregaMapa();
            carregaDelegacias();
        }
    );
}

async function carregaMapa()
{
    mapa = L.map('mapa', {
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

async function carregaDelegacias()
{
    $.getJSON(baseUrlPlaces +
              "in="+posx+","+posy+
              opsUrlPlaces,
        function (data, textStatus, jqXHR) {
            data.results.items.forEach(delegacia => {
                var delx = delegacia.position[0], 
                    dely = delegacia.position[1];
                var iconePolicia = L.icon({
                    iconUrl: delegacia.icon,
                    
                    iconSize:     [60, 65], // size of the icon
                    iconAnchor:   [25, 65], // point of the icon which will correspond to marker's location
                    popupAnchor:  [0, -63] // point from which the popup should open relative to the iconAnchor
                });
                var del = L.marker([delx, dely],
                {
                    icon: iconePolicia,
                    title: delegacia.title,
                    alt: delegacia.title
                }).addTo(mapa);
                del.bindPopup("<b>"+delegacia.title+"</b><br/><a href='"+googleMapsUrl+delx+","+dely+"'>"+delegacia.vicinity+"</a>");
            });
        }
    );
}
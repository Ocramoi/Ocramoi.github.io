///
AOS.init();
///
$(document).ready(function () {
    $.getJSON("http://200.145.153.175/marcotoledo/data.php", data,
        function (data, textStatus, jqXHR) {
            $('#loadIndicators').append('<li data-target="#slider" data-slide-to="0" class="active"></li>');
            for(var a = 1; a < data.data.length; a++)
            {
                $('#loadIndicators').append('<li data-target="#slider" data-slide-to="'+a+'"></li>');
            }
            var cont = true;
            data.data.forEach(element => {
                if(cont)
                {
                    $('#loadSliderCont').append('<div class="carousel-item active"><img class="d-block w-100" src="'+element.img+'" alt="Reddit"><div class="carousel-caption"><h5>'+element.title+'</h5><p>Check out more under "extensions"</p></div></div>');
                }
                $('#loadSliderCont').append('<div class="carousel-item"><img class="d-block w-100" src="imgs/redditSlider.jpg" alt="Reddit"><div class="carousel-caption"><h5>Reddit Analyser</h5><p>Check out more under "extensions"</p></div></div>');
                cont = !cont;
            });
        }
    );
});
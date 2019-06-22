var altura = $(window).height(), posY;

$(document).ready(event =>
{
    controlaOpac();
});

$(window).scroll(event =>
{
    controlaOpac();
});

$(window).resize(event =>
{
    altura = $(window).height();
    controlaOpac();
})

function controlaOpac()
{
    posY = $(window).scrollTop();
    var porc = (posY/(altura-100));
    var opac = 1-porc;
    var txtOpac = 'opacity: ' + opac;
    if(opac >= 0)
    {
        $('#bv').css('opacity', opac);
    }
    else
    {
        $('#bv').css('opacity', 0);
    }
}
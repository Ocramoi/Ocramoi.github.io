let tecnicos =
[
    {img: 'marco.jpg', nome: 'Marco Toledo', nascimento: '13/11/2001', habilidades: 'Web full-stack, SQL, Python, C, C++, C#, Java, Unity, Android, outros.', face: 'https://www.facebook.com/marcoantonio.ribeirodetoledo', twitter: '0cramoi', mail: 'mardt@uol.com.br'},
    {img: 'beatriz.jpg', nome: 'Beatriz Garcia', nascimento: '24/10/2002', habilidades: 'PHP, SQL, HTML, C, C++, C#, Java, Unity, Arduino, outros.', face: 'https://www.facebook.com/beatriz.gimenesgarcia', twitter: 'biagimenes__', mail: 'biagimenesgarcia@gmail.com'},
    {img: 'andre.jpg', nome: 'André Creppe', nascimento: '06/08/2002', habilidades: 'PHP, SQL, HTML, C, C++, C#, Java, Unity, Swift, outros.', face: 'https://www.facebook.com/andrecreppe', twitter: 'andrecreppe', mail: 'andrecrepper@gmail.com'},
    {img: 'marcos.jpg', nome: 'Marcos Dias', nascimento: '12/09/2001', habilidades: 'PHP(OOP), SQL, CSS, JAVA, C, C#, arquitetura MVC, JS, Jquery, HTML, Arduino, ASP.NET, JSON, IONIC 4, outros.', face: 'https://www.facebook.com/marcos.josue.319', twitter: 'MarcosJosuCost1', mail: 'marcosdiasbing@gmail.com'}
];

for(let k = 0; k < tecnicos.length; k++)
{
    let imgArea, txtArea;
    if(k%2 === 0)
    {
        imgArea = 'esq';
        txtArea = 'dir';
    }
    else
    {
        imgArea = 'dir';
        txtArea = 'esq';
    }
    $('main').append('<div class="tec">'+
                        '<img src="imgs/'+tecnicos[k].img+'" alt="'+tecnicos[k].nome+'" style="grid-area: '+imgArea+';">'+
                        '<div class="textoTec" style="grid-area: '+txtArea+';">'+
                            '<b>Nome: </b>'+tecnicos[k].nome+'<br>'+
                            '<b>Nascimento: </b>'+tecnicos[k].nascimento+'<br>'+
                            '<b>Habilidades: </b>'+tecnicos[k].habilidades+'<br>'+
                            '<div class="contTec" id="'+k+'">Contato</div>'+
                        '</div>'+
                     '</div>');
}

$('.contTec').click(e =>
{
    let obj = tecnicos[e.currentTarget.id], contatos = '';

    if(obj.face != null)
    {
        contatos += '&nbsp;&nbsp;<a class="linksCont" href="'+obj.face+'"><i class="fab fa-facebook"></i>Facebook</a>&nbsp;&nbsp;<br>';
    }
    if(obj.twitter != null)
    {
        contatos += '&nbsp;&nbsp;<a class="linksCont" href="https://twitter.com/'+obj.twitter+'"><i class="fab fa-twitter"></i>@'+obj.twitter+'</a>&nbsp;&nbsp;<br>';
    }
    if(obj.mail != null)
    {
        contatos += '&nbsp;&nbsp;<a class="linksCont" href="mailto:'+obj.mail+'"><i class="fas fa-envelope"></i>Email</a>&nbsp;&nbsp;<br>';
    }

    if($(e.currentTarget).html() === 'Contato')
    {
        $(e.currentTarget).append('<div class="menuCont">'+contatos+'</div>');
    }
    else
    {
        $(e.currentTarget).html('Contato');
    }
});
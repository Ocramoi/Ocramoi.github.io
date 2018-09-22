var api = 'https://www.reddit.com/r/news.json?limit=100';
var canv = document.getElementById('graph').getContext('2d');
var arq, arqJ, arr, texto, palavras, gone=[], dataPal=[], palavrasGrafico=[], vezesGrafico=[], sub,
retira=['as', 'at', 'but', 'by', 'for', 'from', 'in', 'into', 'of', 'onto', 
'to', 'with', 'within', 'the', 'a', 'and', 'nor', 'but', 'or', 'yet', 'so', 
'that', 'are', 'is', 'i', 'he', 'she', 'it', 'my', 'your', 'yours', 'you', 
'-', '/', 'this', 'on'];

var grafico;


window.addEventListener('load', function(e)
{
    $('#subIn').val('news');
    carrega('news');
});

$('#botCarrega').click(async function(e)
{
    grafico.destroy();
    sub = $('#subIn').val().trim();
    carrega(sub);
});

async function carrega(e) {
    try
    {
        arr = [];
        texto = '';
        palavras = [];
        gone=[];
        dataPal=[];
        palavrasGrafico=[];
        vezesGrafico=[];
        arq = await fetch('https://www.reddit.com/r/'+e+'.json?limit=100');
        arqJ = await arq.json();
        await seta();
        await dataRead();
        await dataPal.sort(compare);
        await final();
        grafico = new Chart(canv, {
            type: 'bar',
            data: {
                labels: palavrasGrafico,
                datasets: [{
                    label: '# of Instances',
                    data: vezesGrafico,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        console.log(dataPal);
    }
    catch(e)
    {
        ultimoErro = e.message.split(' ');
        if(ultimoErro[ultimoErro.length - 1] === 'undefined')
        {
            alert("The required subreddit doesn't have enough posts!!!");
        }
        else if(ultimoErro[ultimoErro.length - 1] === 'fetch')
        {
            alert("The subreddit doesn't exist!!!");
        }
    }
}

function seta()
{
    arr = arqJ.data.children;
    arr.forEach(element => {
        texto += element.data.title;
    });
    texto = texto.slice(9, texto.lenght);
    texto.replace(',', ' ');
    texto = texto.toLowerCase();
    palavras = texto.split(' ');
}

function dataRead()
{
    palavras.forEach(function (value, i)
    {
        var conf = false;
        gone.forEach(element=>{
            if(value === element)
            {
                conf = true;
            }
        });
        if(!conf)
        {
            var valor = value;
            var vezes = 0;
            palavras.forEach(element =>{
                if(element === valor)
                {
                    vezes++;
                }
            });
            dataPal.push({'palavra':valor, 'vezes':vezes});
            gone.push(valor);
        }
    });
}

function compare(a,b) {
    if (a.vezes > b.vezes)
      return -1;
    if (a.vezes < b.vezes)
      return 1;
    return 0;
  }

function final()
{
    var primeirosCinco = dataPal.slice(0, 5);
    var cont = 0;
    var passa = 0;
    while(cont<5)
    {
        var conf = false;
        retira.forEach(element=>
        {
            if(dataPal[passa].palavra === element)
            {
                conf = true;
            }
        });
        if(!conf)
        {
            palavrasGrafico.push(dataPal[passa].palavra);
            vezesGrafico.push(dataPal[passa].vezes);
            cont++;
        }
        passa++;
    }
}
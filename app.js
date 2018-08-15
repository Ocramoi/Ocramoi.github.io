let prompoto;
var permissao;
const botao = document.getElementById('botPush');
const indica = document.getElementById('indicacao');
const botaoAdd = document.getElementById('addApp');
var push = true;

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
    if('Notification' in window)
    {
        // permissao = Notification.requestPermission();
        // if(permissao === "denied" || permissao === "granted")
        // {
        //     return;
        // }
        // permissao.then(setInterval(noti, 10000));
        var permission = Notification.permission;

        if (permission === "denied" || permission === "granted") {
            return;
        }

        Notification
        .requestPermission()
        .then(function() {
            // var notification = new Notification("Hello, world!");
            setInterval(noti, 10000)
        });
    }
});

// 
// 
// 
window.addEventListener('beforeinstallprompt', function controlePromp (e){
e.preventDefault();
prompoto = e;
botaoAdd.style.display = 'inline-block';
});
botao.addEventListener('click', function muda(e)
{
    push = !push;
    if(push)
    {
        indica.innerHTML = 'Notificações ativadas!';
    }
    else
    {
        indica.innerHTML = 'Notificações desativadas!';
    }
});

botaoAdd.addEventListener('click', event =>{
    botaoAdd.style.display = 'none';
    prompoto.prompt();
    deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Baixado com sucesso!');
      } else {
        console.log('Instalação recusada!');
      }
      deferredPrompt = null;
    });
});

window.addEventListener('appinstalled', event => {
    app.logEvent('a2hs', 'installed');
});

function noti()
{
    var notificacao = new Notification("Tome um copo d'água!");
}
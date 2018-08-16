let prompoto;
var permission;
const botao = document.getElementById('botPush');
const indica = document.getElementById('indicacao');
const botaoAdd = document.getElementById('addApp');
localStorage.setItem('noti', 'true');
var push = localStorage.getItem('noti');

window.addEventListener('load', event=>
{
    if(push)
    {
        indica.innerHTML = 'Notificações ativadas!';
        localStorage.setItem('noti', 'true');
    }
    else
    {
        indica.innerHTML = 'Notificações desativadas!';
        localStorage.setItem('noti', 'false');
    }
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
        permission = Notification.permission;

        if (permission === "denied" || permission === "granted") {
            return;
        }

        Notification
        .requestPermission()
        .then(function() {
            // var notification = new Notification("Tome um copo d'água!");
            navigator.serviceWorker.ready.then(function notificaSw(e)
            {
                var notiBody = {
                    body: 'Já está na hora de tomar mais um copo de água!',
                    icon: 'imagens/icon.jpg'
                };
                e.showNotification("Tome um copo d'água!", notiBody);
            }
            );
        });
    }
    // setInterval(noti, 10000);
    setTimeout(noti, 10000);
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
        localStorage.setItem('noti', 'true');
    }
    else
    {
        indica.innerHTML = 'Notificações desativadas!';
        localStorage.setItem('noti', 'false');
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
    if(localStorage.getItem('noti') === 'true')
    {
        // var notification = new Notification("Tome um copo d'água!");
        navigator.serviceWorker.ready.then(function notificaSw(e)
        {
            var notiBody = {
                body: 'Já está na hora de tomar mais um copo de água!',
                icon: 'imagens/icon.jpg'
            };
            e.showNotification("Tome um copo d'água!", notiBody);
        }
        );
    }
    setTimeout(noti, 10000);
}
const botao = document.getElementById('botPush');
const indica = document.getElementById('indicacao');
var push = true;
botao.addEventListener('click', function()
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
export {push};
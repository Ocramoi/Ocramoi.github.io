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
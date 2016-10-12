function include(url)
{
    var script=document.createElement('script');
    script.src=url;
    script.type="text/javascript";
    var head=document.getElementsByTagName('head')[0];
    head.appendChild(script);
    console.log('Included: '+url);
}
include('./canvas.js');
include('./main.js');
include('./class/map.js');
include('./class/player.js');
include('./class/key.js');
include('./class/game.js');
include('./class/levels.js');

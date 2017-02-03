function include(url)
{
    var script=document.createElement('script');
    script.src=url;
    script.type="text/javascript";
    var head=document.getElementsByTagName('head')[0];
    head.appendChild(script);
    console.log('Included: '+url);
}
var path="./";
include(path+'canvas.js');
include(path+'main.js');
include(path+'class/map.js');
include(path+'class/player.js');
include(path+'class/key.js');
include(path+'class/game.js');
include(path+'class/levels.js');
include(path+'class/enemy01.js');
include(path+'class/enemy02.js');

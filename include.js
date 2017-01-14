function include(url)
{
    var script=document.createElement('script');
    script.src=url;
    script.type="text/javascript";
    var head=document.getElementsByTagName('head')[0];
    head.appendChild(script);
    console.log('Included: '+url);
}
window.onbeforeunload = function() {
    if(typeof progress!= 'undefined')
    {
        //simulacija post metode pri formi http://www.openjs.com/articles/ajax_xmlhttp_using_post.php
        var http=new XMLHttpRequest();
        var url="http://www2.scptuj.si/~murko.david1/Labirint/index.php";
        var param="newprogress="+map.levelIndex;
        http.open("POST",url,true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Content-length", params.length);
        http.setRequestHeader("Connection", "close");

        http.send(param);
    }
    console.log(map.levelIndex);

    return false;
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


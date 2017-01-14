function keyInit()
{
    key={ //tipke na tipkovnici
        up:false,
        down:false,
        left:false,
        right:false,
        addEventListeners:function(){
            document.addEventListener("keydown", key.onDown, false); //poslusa dogodek ko uporabnik stisne tipko
            document.addEventListener("keyup", key.onUp, false); //poslusa dogodek ko uporabnik spusti tipko
            canvas.addEventListener("mousemove", mouse.onMove); //poslusa dogodek ko se misko premakne znotraj canvas in racuna koordinate
            canvas.addEventListener("mousedown", mouse.buttonDown, false);  //poslusa dogodek ko uporabnik pritisne gump na miski
            canvas.addEventListener("mouseup", mouse.buttonUp, false); //poslusa dogodek ko uporabnik spusti gump na miski
            canvas.addEventListener("click", mouse.onClick, false);
            window.addEventListener('contextmenu', function (event) { //prepreci da bi se ob desnem kliku z misko pojavil meni
                event.preventDefault();
            }, false);
window.onbeforeunload = function() {
    if(typeof progress!= 'undefined')
    {
        //simulacija post metode pri formi http://www.openjs.com/articles/ajax_xmlhttp_using_post.php
        var http=new XMLHttpRequest();
        var url="http://www2.scptuj.si/~murko.david1/Labirint/index.php";
        var param="newprogress="+map.levelIndex;
        http.open("POST",url,true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.setRequestHeader("Content-length", param.length);
        http.setRequestHeader("Connection", "close");

        http.send(param);
    }
    console.log(map.levelIndex);

    return false;
}     


       },
        removeEventListeners:function(){
            document.removeEventListener("keydown", key.onDown, false); //poslusa dogodek ko uporabnik stisne tipko
            document.removeEventListener("keyup", key.onUp, false); //poslusa dogodek ko uporabnik spusti tipko
            canvas.removeEventListener("mousemove", mouse.onMove); //poslusa dogodek ko se misko premakne znotraj canvas in racuna koordinate
            canvas.removeEventListener("mousedown", mouse.buttonDown, false);  //poslusa dogodek ko uporabnik pritisne gump na miski
            canvas.removeEventListener("mouseup", mouse.buttonUp, false); //poslusa dogodek ko uporabnik spusti gump na miski
            canvas.removeEventListener("click", mouse.onClick, false);
            window.removeEventListener('contextmenu', function (event) { //prepreci da bi se ob desnem kliku z misko pojavil meni
                event.preventDefault();
            }, false);

        },
 
        onDown:function(event) {
            if (event.keyCode == 39) {
                key.right = true;
            }
            else if (event.keyCode == 37) {
                key.left = true;
            }
            else if (event.keyCode == 38) {
                key.up = true;
            }
            else if (event.keyCode == 40) {
                key.down = true;
            }

        },
        onUp:function(event) {
            if (event.keyCode == 39) {
                key.right = false;
            }
            else if (event.keyCode == 37) {
                key.left = false;
            }
            else if (event.keyCode == 38) {
                key.up = false;
            }
            else if (event.keyCode == 40) {
                key.down = false;
            }
        }
    };
    mouse={ //dogodki z misko
        click:{
            timer:100, //milisekunde
            left:false
        },
        canvasCoord:new coord(0,0), //koordinati miske v canvasu
        button:{ //katere tipke na miski so pritisnjene
            left:false,
            right:false
        },

        buttonDown:function(event)
        {
            if (event.which == 1)
            {
                mouse.button.left=true;
            }
            if (event.which == 3)
            {
                mouse.button.right=true;
            }
        },
        buttonUp:function(event)
        {
            if (event.which == 1)
            {
                mouse.button.left=false;
            }
            if (event.which == 3)
            {
                mouse.button.right=false;
            }
        },
        onClick:function(event)
        {

            if (event.which == 1)
            {
                mouse.click.left = true;
                setTimeout(function(){
                    mouse.click.left = false;
                }, mouse.click.timer);


            }
        },
        onMove:function(event) {

            mouse.canvasCoord.x = event.clientX - (canvas.offsetLeft - window.pageXOffset);
            mouse.canvasCoord.y = event.clientY - (canvas.offsetTop - window.pageYOffset);

        }
    };
    key.addEventListeners();
}

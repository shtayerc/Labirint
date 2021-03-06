function keyInit()
{
    key={ //tipke na tipkovnici
        up:false,
        down:false,
        left:false,
        right:false,
        space:false,
        addEventListeners:function(){
            window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 30);
              };
    })();

            document.addEventListener("keydown", key.onDown, false); //poslusa dogodek ko uporabnik stisne tipko
            document.addEventListener("keyup", key.onUp, false); //poslusa dogodek ko uporabnik spusti tipko
            canvas.addEventListener("mousemove", mouse.onMove); //poslusa dogodek ko se misko premakne znotraj canvas in racuna koordinate
            canvas.addEventListener("mousedown", mouse.buttonDown, false);  //poslusa dogodek ko uporabnik pritisne gump na miski
            canvas.addEventListener("mouseup", mouse.buttonUp, false); //poslusa dogodek ko uporabnik spusti gump na miski
            canvas.addEventListener("click", mouse.onClick, false);
            window.addEventListener('contextmenu', function (event) { //prepreci da bi se ob desnem kliku z misko pojavil meni
                event.preventDefault();
            }, false);

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
                event.preventDefault();
                key.right = true;
            }
            else if (event.keyCode == 37) {
                event.preventDefault();
                key.left = true;
            }
            else if (event.keyCode == 38) {
                event.preventDefault();
                key.up = true;
            }
            else if (event.keyCode == 40) {
                event.preventDefault();
                key.down = true;
            }else
            {
                if(event.keyCode ==32 || event.keyCode==0)
                {

                    key.space=true;
                }


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
            }else if(event.keyCode ==32 || event.keyCode==0)
            {

                key.space=false;
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
            //   game.console.out(mouse.canvasCoord.x+" "+mouse.canvasCoord.y);
            //   game.console.out('');

        }
    };
    key.addEventListeners();
}

function gameInit()
{
    game={
        loop:true,
        tick:100,
        menu:{
            font:'30px Arial',
            color:'#ffffff',
            loop:true,
            tick:50,
            button:{
                play:new text(250,250,'Play'),
                make:new text(250,300,'Make level')

            },
            main:function()
            {

                game.menu.button.play.draw();
                game.menu.button.make.draw();
                if(game.menu.button.play.isClicked())
                {


                    game.menu.loop=false;
                    game.clear();
                    map.loadBlocks();
                    game.start();
                }
                if(game.menu.loop!=false)
                {
                    setTimeout(game.menu.main,game.menu.tick);

                }
            }

        },
        clear:function()
        {
            screen.clearRect(0, 0, canvas.width, canvas.height);
        },
        start:function()
        {

            if (key.up == true)
            {
                if(player.canMove('up'))
                {
                    player.move('up');
                }
            }
            else if (key.down == true)
            {
                if(player.canMove('down'))
                {
                    player.move('down');
                }
            }
            else if (key.left == true)
            {
                if(player.canMove('left'))
                {
                    player.move('left');
                }
            }
            else if (key.right == true)
            {
                if(player.canMove('right'))
                {
                    player.move('right');
                }
            }
            switch(map.level[player.mapCoord.y][player.mapCoord.x]) //preverja trenutne koordinate v polju map.level
            {
                case 5: //key_1
                map.keys.key_1.pickUp();
                break;

                case 7: //key_2
                map.keys.key_2.pickUp();
                break;

                case 8: //keylock_1
                map.keys.key_1.unlock();
                break;

                case 6: //keylock_2
                map.keys.key_2.unlock();
                break;

                case 10: //end
                alert("konec si zaenkrat");
                document.location.reload();
                break;

            }

            //  if ((((mouse_x >= text_play_1.x && mouse_x <= text_play_1.x_2) && (mouse_y >= text_play_1.y_1 && mouse_y <= text_play_1.y))) && mouse_click_left == true)
            if(game.loop != false)
            {

                setTimeout(game.start, game.tick);
            }

        }


    };

    function text(x,y,txt)
    {
        this.txt=txt;
        this.x=x;
        this.y=y;

        this.isClicked=function()

        {
            screen.font=game.menu.font;

            var width=screen.measureText(txt).width; //izracuna dolzino besedila v pikslih
            var height=screen.measureText('M').width; //sirina velikega M je priblizno visina fonta

            if((mouse.canvasCoord.x >= this.x && mouse.canvasCoord.x <= this.x+width) && 
                (mouse.canvasCoord.y >= this.y-height && mouse.canvasCoord.y <= this.y))
            {
                if(mouse.button.left==true)
                {
                    return true;
                }
            }
            
            
            return false;
        };
        this.draw=function()
        {
            screen.font=game.menu.font;
            screen.fillStyle=game.menu.color;
            screen.fillText(this.txt, this.x, this.y);
        };
    }

}

function gameInit()
{
    game={
        loop:true,
        tick:100,
        menu:{
            font:'25px Arial',
            color:'#ffffff',
            loop:true,
            tick:50,
            button:{
                play:new text(250,250,'Play'),
                make:new text(250,300,'Create stage')

            },
            main:function()
            {

                game.menu.button.play.draw();
                game.menu.button.make.draw();
                if(game.menu.button.play.isClicked())
                {   
                    game.menu.loop=false;
                    game.loop=true;
                    game.clear();
                    map.level=toArray(window['level_'+map.levelIndex]);

                    map.keys.reset();

                    map.loadBlocks();
                    map.drawPanel();
                    game.start();
                }
                           if(game.menu.button.make.isClicked())
                {
                    game.menu.loop=false;
                    game.clear();
                    map.level=toArray(emptyTest);
                    map.loadBlocks();
                    game.clear();
                    map.make.loop=true;
                    map.make.panel();
                    map.make.newLevel();

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
              // game.loop=false;
                map.nextLevel();
                console.log('ok');
                game.clear();
                console.log('ok');
                map.keys.reset();
                map.draw();
                //map.loadBlocks();
                
                map.drawPanel();
                /*game.loop=true;
                game.start();
                */               
                break;

            }
            if(map.button.restart.isClicked())
            {

                map.restart();           
            }
            if(map.button.back.isClicked())
            {
                if(map.make.flag==true)
                {
                    game.loop=false;
                    game.clear();
                    map.draw();
                    map.loadBlocks();
                    map.make.panel();
                    map.make.loop=true;
                    map.make.newLevel();


                }else
                {

                    game.loop=false;
                    game.menu.loop=true;
                    game.clear();
                    game.menu.main();
                }
            }
            if(game.loop != false)
            {

                setTimeout(game.start, game.tick);
            }


        }


    };

}

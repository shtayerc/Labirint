function gameInit()
{
    game={
        loop:true,
        tick:50,
        console:
            {
                canvasCoord: new coord(675,623),
                font:'10px Dejavu sans mono',
                color:'#ffffff',
                history:{
                    text:['',''],
                    add:function(text)
                    {
                        game.console.history.text[game.console.history.text.length]=text;

                    }
                },
                out:function(text)
                {
                    game.console.history.add(text);
                },
                reset:function()
                {
                    game.console.history.text=['',''];
                },
                draw:function()
                {
                    game.console.clear();
                    screen.font=game.console.font;
                    screen.fillStyle=game.console.color;
                    screen.fillText(game.console.history.text[game.console.history.text.length-2],game.console.canvasCoord.x,game.console.canvasCoord.y-10);
                    screen.fillText(game.console.history.text[game.console.history.text.length-1],game.console.canvasCoord.x,game.console.canvasCoord.y);
                },
                clear:function()
                {
                    screen.clearRect(650, 603, 150, 25);

                }
            },
        menu:{
            font:'25px Arial',
            color:'#ffffff',
            loop:true,
            tick:100,
            button:{
                play:new text(250,250,'Play'),
                make:new text(250,300,'Create stage')

            },
            main:function()
            {
                if(typeof progress != 'undefined')
                {
                map.levelIndex=progress;
                
                }
                game.clear();
                game.menu.button.play.draw();
                game.menu.button.make.draw();
                if(game.menu.button.play.isClicked())
                {   
                    game.menu.loop=false;
                    game.loop=true;
                    game.clear();
                    map.level=toArray(window['level_'+map.levelIndex]);
                    map.keys.reset();
                    player.getStartCoord();
                    map.drawPlay();
                    map.drawPanel();
                    enemy01.patrolAll();
                    map.level[player.mapCoord.y][player.mapCoord.x]=0; //nastavi zacetno polje igralca na 0, da ne moti ostalih funkcij ki preverjajo
                    game.start();
                }
                if(game.menu.button.make.isClicked())
                {
                    game.menu.loop=false;
                    game.clear();
                    map.level=toArray(emptyTest);
                    game.clear();
                    if(map.make.levelString!='')
                    {
                        map.level=toArray(map.make.levelString);

                    }
                    map.draw();
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
                if(player.canMove('up') && player.isMoving==false)
                {
                    player.move('up');

                }

            }
            else if (key.down == true)
            {
                if(player.canMove('down') && player.isMoving==false)
                {   
                    player.move('down');
                }
            }
            else if (key.left == true)
            {
                if(player.canMove('left') && player.isMoving==false)
                {
                    player.move('left');
                }
            }
            else if (key.right == true)
            {
                if(player.canMove('right') && player.isMoving==false)
                {
                    player.move('right');
                }
            }
            switch(map.level[player.mapCoord.y][player.mapCoord.x]) //preverja trenutne koordinate v polju map.level
            {
                case 3: //builder
                switch(player.lastDir)
                {
                    case 'up':
                        map.level[player.mapCoord.y][player.mapCoord.x]=0;
                        map.level[player.mapCoord.y-1][player.mapCoord.x]=3;
                        break;
                    case 'down':
                        map.level[player.mapCoord.y][player.mapCoord.x]=0;
                        map.level[player.mapCoord.y+1][player.mapCoord.x]=3;
                        break;
                    case 'left':
                        map.level[player.mapCoord.y][player.mapCoord.x]=0;
                        map.level[player.mapCoord.y][player.mapCoord.x-1]=3;
                        break;
                    case 'right':
                        map.level[player.mapCoord.y][player.mapCoord.x]=0;
                        map.level[player.mapCoord.y][player.mapCoord.x+1]=3;

                        break;


                }
                //               console.log(map.level[player.mapCoord.y][player.mapCoord.x]);

                break;
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


                //  case 11:
                //  map.restart();
                //  console.log('game.hit');
                //  break;

                case 10: //end
                if(map.make.flag==false)
                {
                    map.nextLevel();
                    game.clear();
                    map.keys.reset();
                    enemy01.resetAll();
                    player.getStartCoord();
                    map.drawPlay();
                    enemy01.patrolAll();
                    map.drawPanel();
                }else
                {
                    map.restart();
                }         
                break;


            }           
            if(player.isMoving==true)
            {
                player.drawMovingFrame();

            }else
            {
                map.clear();
                map.drawPlay();
            }

            player.inventory.clear();
            player.inventory.draw();
            game.console.draw();
            if(map.button.restart.isClicked())
            {
                map.restart();           
            }
            if(map.button.back.isClicked())
            {
                if(map.make.flag==true)
                {

                    game.loop=false;
                    map.restart();
                    enemy01.resetAll();
                    game.clear();
                    map.level=toArray(map.make.levelString);
                    map.make.level=  toArray(map.make.levelString);
                    map.clear();
                    map.draw();
                    map.make.panel();
                    map.make.loop=true;
                    map.make.newLevel();


                }else
                {

                    game.loop=false;
                    enemy01.resetAll();
                    player.lastDir="";
                    game.menu.loop=true;
                    game.clear();
                    game.menu.main();
                }
            }
            player.isHit();

            if(player.isDead())
            {
              //  game.loop=false;
                player.hp=100;
                map.restart();
                player.drawHp();

            }

            if(game.loop != false)
            {

                setTimeout(game.start, game.tick);
            }

        }

    };

}

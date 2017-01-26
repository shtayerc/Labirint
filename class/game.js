function gameInit()
{
    game={
        loop:true,
        tick:50,
        saveProgress:function()
        {
            if(typeof progress!= 'undefined')
            {
                ajaxSend('http://www2.scptuj.si/~murko.david1/Labirint/index.php','newprogress='+map.levelIndex+'&username='+username);
            }
        },
        form:{
            hide:function()
            {
                document.getElementsByTagName('form')[0].style.display='none'; 
                document.getElementsByTagName('form')[1].style.display='none';

            },
            show:function()
            {
                document.getElementsByTagName('form')[0].style.display='block'; 
                document.getElementsByTagName('form')[1].style.display='none';



            }

        },
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
                    screen.clearRect(675, 603, 150, 25);

                }
            },
        load:{
            font:'25px Arial',
            color:'#ffffff',
            loop:true,
            tick:10,
            levels:{
                check:function()
                {
                    for(var i=0;i<game.load.levels.num;i=i+1)
                    {
                        if(game.load.levels.list[i].isClicked())
                        {
                            game.load.loop=false;
                            map.getLevel(username,i);
                            
                        }
                    }

                },
                makeButtons:function()
                {
                    for(var i=0;i<game.load.levels.num;i=i+1)
                    {
                        game.load.levels.list[i]=new text(250,i*50+50,'Level '+(i+1));    
                    }

                },
                draw:function()
                {
                    for(var i=0;i<game.load.levels.num;i=i+1)
                    {
                        game.load.levels.list[i].draw();
                    }

                },
                num:10,
                list:[]

            },
            button:{
                back:new text(0,627,'Back')
            },
            main:function()
            {
                game.clear();
                game.console.draw();
                game.load.button.back.draw();
                game.load.levels.draw();
                game.load.levels.check();
                if(game.load.button.back.isClicked())
                {
                    game.load.loop=false;
                    game.clear();
                    game.menu.loop=true;
                    game.menu.main();
                }
                if(game.load.loop!=false)
                {
                    setTimeout(game.load.main,game.load.tick);
                }


            }


        },
        menu:{
            font:'25px Arial',
            color:'#ffffff',
            loop:true,
            tick:10,
            button:{

                play:new text(250,250,'Play'),
                make:new text(250,300,'Create stage'),
                loadF:new text(250,350,'Load from file'),
                load:new text(250,400,'Load level')

            },
            main:function()
            {
                if(typeof progress != 'undefined')
                {
                    if(username == 'undefined')
                    {

                        game.form.show();
                    }else
                    {
                        game.form.hide();
                    }
                    map.levelIndex=progress;
                    game.console.out("Logged as "+ username);
                    game.console.out("");


                }

                game.clear();
                game.console.draw();
                game.menu.button.play.draw();
                game.menu.button.make.draw();
                 game.menu.button.loadF.draw();

                if(typeof progress != 'undefined')
                {
                    game.menu.button.load.draw();

                    if(game.menu.button.load.isClicked())
                    {
                        game.form.hide();
                        game.menu.loop=false;
                        game.load.loop=true;
                        game.clear();
                        ajaxGet(function (num){game.load.levels.num=num;},'countUserLevels.php','username='+username);
                        game.load.levels.makeButtons();
                        game.load.main();

                    }

                }
                if(game.menu.button.play.isClicked())
                {
                    game.form.hide();   
                    game.menu.loop=false;
                    game.loop=true;
                    game.clear();
                    map.level=toArray(window['level_'+map.levelIndex]);
                    map.keys.reset();
                    player.getStartCoord();
                    map.draw50();
                    map.drawPanel();
                    enemy01.patrolAll();
                    map.level[player.mapCoord.y][player.mapCoord.x]=0; //nastavi zacetno polje igralca na 0, da ne moti ostalih funkcij ki preverjajo
                    game.start();
                }
                if(game.menu.button.make.isClicked())
                {
                    game.form.hide();
                    game.menu.loop=false;
                    game.clear();
                    map.level=toArray(emptyLevel);
                    game.clear();
                    if(map.make.levelString!='')
                    {
                        map.level=toArray(map.make.levelString);

                    }
                    map.draw25();
                    map.make.loop=true;
                    map.make.panel();
                    map.make.newLevel();
                }
                if(game.menu.button.loadF.isClicked())
                {
                    map.make.loadFromFile();
                
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

                case 10: //end
                if(map.make.flag==false)
                {
                    clearInterval(player.animation.interval);
                    map.nextLevel();
                    game.saveProgress();
                    game.clear();
                    map.keys.reset();
                    enemy01.resetAll();
                    player.getStartCoord();
                    map.draw50();
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
                map.draw50();
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
                console.log(map.getLevel('shtayerc',0));

                if(map.make.flag==true)
                {
                    game.loop=false;
                    map.restart();
                    enemy01.resetAll();
                    game.clear();
                    map.level=toArray(map.make.levelString);
                    map.make.level=  toArray(map.make.levelString);
                    map.clear();
                    map.draw25();
                    map.make.panel();
                    map.make.loop=true;
                    map.make.newLevel();
                }else
                {
                    if(typeof progress != 'undefined')
                    {
                        game.form.show();
                    }
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

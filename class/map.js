function mapInit()
{
    map={
        blockSize:50, //velikost bloka v pikslih
        block:[],
        levelIndex:'00',
        level:[],
        imgLoaded:0,
        button:{
            back:new text(0,625,'Back'),
            restart: new text(70,625,'Restart')

        },
        clear:function()
        {
            screen.clearRect(0,0,650,600);
        },
        nextLevel:function()
        {
            var prva=Number(map.levelIndex.charAt(0));
            var druga=Number(map.levelIndex.charAt(1));
            var next='';
            player.lastDir="";
            if(druga==9)
            {
                prva=prva+1;
                druga=0;
            }else
            {
                druga=druga+1;
            }
            next=String(prva)+String(druga);
            if(window['level_'+next]!=null) //ce naslednji level obstaja
            {
                map.levelIndex=next;
                map.level=toArray(window['level_'+map.levelIndex]);

            }else
            {
                console.log('Konec');
                game.loop=false;

            }
        },
        restart:function()
        {
            if(map.make.flag==true)
            {

                map.level=toArray(map.make.levelString);
                game.clear();
                enemy01.resetAll();
                map.keys.reset();
                player.lastDir='';
                player.getStartCoord();
                map.drawPlay();
                map.drawPanel();


            }else
            {   

                map.level=toArray(window['level_'+map.levelIndex]);
                game.clear();
                enemy01.resetAll();
                map.keys.reset();
                player.lastDir='';
                player.getStartCoord();
                map.drawPlay();
                map.drawPanel();
            }
            enemy01.patrolAll();

        },
        make:{
            levelString:'', //string levela(se ustvari iz polja)
            flag:false, //ce je true funkcija game.start uporablja level iz map.make.level in funkcijo map.make.newLevel 
            level:empty, //polje levela
            tick:10, //vsakih koliko ms se funkcija ponovi
            block:1, //kateri blok je izbran in se postavlja v mapo
            blockNum:10,
            loop:true,
            button:{
                back:new text(0,625,'Back'),
                clear:new text(70,625,'Clear'),
                play:new text(300,625,'Play')
            },
            panel:function()
            {

                screen.beginPath();
                screen.moveTo(0, 602);
                screen.lineTo(800, 602);
                screen.lineWidth = 2;
                screen.strokeStyle = "grey";
                screen.stroke();
                map.make.button.back.draw();
                map.make.button.clear.draw();
                map.make.button.play.draw();
                switch(map.make.block)
                {
                    case 1:
                        screen.clearRect(200, 602, map.blockSize/2, map.blockSize/2);
                        screen.drawImage(map.block['wall25'], 200, 602);
                        break;

                    case 2:
                        screen.clearRect(200, 602, map.blockSize/2, map.blockSize/2);
                        screen.drawImage(map.block['key_1_25'], 200, 602);
                        break;

                    case 3:
                        screen.clearRect(200, 602, map.blockSize/2, map.blockSize/2);
                        screen.drawImage(map.block['keylock_1_25'], 200, 602);
                        break;

                    case  4:
                        screen.clearRect(200, 602, map.blockSize/2, map.blockSize/2);
                        screen.drawImage(map.block['key_2'], 200, 602);
                        break;

                    case 5:
                        screen.clearRect(200, 602, map.blockSize/2, map.blockSize/2);
                        screen.drawImage(map.block['keylock_2'], 200, 602);
                        break;

                    case 6:
                        screen.clearRect(200, 602, map.blockSize/2, map.blockSize/2);
                        screen.drawImage(map.block['player25'],200,602);
                        break;

                    case 7:
                        screen.clearRect(200, 602, map.blockSize/2, map.blockSize/2);
                        screen.drawImage(map.block['end'], 200, 602);
                        break;

                    case 8:
                        screen.clearRect(200, 602, map.blockSize/2, map.blockSize/2);
                        screen.drawImage(map.block['enemy01_25'], 200, 602);

                        break;

                    case map.make.blockNum-1:
                        screen.clearRect(200, 602, map.blockSize/2, map.blockSize/2);
                        break;
                }
            },
            checkLevel:function()
            {
                var mapa = new coord(1,1); //zacetna pozicija risanja v dvodimenzionalnem polju 
                var limit = new coord(32,25); // meja polja po sirini, po visini
                var player=0;
                var end=0;
                var ok=true;

                while(mapa.y < limit.y) //zanka gre od 0,0 do limit.x, limit.y
                {
                    mapa.x=1;
                    while(mapa.x <= limit.x)
                    {
                        switch(map.make.level[mapa.y][mapa.x]) //preverja polje map.level in narise ustrezen blok
                        {
                            case 10:
                            end=end+1;
                            break;

                            case 1:
                            player=player+1;
                            break;
                        }

                        mapa.x = mapa.x + 1;
                    }
                    mapa.y = mapa.y +1;
                }

                if(player==0)
                {
                    console.log('There is no player.');
                    ok=false;
                }
                if(player>1)
                {
                    console.log('There can only be one player.');
                    ok=false;
                }
                if(end==0)
                {
                    console.log('There is no end.');
                    ok=false;
                }
                if(end>1)
                {
                    console.log('There can only be one end.');
                    ok=false;
                }

                return ok;

            },
            newLevel:function()
            {
                var newBlockSize=25;
                var mapa=new coord(0,0);
                var curPos=new coord(0,0);
                mapa.x = ((mouse.canvasCoord.x / newBlockSize) + 1) | 0; //zracuna koordinate v mapi in zaokrozi navzdol
                mapa.y = ((mouse.canvasCoord.y / newBlockSize) + 1) | 0;
                curPos.x = newBlockSize * (mapa.x - 1);
                curPos.y = newBlockSize * (mapa.y - 1);
                if ((mouse.canvasCoord.x >= 200 && mouse.canvasCoord.x <= 200 + newBlockSize) && (mouse.canvasCoord.y >= 602 && mouse.canvasCoord.y <= 627))
                {
                    mouse.click.timer = 10; //treba je nastavit na manj da se ob enem kliku blok ne spremeni veckrat
                    if (mouse.click.left == true)
                    {
                        map.make.block = map.make.block + 1;
                    }


                    if (map.make.block == map.make.blockNum)
                    {
                        map.make.block = 1;
                    }
                    map.make.panel();
                }else
                {
                    mouse.click.timer = 100;
                }

                if (mouse.button.right == true)
                {
                    if (mouse.canvasCoord.y < 600 && mapa.y <= 24)
                    {
                        switch(map.make.block)
                        {
                            case 1:
                                map.make.level[mapa.y][mapa.x] = 2;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['wall25'], curPos.x, curPos.y);
                                break;

                            case 2:
                                map.make.level[mapa.y][mapa.x] = 5;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['key_1_25'], curPos.x, curPos.y);
                                break;

                            case 3:
                                map.make.level[mapa.y][mapa.x] = 8;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['keylock_1_25'], curPos.x, curPos.y);
                                break;

                            case 4:
                                map.make.level[mapa.y][mapa.x] = 7;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['key_2'], curPos.x, curPos.y);
                                break;

                            case 5:
                                map.make.level[mapa.y][mapa.x] = 6;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['keylock_2'], curPos.x, curPos.y);
                                break;

                            case 6:
                                map.make.level[mapa.y][mapa.x] = 1;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['player25'], curPos.x, curPos.y);

                                break;

                            case 7:
                                map.make.level[mapa.y][mapa.x] = 10;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['end'], curPos.x, curPos.y);
                                break;

                            case 8:
                                map.make.level[mapa.y][mapa.x]=11;

                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['enemy01_25'], curPos.x, curPos.y);
                                break;

                            case 9:
                                map.make.level[mapa.y][mapa.x] = 0;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                break;
                        }
                    }

                }
                if(map.make.button.back.isClicked())
                {
                    enemy01.resetAll();
                    map.make.flag=false;
                    map.make.loop=false;
                    map.make.levelString=toMapString(map.make.level);
                    game.clear();
                    map.keys.reset();
                    game.menu.loop=true;
                    game.menu.main();

                }
                if(map.make.button.clear.isClicked())
                {
                    enemy01.resetAll();
                    game.clear();
                    map.make.level=toArray(emptyTest);
                    map.make.panel();

                }
                if(map.make.button.play.isClicked())
                {
                    if(map.make.checkLevel())
                    {

                        map.make.levelString=toMapString(map.make.level);    
                        map.make.flag=true;
                        map.make.loop=false;
                        game.loop=true;
                        enemy01.resetAll();
                        game.clear();
                        map.level=map.make.level;
                        map.keys.reset();
                        player.getStartCoord();
                        map.drawPlay();
                        map.drawPanel();
                        enemy01.patrolAll();
                        game.start();
                    }            


                }
                if(map.make.loop!=false) 
                {
                    setTimeout(map.make.newLevel, map.make.tick);
                }


            }
        },

        getBlock:function(x,y){
            if(typeof(map.level[y]) != 'undefined' && typeof(map.level[y][x]) != 'undefined')
            {
                switch(map.level[y][x]) //preverja polje map.level in narise ustrezen blok
                {
                    case 0:
                    return 'floor';
                    break;

                    case 1:
                    return 'floor';
                    break;

                    case 2:
                    return 'wall';
                    break;

                    case 5:
                    return 'key_1';
                    break;

                    case 7:
                    return 'key_2';
                    break;

                    case 8:
                    return 'keylock_1';
                    break;

                    case 6:
                    return 'keylock_2';
                    break;

                    case 10:
                    return 'end';
                    break;

                    case 11:
                    return 'enemy01';
                    break;

                    default:
                    return 'blank';
                    break;
                }

            }else
            {
                return 'blank';
            }
        },
        drawPlay:function()
        {

            var curPos=new coord(0,0); //current position
            var mapa= new coord(player.movingFrame.start.x,player.movingFrame.start.y);
            var mapaStart=new coord(player.movingFrame.start.x,player.movingFrame.start.y);
            if(player.lastDir=='right')
            {
                mapaStart.x=mapaStart.x+1;

            }
            if(player.lastDir=='down')
            {
                mapa.y=mapa.y+1;

            }
            var limit = new coord(13,13); // meja polja po sirini, po visini
            var column=1;
            var row=1;
            var canLimit = new coord(601,551);
            screen.drawImage(map.block['floorBig'], 0, 0);

            while(curPos.y<canLimit.y)
            {
                row=1;
                mapa.x=mapaStart.x;
                curPos.x=0;
                while(curPos.x<canLimit.x)
                { 

                    if(typeof(map.level[mapa.y]) != 'undefined' && typeof(map.level[mapa.y][mapa.x]) != 'undefined')
                    {
                        switch(map.level[mapa.y][mapa.x]) //preverja polje map.level in narise ustrezen blok
                        {
                            case 2:
                            screen.drawImage(map.block['wall'], curPos.x, curPos.y);
                            break;

                            case 5:
                            screen.drawImage(map.block['key_1'], curPos.x, curPos.y);
                            break;

                            case 7:
                            screen.drawImage(map.block['key_2'], curPos.x, curPos.y);
                            break;

                            case 8:
                            screen.drawImage(map.block['keylock_1'], curPos.x, curPos.y);
                            break;

                            case 6:
                            screen.drawImage(map.block['keylock_2'], curPos.x, curPos.y);
                            break;

                            case 10:
                            screen.drawImage(map.block['end'], curPos.x, curPos.y);
                            break;

                            case 0:
                            screen.drawImage(map.block['floor'], curPos.x, curPos.y);
                            break;
                            case 11:

                            screen.drawImage(map.block['enemy01'], curPos.x, curPos.y);

                            break;

                        }
                    } else
                    {
                        screen.beginPath();
                        screen.rect(curPos.x, curPos.y, map.blockSize, map.blockSize);
                        screen.fillStyle = '#000000';
                        screen.fill();
                        screen.closePath();


                    }


                    mapa.x = mapa.x + 1;
                    row=row+1;
                    curPos.x = curPos.x + map.blockSize;
                }

                mapa.y = mapa.y +1;
                column=column+1;
                curPos.y = curPos.y + map.blockSize;

                enemy01.drawAll();

                player.draw();
            }


        },
        draw:function()
        {
            enemy01.resetAll();
            var curPos=new coord(0,0); //current position
            var mapa = new coord(1,1); //zacetna pozicija risanja v dvodimenzionalnem polju 
            var limit = new coord(32,25); // meja polja po sirini, po visini

            while(mapa.y < limit.y) //zanka gre od 0,0 do limit.x, limit.y
            {
                mapa.x=1;
                curPos.x=0;
                while(mapa.x <= limit.x)
                {
                    switch(map.level[mapa.y][mapa.x]) //preverja polje map.level in narise ustrezen blok
                    {
                        case 2:
                        screen.drawImage(map.block['wall25'], curPos.x, curPos.y);
                        break;

                        case 5:
                        screen.drawImage(map.block['key_1_25'], curPos.x, curPos.y);
                        break;

                        case 7:
                        screen.drawImage(map.block['key_2'], curPos.x, curPos.y);
                        break;

                        case 8:
                        screen.drawImage(map.block['keylock_1_25'], curPos.x, curPos.y);
                        break;

                        case 6:
                        screen.drawImage(map.block['keylock_2'], curPos.x, curPos.y);
                        break;

                        case 10:
                        screen.drawImage(map.block['end'], curPos.x, curPos.y);
                        break;

                        case 11:
                        screen.drawImage(map.block['enemy01_25'],curPos.x,curPos.y);
                        break;

                        case 1:
                        screen.drawImage(map.block['player25'],curPos.x,curPos.y);
                        break;
                    }

                    mapa.x = mapa.x + 1;
                    curPos.x = curPos.x + map.blockSize/2;
                }
                mapa.y = mapa.y +1;
                curPos.y = curPos.y + map.blockSize/2;
                enemy01.drawAll();
            }
        },
        keys:{  //v tem objektu so podatki o pobranih klucih
            key_1:{
                taken:false,
                num:0,
                pickUp:function() //funkcija se klice ko je igralec bloku key_1
                {
                    map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                    this.num = this.num + 1;
                    map.drawPanel();
                    if (this.num == 1)
                    {
                        player.inventory.add(map.block['key_1_25'],map.keys.key_1.num);

                        this.taken = true;
                    }else
                    {
                        player.inventory.update(player.inventory.getIndex('Boss_Key25x25.png'),map.keys.key_1.num);

                    }
                },
                unlock:function()
                {
                    map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                    this.num = this.num - 1;
                    map.drawPanel();
                    if (this.num == 0)
                    {
                        player.inventory.remove(player.inventory.getIndex('Boss_Key25x25.png'));
                        this.taken = false;
                    }else
                    {
                        player.inventory.update(player.inventory.getIndex('Boss_Key25x25.png'),map.keys.key_1.num);

                    }
                }
            },
            key_2:{
                taken:false,
                num:0,
                pickUp:function()
                {
                    map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                    this.num = this.num + 1;
                    map.drawPanel();
                    if (this.num == 1)
                    {           
                        this.taken = true;
                        player.inventory.add(map.block['key_2'],map.keys.key_2.num);

                    }else
                    {
                        player.inventory.update(player.inventory.getIndex('key_2'),map.keys.key_2.num);

                    }
                },
                unlock:function()
                {
                    map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                    this.num = this.num - 1;
                    map.drawPanel();
                    if (this.num == 0)
                    {
                        player.inventory.remove(player.inventory.getIndex('key_2'));

                        // player.inventory.remove()
                        this.taken = false;
                    }else
                    {
                        player.inventory.update(player.inventory.getIndex('key_2.png'),map.keys.key_2.num);


                    }
                }
            },
            reset:function()
            {
                player.inventory.slot=[];
                map.keys.key_1.num=0;
                map.keys.key_1.taken=false;
                map.keys.key_2.num=0;
                map.keys.key_2.taken=false;
            }
        },
        drawPanel:function()
        {
            player.drawHp();
            map.button.back.draw();
            map.button.restart.draw();
            screen.beginPath();
            screen.moveTo(0, 602);
            screen.lineTo(800, 602);

            screen.lineWidth = 2;
            screen.strokeStyle = "grey";
            screen.stroke();

        },
        loadImg:function(name,url) //funkcija sprejme dva parametra: name - index asociativnega polja(map.block) , url - lokacija slike
        {
            map.block[name]=new Image();
            map.block[name].crossOrigin = 'Anonymous'; //zaradi metode screen.getImageData ki mece security error
            map.block[name].onload = function () 
            {
                map.imgLoaded=map.imgLoaded+1;
            }                      
            map.block[name].src=url;
        },
        loading:function()
        {

            if(map.imgLoaded!=Object.keys(map.block.length))
            {
                setTimeout(map.loading,100);


            }else
            {
                game.menu.main();
            }
        },
        loadBlocks:function() //funkcija ki klice funkcijo map.loadImg in nalozi vse potrebne slike
        {
            map.loadImg('player25','./textures/PlayerFront25x25.png');
            map.loadImg('enemy01_25','./textures/Enemy01_Back25x25.png');
            map.loadImg('wall','./textures/Pyramid_Walls.png');
            map.loadImg('wall25','./textures/Pyramid_Walls25x25.png');
            map.loadImg('key_1','./textures/Boss_Key.png');
            map.loadImg('key_1_25','./textures/Boss_Key25x25.png');
            map.loadImg('key_2','./blocks/key_2.png');
            map.loadImg('end','./blocks/end.png');
            map.loadImg('keylock_1','./textures/Boss_Keyhole.png');
            map.loadImg('keylock_1_25','./textures/Boss_Keyhole25x25.png');
            map.loadImg('keylock_2','./blocks/keylock_2.png');
            map.loadImg('player','./textures/Player_Front1.png');
            map.loadImg('enemy01','./textures/Enemy01_Left.png');
            map.loadImg('floor','./textures/Floor_25.png');
            map.loadImg('floorBig', './textures/Pyramid_Floor.png');
            map.loadImg('blank','./blocks/blank.png');
        }


    };







}

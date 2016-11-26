function mapInit()
{
    map={
        blockSize:25, //velikost bloka v pikslih
        block:[],
        levelIndex:'00',
        level:[],
        imgLoaded:0,
        button:{
            back:new text(0,625,'Back'),
            restart: new text(70,625,'Restart')

        },
        nextLevel:function()
        {
            var prva=Number(map.levelIndex.charAt(0));
            var druga=Number(map.levelIndex.charAt(1));
            var next='';
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
                //enemy01.resetAll();
                map.level=toArray(map.make.levelString);
                game.clear();
                map.keys.reset();
                map.draw();
                map.drawPanel();


            }else{   

                map.level=toArray(window['level_'+map.levelIndex]);
                game.clear();
                map.keys.reset();
                map.draw();
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
                        screen.clearRect(200, 602, map.blockSize, map.blockSize);
                        screen.drawImage(map.block['wall'], 200, 602);
                        break;

                    case 2:
                        screen.clearRect(200, 602, map.blockSize, map.blockSize);
                        screen.drawImage(map.block['key_1'], 200, 602);
                        break;

                    case 3:
                        screen.clearRect(200, 602, map.blockSize, map.blockSize);
                        screen.drawImage(map.block['keylock_1'], 200, 602);
                        break;

                    case  4:
                        screen.clearRect(200, 602, map.blockSize, map.blockSize);
                        screen.drawImage(map.block['key_2'], 200, 602);
                        break;

                    case 5:
                        screen.clearRect(200, 602, map.blockSize, map.blockSize);
                        screen.drawImage(map.block['keylock_2'], 200, 602);
                        break;

                    case 6:


                        screen.clearRect(200, 602, map.blockSize, map.blockSize);

                        screen.drawImage(map.block['player'],200,602);
                        break;

                    case 7:
                        screen.clearRect(200, 602, map.blockSize, map.blockSize);
                        screen.drawImage(map.block['end'], 200, 602);
                        break;

                    case 8:
                        screen.clearRect(200, 602, map.blockSize, map.blockSize);

                        screen.drawImage(map.block['enemy01'], 200, 602);

                        break;

                    case map.make.blockNum-1:
                        screen.clearRect(200, 602, map.blockSize, map.blockSize);
                        break;
                }
            },
            checkLevel:function()
            {
                //var curPos=new coord(0,0); //current position
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
                var mapa=new coord(0,0);
                var curPos=new coord(0,0);
                mapa.x = ((mouse.canvasCoord.x / map.blockSize) + 1) | 0; //zracuna koordinate v mapi in zaokrozi navzdol
                mapa.y = ((mouse.canvasCoord.y / map.blockSize) + 1) | 0;
                curPos.x = map.blockSize * (mapa.x - 1);
                curPos.y = map.blockSize * (mapa.y - 1);
                if ((mouse.canvasCoord.x >= 200 && mouse.canvasCoord.x <= 200 + map.blockSize) && (mouse.canvasCoord.y >= 602 && mouse.canvasCoord.y <= 627))
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
                                screen.clearRect(curPos.x, curPos.y, map.blockSize, map.blockSize);
                                screen.drawImage(map.block['wall'], curPos.x, curPos.y);
                                break;

                            case 2:
                                map.make.level[mapa.y][mapa.x] = 5;
                                screen.clearRect(curPos.x, curPos.y, map.blockSize, map.blockSize);
                                screen.drawImage(map.block['key_1'], curPos.x, curPos.y);
                                break;

                            case 3:
                                map.make.level[mapa.y][mapa.x] = 8;
                                screen.clearRect(curPos.x, curPos.y, map.blockSize, map.blockSize);
                                screen.drawImage(map.block['keylock_1'], curPos.x, curPos.y);
                                break;

                            case 4:
                                map.make.level[mapa.y][mapa.x] = 7;
                                screen.clearRect(curPos.x, curPos.y, map.blockSize, map.blockSize);
                                screen.drawImage(map.block['key_2'], curPos.x, curPos.y);
                                break;

                            case 5:
                                map.make.level[mapa.y][mapa.x] = 6;
                                screen.clearRect(curPos.x, curPos.y, map.blockSize, map.blockSize);
                                screen.drawImage(map.block['keylock_2'], curPos.x, curPos.y);
                                break;

                            case 6:
                                map.make.level[mapa.y][mapa.x] = 1;
                                screen.clearRect(curPos.x, curPos.y, map.blockSize, map.blockSize);

                                screen.drawImage(map.block['player'], curPos.x, curPos.y);

                                break;

                            case 7:
                                map.make.level[mapa.y][mapa.x] = 10;
                                screen.clearRect(curPos.x, curPos.y, map.blockSize, map.blockSize);
                                screen.drawImage(map.block['end'], curPos.x, curPos.y);
                                break;

                            case 8:
                                map.make.level[mapa.y][mapa.x]=11;

                                screen.clearRect(curPos.x, curPos.y, map.blockSize, map.blockSize);
                                screen.drawImage(map.block['enemy01'], curPos.x, curPos.y);
                                break;

                            case 9:
                                map.make.level[mapa.y][mapa.x] = 0;
                                screen.clearRect(curPos.x, curPos.y, map.blockSize, map.blockSize);
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
                        game.clear();
                        map.level=map.make.level;
                        map.keys.reset();
                        map.draw();
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

                        case 11:

                        enemy01.add(mapa.x,mapa.y);
                        console.log(mapa.x,mapa.y);
                        break;

                        case 1:
                        player.canvasCoord.x = (mapa.x - 1) * map.blockSize;
                        player.canvasCoord.y = (mapa.y - 1) * map.blockSize;
                        player.mapCoord.x = mapa.x;
                        player.mapCoord.y = mapa.y;
                        player.draw();
                        break;
                    }

                    mapa.x = mapa.x + 1;
                    curPos.x = curPos.x + map.blockSize;
                }
                mapa.y = mapa.y +1;
                curPos.y = curPos.y + map.blockSize;
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
                        this.taken = true;
                    }
                },
                unlock:function()
                {
                    map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                    this.num = this.num - 1;
                    map.drawPanel();
                    if (this.num == 0)
                    {
                        this.taken = false;
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
                    }
                },
                unlock:function()
                {
                    map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                    this.num = this.num - 1;
                    map.drawPanel();
                    if (this.num == 0)
                    {
                        this.taken = false;
                    }
                }
            },
            reset:function()
            {
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
            screen.drawImage(map.block['key_1'], 300, 602);
            screen.font = "25px Arial";
            screen.fillStyle = "yellow";
            screen.clearRect(325, 603, 40, map.blockSize);
            screen.fillText(map.keys.key_1.num, 327, 625);

            screen.drawImage(map.block['key_2'], 360, 602);
            screen.font = "25px Arial";
            screen.fillStyle = "white";
            screen.clearRect(385, 603, 40, map.blockSize);
            screen.fillText(map.keys.key_2.num, 387, 625);
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
            map.loadImg('wall','./blocks/wall.png');
            map.loadImg('key_1','./blocks/key_1.png');
            map.loadImg('key_2','./blocks/key_2.png');
            map.loadImg('end','./blocks/end.png');
            map.loadImg('keylock_1','./blocks/keylock_1.png');
            map.loadImg('keylock_2','./blocks/keylock_2.png');
            map.loadImg('player','./blocks/player.png');
            map.loadImg('enemy01','./blocks/enemy01.png');
        }


    };







}

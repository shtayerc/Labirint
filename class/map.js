function mapInit()
{
    map={
        blockSize:25, //velikost bloka v pikslih
        block:[],
        levelIndex:'00',
        level:[],
        button:{
            back:new text(0,625,'Back'),
            restart: new text(70,625,'Restart')

        },
        restart:function()
        {
            map.level=toArray(window['level_'+map.levelIndex]);
            game.clear();
            map.keys.reset();
            map.draw();
                map.drawPanel();
        
        },
        make:{
            level:empty,
            tick:10, //vsakih koliko ms se funkcija ponovi
            block:1, //kateri blok je izbran in se postavlja v mapo
            blockNum:9,
            loop:true,
            button:{
                back:new text(0,625,'Back'),
                clear:new text(70,625,'Clear')
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
                        screen.beginPath();
                        screen.rect(200, 602, map.blockSize, map.blockSize);
                        screen.fillStyle = "#0000FF";
                        screen.fill();
                        screen.closePath();
                        break;

                    case 7:
                        screen.clearRect(200, 602, map.blockSize, map.blockSize);
                        screen.drawImage(map.block['end'], 200, 602);
                        break;

                    case 8:
                        screen.clearRect(200, 602, map.blockSize, map.blockSize);
                        break;
                }
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
                                screen.beginPath();
                                screen.rect(curPos.x, curPos.y, map.blockSize, map.blockSize);
                                screen.fillStyle = "#0000FF";
                                screen.fill();
                                screen.closePath();
                                break;

                            case 7:
                                map.make.level[mapa.y][mapa.x] = 10;
                                screen.clearRect(curPos.x, curPos.y, map.blockSize, map.blockSize);
                                screen.drawImage(map.block['end'], curPos.x, curPos.y);
                                break;

                            case 8:
                                map.make.level[mapa.y][mapa.x] = 0;
                                screen.clearRect(curPos.x, curPos.y, map.blockSize, map.blockSize);
                                break;
                        }
                    }

                }
                if(map.make.button.back.isClicked())
                {
                    map.make.loop=false;
                    game.clear();
                    map.keys.reset();
                    game.menu.loop=true;
                    game.menu.main();

                }
                if(map.make.button.clear.isClicked())
                {
                    game.clear();
                    map.make.level=toArray(emptyTest);
                    map.make.panel();
                
                }
                if(map.make.loop!=false) 
                {
                    setTimeout(map.make.newLevel, map.make.tick);
                }


            }
        },
        draw:function()
        {
            var curPos=new coord(0,0); //current position
            var mapa = new coord(1,1); //zacetna pozicija risanja v dvodimenzionalnem polju 
            var limit = new coord(32,25); // meja polja po sirini, po visini

            while(mapa.y < limit.y) //zanka gre od 0,0 do limit.x, limit.y
            {
                mapa.x=1;
                curPos.x=0;
                while(mapa.x < limit.x)
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
                map.draw();
                //map.drawPanel();
            }                      
            map.block[name].src=url;
        },
        loadBlocks:function() //funkcija ki klice funkcijo map.loadImg in nalozi vse potrebne slike
        {
            map.loadImg('wall','./blocks/wall.png');
            map.loadImg('key_1','./blocks/key_1.png');
            map.loadImg('key_2','./blocks/key_2.png');
            map.loadImg('end','./blocks/end.png');
            map.loadImg('keylock_1','./blocks/keylock_1.png');
            map.loadImg('keylock_2','./blocks/keylock_2.png');

        }



    };







}

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
        getLevel:function(username)
        {
            if(typeof progress != 'undefined')
            {

                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        return this.response;
                    }
                }
                xmlhttp.open("GET", "getLevel.php?username="+username+"&num=0", true);
                xmlhttp.send();
            }
        },
        goToLevel:function(level)
        {

            clearInterval(player.animation.interval);
            map.levelIndex=level;
            map.level=toArray(window['level_'+map.levelIndex]);
            game.clear();
            map.keys.reset();
            enemy01.resetAll();
            player.getStartCoord();
            map.drawPlay();
            enemy01.patrolAll();
            map.drawPanel();

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
            blockNum:11, //stevilo blokov za izbiro v orodni vrstici pri kreiranju levela
            loop:true,
            selStart:200, //na koliko pikslih se narise prvi blok za izbiro
            selNum:9, //stevilo blokov za izbiro
            change:0, 
            curBlock:1, //zaporedno stevilo izbranega bloka
            select:{
                xStart:200,
                yStart:600,
                blockSize:25,
                num:9,
            },
            saveLevel:function(username,name)
            {
                if(typeof progress != 'undefined')
                {

                    var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            return this.response;
                        }
                    }
                    xmlhttp.open("GET", "saveLevel.php?username="+username+"&level="+map.make.levelString+"&name="+name, true);
                    xmlhttp.send();
                }


            },
            drawCurBlock:function(x,y)
            {
                screen.strokeStyle="red";
                var size=25;
                screen.rect(x,y,size,size);
                switch(map.make.curBlock)
                {
                    case 1:
                        screen.clearRect(x, y, size,size);
                        screen.drawImage(map.block['wall25'], x, y);
                        break;

                    case 2:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['key_1_25'], x, y);
                        break;

                    case 3:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['keylock_1_25'], x, y);
                        break;

                    case 4:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['key_2_25'], x, y);
                        break;

                    case 5:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['keylock_2_25'], x, y);
                        break;

                    case 6:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['player25'], x, y);

                        break;

                    case 7:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['end'], x, y);
                        break;

                    case 8:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['enemy01_25'], x, y);
                        break;

                    case 9:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['builder'], x,y);
                        break;



                }
                screen.stroke(); 
            },
            drawSelect:function()
            {
                for(var i=map.make.block;i<map.make.block+map.make.selNum;i=i+1)
                {
                    switch(i)
                    {
                        case 9:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['builder'], map.make.selStart, 602);
                            break;

                        case 1:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['wall25'], map.make.selStart, 602);
                            break;

                        case 2:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['key_1_25'], map.make.selStart, 602);
                            break;

                        case 3:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['keylock_1_25'], map.make.selStart, 602);
                            break;

                        case  4:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['key_2_25'], map.make.selStart, 602);
                            break;

                        case 5:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['keylock_2_25'], map.make.selStart, 602);
                            break;

                        case 6:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['player25'],map.make.selStart,602);
                            break;

                        case 7:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['end'], map.make.selStart, 602);
                            break;

                        case 8:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['enemy01_25'], map.make.selStart, 602);
                            break;

                    }
                    map.make.selStart+=map.blockSize/2;
                }


            },
            checkSelect:function()
            {
                for(var i=0;i<map.make.select.num*map.make.select.blockSize;i=i+map.make.select.blockSize)
                {   
                    if ((mouse.canvasCoord.x >= map.make.select.xStart+i && 
                        mouse.canvasCoord.x <= map.make.select.xStart + i + map.make.select.blockSize) && 
                            (mouse.canvasCoord.y >= map.make.select.yStart && mouse.canvasCoord.y <= map.make.select.yStart+map.make.select.blockSize))
                    {
                        if (mouse.click.left == true)
                        {
                            mouse.click.left=false;
                            map.make.curBlock=i/map.make.select.blockSize+1;
                        }

                    }
                }
            },
            button:{
                back:new text(0,625,'Back'),
                clear:new text(70,625,'Clear'),
                play:new text(500,625,'Play'),
                save:new text(560,625,'Save')


            },
            left:function() //funkcija se izvede ko uporabnik pritisne puscico levo, ikone se premaknejo levo
            {
                if(map.make.block>1)
                {
                    map.make.block=map.make.block-1;
                    map.make.panel();
                }
            },
            right:function() //funkcija se izvede ko uporabnik pritisne puscico desno, ikone se premaknejo desno
            {
                if(map.make.block<map.make.blockNum-map.make.selNum-1)
                {
                    map.make.block=map.make.block+1;
                    map.make.panel();
                }

            },
            panel:function() //narise orodno vrstico za kreiranje levela
            {
                screen.clearRect(0,602,800,25);
                screen.beginPath();
                screen.moveTo(0, 602);
                screen.lineTo(800, 602);
                screen.lineWidth = 2;
                screen.strokeStyle = "grey";
                screen.stroke();
                map.make.button.back.draw();
                map.make.button.clear.draw();
                map.make.button.play.draw();
                if(typeof progress != 'undefined')
                {
                map.make.button.save.draw();
                }
                    map.make.selStart=200;


                screen.beginPath();
                screen.fillStyle="white";
                screen.moveTo(170,615);
                screen.lineTo(190,603);
                screen.lineTo(190,627);
                screen.fill();


                screen.beginPath();
                screen.fillStyle="white";
                screen.moveTo(480,615);
                screen.lineTo(460,603);
                screen.lineTo(460,627);
                screen.fill();
                game.console.draw();
                map.make.drawSelect();
            },
            checkLevel:function() //preveri ce je kreiran level korekten (mora biti le en player in en cilj)
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
                    game.console.out('There is no player.');
                    ok=false;
                }
                if(player>1)
                {
                    game.console.out('One player allowed.');
                    ok=false;
                }
                if(end==0)
                {
                    game.console.out('There is no end.');
                    ok=false;
                }
                if(end>1)
                {
                    game.console.out('One end allowed.');
                    ok=false;
                }

                return ok;

            },
            newLevel:function() //funkcija se izvede ko uporabnik izbere create stage v osnovnem meniju 
            {
                var newBlockSize=25;
                var mapa=new coord(0,0);
                var curPos=new coord(0,0);
                mapa.x = ((mouse.canvasCoord.x / newBlockSize) + 1) | 0; //zracuna koordinate v mapi in zaokrozi navzdol
                mapa.y = ((mouse.canvasCoord.y / newBlockSize) + 1) | 0;
                curPos.x = newBlockSize * (mapa.x - 1);
                curPos.y = newBlockSize * (mapa.y - 1);
                game.clear();
                map.draw();
                map.make.checkSelect();


                if (mouse.canvasCoord.y < 600 && mapa.y <= 24)
                {
                    map.make.drawCurBlock(curPos.x,curPos.y);

                    document.body.style.cursor="none";
                    if (mouse.button.right == true) //ce pritisnes desno tipko zbrise blok
                    {
                        map.make.level[mapa.y][mapa.x] = 0;
                        screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                    }    

                    if (mouse.button.left == true)
                    {

                        switch(map.make.curBlock)
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
                                screen.drawImage(map.block['key_2_25'], curPos.x, curPos.y);
                                break;

                            case 5:
                                map.make.level[mapa.y][mapa.x] = 6;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['keylock_2_25'], curPos.x, curPos.y);
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
                                map.make.level[mapa.y][mapa.x] = 3;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['builder'], curPos.x, curPos.y);
                                break;



                        }
                    }
                }else
                {
                    document.body.style.cursor="default";

                }
                map.make.panel();
                map.level=map.make.level;
               
                if(map.make.button.save.isClicked())
                {
                    if(typeof progress != 'undefined')
                    {
                        if(map.make.checkLevel())
                        {
                            map.make.levelString=toMapString(map.make.level);    
                            if(map.make.saveLevel(username,'Test'))
                            {
                            game.console.out('Level saved');
                            
                            } 
                        }
                        }
                    }
                if(map.make.button.back.isClicked())
                {
                    if(typeof progress != 'undefined')
                    {
                        game.form.show();
                    }
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
                        map.level[player.mapCoord.y][player.mapCoord.x]=0; //nastavi zacetno polje igralca na 0
                        game.start();
                    }            


                }
                if(map.make.loop!=false) 
                {
                    setTimeout(map.make.newLevel, map.make.tick);
                }


            }

        },

        getBlock:function(x,y) //vrne ime polja map.block[] za podane koordinate(gleda polje map.level[]) 
        {
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

                    case 3:
                    return 'builder';
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
        drawPlay:function() //narise 13 blokov, glede na koordinate igralca (ta funkcija se izvaja ko igralec miruje, ko se premika se izvaja player.drawMovingFrame)
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
            var canLimit = new coord(601,551); //meja v pikslih canvasa
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
                        if(map.getBlock(mapa.x,mapa.y)=='enemy01')
                        {
                            screen.drawImage(enemy01.list[enemy01.findByCoord(mapa.x,mapa.y)].img, curPos.x, curPos.y);
                        }else
                        {
                            screen.drawImage(map.block[map.getBlock(mapa.x,mapa.y)], curPos.x, curPos.y);

                        }

                    } else
                    {
                        screen.drawImage(map.block['blank'], curPos.x, curPos.y);

                    }


                    mapa.x = mapa.x + 1;
                    row=row+1;
                    curPos.x = curPos.x + map.blockSize;
                }

                mapa.y = mapa.y +1;
                column=column+1;
                curPos.y = curPos.y + map.blockSize;


                player.draw();
            }


        },
        draw:function() //narise polje map.level v 25x25 velikosti blokov (uporablja se pri kreiranju levela)
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

                        case 3:
                        screen.drawImage(map.block['builder'], curPos.x, curPos.y);
                        break;
                        case 5:
                        screen.drawImage(map.block['key_1_25'], curPos.x, curPos.y);
                        break;

                        case 7:
                        screen.drawImage(map.block['key_2_25'], curPos.x, curPos.y);
                        break;

                        case 8:
                        screen.drawImage(map.block['keylock_1_25'], curPos.x, curPos.y);
                        break;

                        case 6:
                        screen.drawImage(map.block['keylock_2_25'], curPos.x, curPos.y);
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
                        player.inventory.update(player.inventory.getIndex('Key01_25x25.ong'),map.keys.key_1.num);

                    }
                },
                unlock:function()
                {
                    map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                    this.num = this.num - 1;
                    map.drawPanel();
                    if (this.num == 0)
                    {
                        player.inventory.remove(player.inventory.getIndex('Key01_25x25.png'));
                        this.taken = false;
                    }else
                    {
                        player.inventory.update(player.inventory.getIndex('Key01_25x25.png'),map.keys.key_1.num);

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
                        player.inventory.add(map.block['key_2_25'],map.keys.key_2.num);

                    }else
                    {
                        player.inventory.update(player.inventory.getIndex('Key02_25x25.png'),map.keys.key_2.num);

                    }
                },
                unlock:function()
                {
                    map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                    this.num = this.num - 1;
                    map.drawPanel();
                    if (this.num == 0)
                    {
                        player.inventory.remove(player.inventory.getIndex('Key02_25x25'));

                        // player.inventory.remove()
                        this.taken = false;
                    }else
                    {
                        player.inventory.update(player.inventory.getIndex('Key02_25x25.png'),map.keys.key_2.num);


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
        drawPanel:function() //narise orodno vrstico, ki se rise v meniju PLAY
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
        loading:function() //funkcija se zacne izvajati, ko se stran nalozi in se izvaja dokler se ne nalozijo vse slike
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
            map.loadImg('player25',path+'textures/25x25/Player_Front_25x25.png');
            map.loadImg('enemy01_25',path+'textures/25x25/Enemy01_25x25_r.png');
            map.loadImg('wall',path+'textures/50x50/Pyramid_Walls.png');
            map.loadImg('wall25',path+'textures/25x25/Pyramid_Walls_25x25.png');
            map.loadImg('key_1',path+'textures/50x50/Key01.png');
            map.loadImg('key_1_25',path+'textures/25x25/Key01_25x25.png');
            map.loadImg('key_2',path+'textures/50x50/Key02.png');
            map.loadImg('key_2_25',path+'textures/25x25/Key02_25x25.png');
            map.loadImg('end',path+'textures/25x25/end.png');
            map.loadImg('keylock_1',path+'textures/50x50/Keyhole01.png');
            map.loadImg('keylock_1_25',path+'textures/25x25/Keyhole01_25x25.png');
            map.loadImg('keylock_2_25',path+'textures/25x25/Keyhole02_25x25.png');
            map.loadImg('keylock_2',path+'textures/50x50/Keyhole02.png');
            map.loadImg('playerDown1',path+'textures/50x50/Player_Front1.png');
            map.loadImg('playerDown2',path+'textures/50x50/Player_Front2.png');
            map.loadImg('playerUp1',path+'textures/50x50/Player_Back1.png');
            map.loadImg('playerUp2',path+'textures/50x50/Player_Back2.png');
            map.loadImg('playerLeft1',path+'textures/50x50/Player_Left1.png');
            map.loadImg('playerLeft2',path+'textures/50x50/Player_Left2.png');
            map.loadImg('playerRight1',path+'textures/50x50/Player_Right1.png');
            map.loadImg('playerRight2',path+'textures/50x50/Player_Right2.png');
            map.loadImg('enemy01L',path+'textures/50x50/Enemy01_Left.png');
            map.loadImg('enemy01R',path+'textures/50x50/Enemy01_Right.png');
            map.loadImg('enemy01',path+'textures/50x50/Enemy01_Left.png');
            map.loadImg('floor',path+'textures/50x50/Floor.png');
            map.loadImg('floorBig', path+'textures/background/Pyramid_Floor.png');
            map.loadImg('blank',path+'textures/50x50/blank.png');
            map.loadImg('builder',path+'textures/25x25/builder.png');
        }


    };







}

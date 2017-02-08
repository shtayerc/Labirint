function mapInit()
{
    map={
        blockSize:50, //velikost bloka v pikslih
        block:[], //tu so shranjene slike za igro
        levelIndex:'00', //stevilo trenutnega levela
        level:[], //polje ovir za trenutni level
        imgLoaded:0,
        button:{
            back:new text(0,625,'Back'),
            restart: new text(70,625,'Restart')

        },
        getLevel:function(username,num)
        {
            if(game.session.isActive())
            {
                ajaxGet(function (level){

                    map.make.loadLevel(level);},'getLevel.php','username='+username+'&num='+num);
            }
        },
        goToLevel:function(level)
        {

            clearInterval(player.animation.interval);
            map.levelIndex=level;
            map.level=toArray(window['level_'+map.levelIndex]);
            game.clear();
            game.reset();
            //map.keys.reset();
            // enemy01.resetAll();
            game.init();
            // player.getStartCoord();
            map.draw50();
            //  enemy01.patrolAll();
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
                game.console.out('The end');
                game.loop=false;
            }

        }, 
        restart:function()
        {
            if(map.make.flag==true)
            {
                map.level=toArray(map.make.levelString);
                game.clear();
                game.reset();
            }else
            {   
                map.level=toArray(window['level_'+map.levelIndex]);
                game.clear();
                game.reset();
            }
            game.init();
            map.draw50();
            map.drawPanel();
        },
        make:{
            levelString:'', //string levela(se ustvari iz polja)
            flag:false, //ce je true funkcija game.start uporablja level iz map.make.level in funkcijo map.make.newLevel 
            level:toArray(emptyLevel), //polje levela
            tick:10, //vsakih koliko ms se funkcija ponovi
            block:1, //kateri blok je izbran in se postavlja v mapo
            blockNum:12, //stevilo blokov za izbiro v orodni vrstici pri kreiranju levela
            loop:true,
            selStart:150, //na koliko pikslih se narise prvi blok za izbiro
            selNum:10, //stevilo blokov za izbiro
            change:0, 
            curBlock:1, //zaporedno stevilo izbranega bloka
            select:{
                xStart:150,
                yStart:600,
                blockSize:25,
                num:10,
                page:1
            },
            saveInFile:function(filename,text)
            {                   //https://jsfiddle.net/rce6nn3z/

                var element = document.createElement('a');
                element.setAttribute('href', 'data:text/maps;charset=utf-8,' + encodeURIComponent(text));
                element.setAttribute('download', filename);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);

            },
            loadFromFile:function()
            {
                x = document.createElement("INPUT");
                x.id="filed";
                x.type="file";
                x.accept=".maps";
                x.click();
                x.onchange=function (){
                    var reader= new FileReader();
                    reader.onloadend = function(evt) {
                        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
                            map.make.loadLevel(evt.target.result);

                        }
                    };
                    var test=x.files[0].slice(0,x.files[0].size);
                    reader.readAsBinaryString(test);




                };


            },
            deleteLevel:function(username,num)
            {
                if(game.session.isActive())
                {

                    /*          var xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {

                            return this.response;
                        }
                    }
                    xmlhttp.open("GET", "deleteLevel.php?username="+username+"&num="+num, true);
                    xmlhttp.send();

*/
                    ajaxSend('deleteLevel.php','username='+username+'&num='+num);
                    game.load.levels.name.splice(num,1);
                    game.load.levels.makeButtons();
                    //                   ajaxGet(function (num){game.load.levels.num=num;},'countUserLevels.php','username='+username);


                }


            },
            loadLevel:function(level)
            {
                game.clear();
                game.menu.loop=false;
                map.make.level=toArray(level);
                map.level=toArray(level);
                map.draw25();
                map.make.loop=true;
                map.make.panel();
                map.make.newLevel();
            },
            saveLevel:function(username,num)
            {

                if(game.session.isActive())
                {
                    if(num<10)
                    {
                        var xmlhttp = new XMLHttpRequest();
                        //xmlhttp.onreadystatechange = function() {
                           /* if (this.readyState == 4 && this.status == 200) {

                                return this.response;
                            }*/
                     //   }
                        xmlhttp.open("GET", "saveLevel.php?username="+username+"&level="+map.make.levelString+"&name=Level "+num, true);
                        xmlhttp.send();
                        game.console.out('Level saved as');

                        game.console.out('Level '+num);
                        //     game.load.levels.name[game.load.levels.length]='Level '+game.load.levels.num;
                        //   game.load.levels.num=game.load.levels.num+1;

                      //  ajaxGet(function (num){game.load.levels.num=num;},'countUserLevels.php','username='+username);

                    }
                    else
                    {

                        game.console.out('10 levels max');
                    }
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
                        screen.drawImage(map.block['enemy02_25'], x, y);
                        break;

                    case 10:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['builder'], x,y);
                        break;

                    case 11:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['ice25'], x,y);
                        break;

                    case 12:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['crack1_25'], x,y);
                        break;

                    case 13:
                        screen.clearRect(x, y, size, size);
                        screen.drawImage(map.block['crack2_25'], x,y);
                        break;



                }
                screen.stroke(); 
            },
            drawSelect:function()
            {
                if(map.make.select.page==2)
                {

                    map.make.block=11;
                }
                if(map.make.select.page==1)
                {
                    map.make.block=1;
                }
                for(var i=map.make.block;i<(map.make.block+map.make.selNum)*map.make.select.page;i=i+1)
                {
                    switch(i)
                    {
                        case 12:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['crack1_25'], map.make.selStart, 602);

                            break;
                        case 13:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['crack2_25'], map.make.selStart, 602);

                            break;

                        case 10:
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

                        case 9:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['enemy02_25'], map.make.selStart, 602);
                            break;

                        case 11:
                            screen.clearRect(map.make.selStart, 602, map.blockSize/2, map.blockSize/2);
                            screen.drawImage(map.block['ice25'], map.make.selStart, 602);
                            break;


                    }
                    map.make.selStart+=map.blockSize/2;
                }


            },
            checkSelect:function()
            {
                var xDiff=11;
                var yDiff=11;
                for(var i=0;i<map.make.select.num*map.make.select.blockSize;i=i+map.make.select.blockSize)
                {   
                    if ((mouse.canvasCoord.x >= map.make.select.xStart+i+xDiff && 
                        mouse.canvasCoord.x <= map.make.select.xStart + i + map.make.select.blockSize+xDiff) && 
                            (mouse.canvasCoord.y >= map.make.select.yStart+yDiff && mouse.canvasCoord.y <= map.make.select.yStart+map.make.select.blockSize+yDiff))
                    {
                        if (mouse.click.left == true)
                        {
                            if(map.make.select.page==2)
                            {
                                mouse.click.left=false;
                                map.make.curBlock=i/map.make.select.blockSize+1+10;


                            }else
                            {
                                mouse.click.left=false;
                                map.make.curBlock=i/map.make.select.blockSize+1;
                            }
                        }

                    }

                }
            },
            button:{
                back:new text(0,625,'Back'),
                clear:new text(60,625,'Clear'),
                play:new text(427,625,'Play'),
                saveF:new text(480,625,'SaveFile'),
                save:new text(580,625,'SaveDb')


            },
            left:function() //funkcija se izvede ko uporabnik pritisne puscico levo, ikone se premaknejo levo
            {
                console.log('left');
                if(map.make.block>1)
                {
                    map.make.block=map.make.block-1;
                    map.make.panel();
                }
            },
            right:function() //funkcija se izvede ko uporabnik pritisne puscico desno, ikone se premaknejo desno
            {
                console.log('right');
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
                if(game.session.isActive())
                {
                    map.make.button.save.draw();
                }
                map.make.button.saveF.draw();
                map.make.selStart=150;


                screen.beginPath();
                screen.fillStyle="white";
                screen.moveTo(125,615);
                screen.lineTo(145,603);
                screen.lineTo(145,627);
                screen.fill();


                screen.beginPath();
                screen.fillStyle="white";
                screen.moveTo(425,615);
                screen.lineTo(405,603);
                screen.lineTo(405,627);
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
                map.draw25();
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
                                map.make.level[mapa.y][mapa.x]=12;
                                screen.clearRect(curPos.x,curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['enemy02_25'],curPos.x,curPos.y);
                                break;

                            case 10:
                                map.make.level[mapa.y][mapa.x] = 3;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['builder'], curPos.x, curPos.y);
                                break;

                            case 11:
                                map.make.level[mapa.y][mapa.x] = 4;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['ice25'], curPos.x, curPos.y);
                                break;

                            case 12:
                                map.make.level[mapa.y][mapa.x] = 9;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['crack1_25'], curPos.x, curPos.y);
                                break;
                            case 13:
                                map.make.level[mapa.y][mapa.x] = 99;
                                screen.clearRect(curPos.x, curPos.y, newBlockSize, newBlockSize);
                                screen.drawImage(map.block['crack2_25'], curPos.x, curPos.y);
                                break;





                        }
                    }
                }else
                {
                    document.body.style.cursor="default";

                }
                map.make.panel();
                map.level=map.make.level;
                if(game.session.isActive())
                {

                    if(map.make.button.save.isClicked())
                    {
                        if(map.make.checkLevel())
                        {
                            map.make.levelString=toMapString(map.make.level);    

                            ajaxGet(function (num){map.make.saveLevel(game.session.username,num);},'getLowLevelNum.php','username='+game.session.username);
                            /*    if(map.make.saveLevel(game.session.username))
                            {
                                                       game.console.out('Level saved');

                            } 
*/
                        }

                    }
                }
                if(map.make.button.saveF.isClicked())
                {
                    map.make.levelString=toMapString(map.level);
                    map.make.saveInFile('newLevel.maps',map.make.levelString);

                }
                if((mouse.canvasCoord.x >= 130 && mouse.canvasCoord.x <= 160) && 
                    (mouse.canvasCoord.y >= 602+10 && mouse.canvasCoord.y <= 626+10))
                {
                    if(mouse.click.left==true)
                    {
                        mouse.click.left=false;
                        map.make.select.page=1;
                    }
                }


                if((mouse.canvasCoord.x >= 410 && mouse.canvasCoord.x <= 435) && 
                    (mouse.canvasCoord.y >= 602+10 && mouse.canvasCoord.y <= 626+10))
                {

                    if(mouse.click.left==true)
                    {

                        mouse.click.left=false;
                        map.make.select.page=2;
                    }



                }

                if(map.make.button.back.isClicked())
                {
                    //if(typeof progress != 'undefined')
                    // {
                    //     game.form.show();
                    // }
                    game.reset();
                    //  console.log('ja');
                    //  enemy01.resetAll();
                    map.make.flag=false;
                    map.make.loop=false;
                    map.make.levelString=toMapString(map.make.level);
                    game.clear();
                    //  map.keys.reset();
                    game.menu.loop=true;
                    game.menu.main();

                }
                if(map.make.button.clear.isClicked())
                {
                    game.reset();
                    //  enemy01.resetAll();
                    game.clear();
                    map.make.level=toArray(emptyLevel);
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
                        game.reset();
                        //enemy01.resetAll();
                        game.clear();
                        map.level=map.make.level;
                        // map.keys.reset();
                        game.init();
                        //  player.getStartCoord();
                        map.draw50();
                        map.drawPanel();
                        //  enemy01.patrolAll();
                        //   map.level[player.mapCoord.y][player.mapCoord.x]=0; //nastavi zacetno polje igralca na 0
                        game.start();
                    }            


                }
                if(map.make.loop!=false) 
                {
                    setTimeout(map.make.newLevel, map.make.tick);
                }


            }

        },
        getBlock25:function(x,y)
        {
            if(typeof(map.level[y]) != 'undefined' && typeof(map.level[y][x]) != 'undefined')
            {
                switch(map.level[y][x]) //preverja polje map.level in narise ustrezen blok
                {
                    case 0:
                    return false;
                    break;

                    case 1:
                    return 'player25';
                    break;

                    case 2:
                    return 'wall25';
                    break;

                    case 3:
                    return 'builder';
                    break;

                    case 4:
                    return 'ice25';
                    break;

                    case 5:
                    return 'key_1_25';
                    break;

                    case 7:
                    return 'key_2_25';
                    break;

                    case 8:
                    return 'keylock_1_25';
                    break;

                    case 6:
                    return 'keylock_2_25';
                    break;

                    case 9:
                    return 'crack1_25';
                    break;

                    case 99:
                    return 'crack2_25';
                    break;

                    case 10:
                    return 'end';
                    break;

                    case 11:
                    return 'enemy01_25';
                    break;

                    case 12: 
                    return 'enemy02_25';
                    break; 

                    default:
                    return false;
                    break;
                }

            }else
            {
                return false;
            }
        },

        getBlock50:function(x,y) //vrne ime polja map.block[] za podane koordinate(gleda polje map.level[]) 
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
                    return 'builder50';
                    break;

                    case 4:
                    return 'ice50';
                    break;

                    case 5:
                    return 'key_1';
                    break;

                    case 6:
                    return 'keylock_2';
                    break;

                    case 7:
                    return 'key_2';
                    break;

                    case 8:
                    return 'keylock_1';
                    break;

                    case 9: 
                    return 'crack1_50';
                    break;

                    case 99:
                    return 'crack2_50';
                    break;

                    case 10:
                    return 'end50';
                    break;

                    case 11:
                    return 'enemy01';
                    break;

                    case 12:
                    return 'enemy02';
                    break;

                    case 13:
                    return 'enemy03';
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
        draw50:function() //narise 13 blokov, glede na koordinate igralca (ta funkcija se izvaja ko igralec miruje, ko se premika se izvaja player.drawMovingFrame)
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
                        if(map.getBlock50(mapa.x,mapa.y)=='enemy03')
                        {
                            screen.drawImage(enemy03.list[enemy03.findByCoord(mapa.x,mapa.y)].img, curPos.x, curPos.y);

                        }else if(map.getBlock50(mapa.x,mapa.y)=='enemy02')
                        {
                            screen.drawImage(enemy02.list[enemy02.findByCoord(mapa.x,mapa.y)].img, curPos.x, curPos.y);

                        }else if(map.getBlock50(mapa.x,mapa.y)=='enemy01')
                        {
                            screen.drawImage(enemy01.list[enemy01.findByCoord(mapa.x,mapa.y)].img, curPos.x, curPos.y);
                        }else
                        {
                            screen.drawImage(map.block[map.getBlock50(mapa.x,mapa.y)], curPos.x, curPos.y);

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
        draw25:function() //narise polje map.level v 25x25 velikosti blokov (uporablja se pri kreiranju levela)
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
                    if(map.getBlock25(mapa.x,mapa.y)!=false)
                    {
                        screen.drawImage(map.block[map.getBlock25(mapa.x,mapa.y)], curPos.x,curPos.y);
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
                    if (this.num == 1)
                    {
                        player.inventory.add(map.block['key_1_25'],map.keys.key_1.num);

                        this.taken = true;
                    }else
                    {
                        player.inventory.update(player.inventory.getIndex('Key01_25x25.png'),map.keys.key_1.num);

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
            screen.clearRect(0,603,800,24);
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
            map.loadImg('mute',path+'textures/Interface/Mute.png');
            map.loadImg('sound',path+'textures/Interface/Sound.png');
            map.loadImg('hp',path+'textures/Interface/Hp_Bar.png');
            map.loadImg('enemy03B0',path+'textures/50x50/Enemy03_Back0.png');
            map.loadImg('enemy03B1',path+'textures/50x50/Enemy03_Back1.png');       
            map.loadImg('enemy03B2',path+'textures/50x50/Enemy03_Back3.png');
            map.loadImg('enemy03F0',path+'textures/50x50/Enemy03_Front0.png');     
            map.loadImg('enemy03F1',path+'textures/50x50/Enemy03_Front1.png');  
            map.loadImg('enemy03F2',path+'textures/50x50/Enemy03_Front3.png');   
            map.loadImg('enemy03L0',path+'textures/50x50/Enemy03_Left0.png');         
            map.loadImg('enemy03L1',path+'textures/50x50/Enemy03_Left1.png');  
            map.loadImg('enemy03L2',path+'textures/50x50/Enemy03_Left3.png');      
            map.loadImg('enemy03R0',path+'textures/50x50/Enemy03_Right0.png');                                                      
            map.loadImg('enemy03R1',path+'textures/50x50/Enemy03_Right1.png');                                                      
            map.loadImg('enemy03R2',path+'textures/50x50/Enemy03_Right3.png');                                                                                   
            map.loadImg('crack1_50',path+'textures/50x50/Crack.png');
            map.loadImg('crack2_50',path+'textures/50x50/Crack1.png');
            map.loadImg('crack1_25',path+'textures/25x25/Crack_25x25.png');
            map.loadImg('crack2_25',path+'textures/25x25/Crack1_25x25.png');
            map.loadImg('ice25',path+'textures/25x25/Ice_25x25.png');
            map.loadImg('ice50',path+'textures/50x50/Ice.png');
            map.loadImg('player25',path+'textures/25x25/Player_Front_25x25.png');
            map.loadImg('enemy01_25',path+'textures/25x25/Enemy01_25x25_r.png');
            map.loadImg('enemy02_25',path+'textures/25x25/Enemy01_25x25.png');
            map.loadImg('wall',path+'textures/50x50/Pyramid_Walls.png');
            map.loadImg('wall25',path+'textures/25x25/Pyramid_Walls_25x25.png');
            map.loadImg('key_1',path+'textures/50x50/Key01.png');
            map.loadImg('key_1_25',path+'textures/25x25/Key01_25x25.png');
            map.loadImg('key_2',path+'textures/50x50/Key02.png');
            map.loadImg('key_2_25',path+'textures/25x25/Key02_25x25.png');
            map.loadImg('end',path+'textures/25x25/end_25x25.png');
            map.loadImg('end50',path+'textures/50x50/end.png');
            map.loadImg('keylock_1',path+'textures/50x50/Keyhole01.png');
            map.loadImg('keylock_1_25',path+'textures/25x25/Keyhole01_25x25.png');
            map.loadImg('keylock_2_25',path+'textures/25x25/Keyhole02_25x25.png');
            map.loadImg('keylock_2',path+'textures/50x50/Keyhole02.png');
            map.loadImg('playerAR0',path+'textures/50x50/Player_Right_stab.png');
            map.loadImg('playerAR1',path+'textures/50x50/Player_Right_stab2.png');
            map.loadImg('playerDown0',path+'textures/50x50/Player_Front.png');
            map.loadImg('playerDown1',path+'textures/50x50/Player_Front1.png');
            map.loadImg('playerDown2',path+'textures/50x50/Player_Front2.png');
            map.loadImg('playerUp0',path+'textures/50x50/Player_Back.png');
            map.loadImg('playerUp1',path+'textures/50x50/Player_Back1.png');
            map.loadImg('playerUp2',path+'textures/50x50/Player_Back2.png');
            map.loadImg('playerLeft0',path+'textures/50x50/Player_Left.png')
            map.loadImg('playerLeft1',path+'textures/50x50/Player_Left1.png');
            map.loadImg('playerLeft2',path+'textures/50x50/Player_Left2.png');
            map.loadImg('playerRight0',path+'textures/50x50/Player_Right.png');
            map.loadImg('playerRight1',path+'textures/50x50/Player_Right1.png');
            map.loadImg('playerRight2',path+'textures/50x50/Player_Right2.png');
            map.loadImg('enemy01D',path+'textures/50x50/Enemy01_Front.png');
            map.loadImg('enemy01U',path+'textures/50x50/Enemy01_Back.png');
            map.loadImg('enemy01L',path+'textures/50x50/Enemy01_Left.png');
            map.loadImg('enemy01R',path+'textures/50x50/Enemy01_Right.png');
            map.loadImg('enemy01',path+'textures/50x50/Enemy01_Left.png');
            map.loadImg('floor',path+'textures/50x50/Floor.png');
            map.loadImg('floorBig', path+'textures/background/Pyramid_Floor.png');
            map.loadImg('blank',path+'textures/50x50/blank.png');
            map.loadImg('builder',path+'textures/25x25/boulder_25x25.png');
            map.loadImg('builder50',path+'textures/50x50/boulder.png');

        }


    };







}

function playerInit()
{
    player={
        color:"#0000FF",
        mapCoord:new coord(8,2), //koordinati v polju labirinta
        hp:100,
        dmg:20,
        speed:5,
        img:map.block['playerDown1'],
        movingInterval:0,
        state:0,
        isMoving:false,
        dir:'down',
        canAttack:true,
        lastDir:'',
        attack:function(dir)
        {
            var speed=120;
            var cd=1000;
            var vmes='';
            if(player.canAttack==true)
            {
                var nextBlock=new coord(0,0);
                switch(dir)
                {
                    case 'up':
                        nextBlock.x=player.mapCoord.x;
                        nextBlock.y=player.mapCoord.y-1;
                        vmes='F';
                        break;
                    case 'down':
                        nextBlock.x=player.mapCoord.x;
                        nextBlock.y=player.mapCoord.y+1;
                        vmes='B';
                        break;
                    case 'left':
                        nextBlock.x=player.mapCoord.x-1;
                        nextBlock.y=player.mapCoord.y;
                        vmes='L';
                        break;
                    case 'right':
                        nextBlock.x=player.mapCoord.x+1;
                        nextBlock.y=player.mapCoord.y;
                        vmes='R';
                        break;
                }
                if(map.level[nextBlock.y][nextBlock.x]==11 || map.level[nextBlock.y][nextBlock.x]==12 || map.level[nextBlock.y][nextBlock.x]==13)
                {
                switch(map.level[nextBlock.y][nextBlock.x])
                    {
                        case 11:
                            enemy01.list[enemy01.findByCoord(nextBlock.x,nextBlock.y)].hp-=player.dmg;
                            console.log(enemy01.list[enemy01.findByCoord(nextBlock.x,nextBlock.y)].hp);
                            break;

                        case 12:
                            enemy02.list[enemy02.findByCoord(nextBlock.x,nextBlock.y)].hp-=player.dmg;
                            console.log(enemy02.findByCoord(nextBlock.x,nextBlock.y));
                            break;

                        case 13:
                             enemy03.list[enemy03.findByCoord(nextBlock.x,nextBlock.y)].hp-=player.dmg;
                            console.log(enemy03.findByCoord(nextBlock.x,nextBlock.y));
                            break;
                    }
                
                }
                player.canAttack=false;
                player.img=map.block['playerA'+vmes+'0'];
                setTimeout(function (vmes){player.img=map.block['playerA'+vmes+'1'];},speed,vmes);
                setTimeout(function (dir){
                    player.img=map.block['player'+dir.charAt(0).toUpperCase()+dir.slice(1)+'0'];player.canAttack=true;},cd,dir);
            }
      },
        animation:{
            isPlaying:false,
            speed:160,
            interval:0,
            num:0,
            thirdImg:false,
            start:function (img1,img2,img3)
            {
                player.animation.num=0;  
                if(player.animation.isPlaying==false)
                {  
                    player.animation.isPlaying=true;
                }else
                {

                    clearInterval(player.animation.interval);
               }
                player.animation.nextFrame(img1,img2,img3); 

                player.animation.interval=setInterval(function (){
                    player.animation.nextFrame(img1,img2,img3);
                },player.animation.speed);

            },
            nextFrame:function (img1,img2,img3)
            {
                if(player.animation.num%2==0)
                {
                    player.img=img1;
                }else
                { 
                    if((player.mapCoord.y+player.mapCoord.x)%2==0)
                    {
                        player.img=img3;
                    }else
                    {
                        player.img=img2;

                    }
                }
                player.animation.num+=1;
                player.draw();
                if(player.animation.num==3)
                {
                    player.animation.num=0;
                    player.animation.isPlaying=false;
                    clearInterval(player.animation.interval);
                }
            }
        },
        movingFrame:{
            xCh:0, //x change
            yCh:0, //y change
            start:new coord(0,0),
            firstLine:0,
            midLine:0,
            lastLine:0,
            exitCount:0, 
            interval:0 // tu je shranjen interval premikanja igralca
        },
        inventory:{
            canvasCoord:new coord(655,400),
            drawSize:new coord(125,80),
            start:new coord(660,500),
            slot:[],
            size:new coord(5,2),
            maxItems:10,
            cellSize:new coord(25,40),
            color:"#d3d3d3",
            clear:function()
            {
                screen.clearRect(650,400,150,200);
            },
            draw:function()
            {
                screen.beginPath();               
                for (var x = 0; x <= player.inventory.drawSize.x; x += player.inventory.cellSize.x) {
                    screen.moveTo(0.5 + x + player.inventory.start.x, player.inventory.start.y);
                    screen.lineTo(0.5 + x + player.inventory.start.x, player.inventory.drawSize.y + player.inventory.start.y);
                }
                for (var x = 0; x <= player.inventory.drawSize.y; x += player.inventory.cellSize.y) {
                    screen.moveTo(player.inventory.start.x, 0.5 + x + player.inventory.start.y);
                    screen.lineTo(player.inventory.drawSize.x + player.inventory.start.x, 0.5 + x + player.inventory.start.y);
                }

                screen.strokeStyle = player.inventory.color;
                screen.stroke();
                screen.fillStyle="white";
                screen.font="12px Arial";
                var k=0;
                var i=0;
                for(var c=0;c<player.inventory.maxItems;c=c+1)
                {

                    if(typeof(player.inventory.slot[c]) != 'undefined' && player.inventory.slot[c] != null)
                    {

                        screen.drawImage(player.inventory.slot[c].img,player.inventory.start.x+i*player.inventory.cellSize.x,
                            player.inventory.start.y+k*player.inventory.cellSize.y);
                        screen.fillText(player.inventory.slot[c].num,player.inventory.start.x+i*player.inventory.cellSize.x+3,
                            player.inventory.start.y+k*player.inventory.cellSize.y+35);
                    }
                    i=i+1;
                    if(i==5)
                    {
                        i=0;
                        k=k+1;
                    }
                }            
            },
            add:function(img,num)
            {
                for(var i=0;i<player.inventory.maxItems;i=i+1)
                {
                    if(player.inventory.slot[i] == null)
                    {
                        player.inventory.slot[i]={
                            img:img,
                            num:num
                        };
                        break;
                    }
                }
            },
            update:function(i,num)
            {
                player.inventory.slot[i].num=num;

            },
            remove:function(i)
            {
                player.inventory.slot[i]=null;

            },
            getIndex:function(string)
            {
                for(var i=0;i<player.inventory.maxItems;i=i+1)
                {
                    if(typeof(player.inventory.slot[i]) != 'undefined' && player.inventory.slot[i] != null)
                    {

                        if(player.inventory.slot[i].img.src.includes(string))
                        {
                            return i;
                        }
                    }
                }
            }

        },
        getStartCoord:function()
        {
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
                        case 11:
                        enemy01.add(mapa.x,mapa.y);
                        break;
                        
                        case 12:
                        enemy02.add(mapa.x,mapa.y);
                        break;

                        case 13:
                        enemy03.add(mapa.x,mapa.y);
                        break;

                        case 1:
                        player.canvasCoord.x=6* map.blockSize;
                        player.canvasCoord.y=6 * map.blockSize;
                        player.mapCoord.x = mapa.x;
                        player.mapCoord.y = mapa.y;
                        player.movingFrame.start=new coord(mapa.x-6,mapa.y-6);
                        break;
                    }

                    mapa.x = mapa.x + 1;
                    curPos.x = curPos.x + map.blockSize;
                }
                mapa.y = mapa.y +1;
                curPos.y = curPos.y + map.blockSize;
            }


        },
        slide:function(dir)
        {
             player.isMoving=true;
                clearInterval(player.animation.interval);
           if(player.lastDir==dir)
            {
                player.movingFrame.start.y=player.movingFrame.start.y+player.movingFrame.yCh;
                player.movingFrame.start.x=player.movingFrame.start.x+player.movingFrame.xCh;
            }
            if(dir=='up')
            {
                player.img=map.block['playerUp1'];
                if(player.lastDir=='right')
                {
                    player.movingFrame.start.y=player.movingFrame.start.y-1;
                    player.movingFrame.start.x=player.movingFrame.start.x+1;
                }
                if(player.lastDir=='left')
                {

                    player.movingFrame.start.y=player.movingFrame.start.y-1;
                }
                if(player.lastDir=='')
                {
                    player.movingFrame.start.y=player.movingFrame.start.y-1;
                }
                player.lastDir='up';
                player.movingFrame.lastLine=0;
                player.movingFrame.midLine=0;
                player.movingFrame.firstLine=50;
                player.movingFrame.yCh=-1;
                player.movingFrame.xCh=0;
            }
            if(dir=='down')
            {
                player.img=map.block['playerDown1'];
                player.movingFrame.yCh=+1;
                if(player.lastDir=='right')
                {
                    player.movingFrame.start.x=player.movingFrame.start.x+1;
                }


                player.lastDir='down';
                player.movingFrame.lastLine=-50;
                player.movingFrame.midLine=-50;
                player.movingFrame.firstLine=0;
                player.movingFrame.xCh=0;
            }
            if(dir=='left')
            {
             player.img=map.block['playerLeft1'];
                player.movingFrame.xCh=-1;
                if(player.lastDir=='down')
                {
                    player.movingFrame.start.y=player.movingFrame.start.y+1;

                }
                if(player.lastDir!='left' && player.lastDir!='right')
                {
                    player.movingFrame.start.x=player.movingFrame.start.x+player.movingFrame.xCh;

                }
                player.lastDir='left';
                player.movingFrame.midLine=0;
                player.movingFrame.firstLine=50; 
                player.movingFrame.lastLine=0;    
                player.movingFrame.yCh=0;
            }
            if(dir== 'right')
            {
                player.img=map.block['playerRight1'];
                if(player.lastDir=='down')
                {
                    player.movingFrame.start.y=player.movingFrame.start.y+1;

                }
                player.lastDir='right';
                player.movingFrame.firstLine=0;
                player.movingFrame.midLine=-50;
                player.movingFrame.lastLine=-50;
                player.movingFrame.xCh=1;
                player.movingFrame.yCh=0;
            }
            player.movingFrame.exitCount=0;
            player.mapCoord.x=player.mapCoord.x+player.movingFrame.xCh;
            player.mapCoord.y=player.mapCoord.y+player.movingFrame.yCh; 
            player.isMoving=true;          
            player.movingFrame.interval=setInterval(function (){

                if(player.movingFrame.exitCount>=map.blockSize){
                    player.isMoving=false;
                    switch(player.lastDir)
                    {
                        case 'left':
                            player.img=map.block['playerLeft0'];
                            break;
                        case 'right':
                         player.img=map.block['playerRight0'];
                            break;

                    }
                    clearInterval(player.movingFrame.interval);

                }
                player.movingFrame.firstLine=player.movingFrame.firstLine+player.movingFrame.yCh+player.movingFrame.xCh;
                player.movingFrame.lastLine=player.movingFrame.lastLine+player.movingFrame.yCh+player.movingFrame.xCh; 
                player.movingFrame.midLine=player.movingFrame.midLine+player.movingFrame.yCh+player.movingFrame.xCh;     
                player.movingFrame.exitCount+=1;
            },player.speed);
        },

        move:function(dir)
        {   
            if(player.lastDir==dir)
            {
                player.movingFrame.start.y=player.movingFrame.start.y+player.movingFrame.yCh;
                player.movingFrame.start.x=player.movingFrame.start.x+player.movingFrame.xCh;
            }
            if(dir=='up')
            {
                player.dir='up';
                player.animation.start(map.block['playerUp0'],map.block['playerUp2'],map.block['playerUp1']);

                if(player.lastDir=='right')
                {
                    player.movingFrame.start.y=player.movingFrame.start.y-1;
                    player.movingFrame.start.x=player.movingFrame.start.x+1;
                }
                if(player.lastDir=='left')
                {

                    player.movingFrame.start.y=player.movingFrame.start.y-1;
                }
                if(player.lastDir=='')
                {
                    player.movingFrame.start.y=player.movingFrame.start.y-1;
                }
                player.lastDir='up';
                player.movingFrame.lastLine=0;
                player.movingFrame.midLine=0;
                player.movingFrame.firstLine=50;
                player.movingFrame.yCh=-1;
                player.movingFrame.xCh=0;
            }
            if(dir=='down')
            {
                player.dir='down';
                player.animation.start(map.block['playerDown0'],map.block['playerDown2'],map.block['playerDown1']);
                player.movingFrame.yCh=+1;
                if(player.lastDir=='right')
                {
                    player.movingFrame.start.x=player.movingFrame.start.x+1;
                }


                player.lastDir='down';
                player.movingFrame.lastLine=-50;
                player.movingFrame.midLine=-50;
                player.movingFrame.firstLine=0;
                player.movingFrame.xCh=0;
            }
            if(dir=='left')
            {
                player.dir='left';
                player.animation.start(map.block['playerLeft0'],map.block['playerLeft2'],map.block['playerLeft1']);
                player.movingFrame.xCh=-1;
                if(player.lastDir=='down')
                {
                    player.movingFrame.start.y=player.movingFrame.start.y+1;

                }
                if(player.lastDir!='left' && player.lastDir!='right')
                {
                    player.movingFrame.start.x=player.movingFrame.start.x+player.movingFrame.xCh;

                }
                player.lastDir='left';
                player.movingFrame.midLine=0;
                player.movingFrame.firstLine=50; 
                player.movingFrame.lastLine=0;    
                player.movingFrame.yCh=0;
            }
            if(dir== 'right')
            {
                player.dir='right';
                player.animation.start(map.block['playerRight0'],map.block['playerRight2'],map.block['playerRight1']);

                if(player.lastDir=='down')
                {
                    player.movingFrame.start.y=player.movingFrame.start.y+1;

                }
                player.lastDir='right';
                player.movingFrame.firstLine=0;
                player.movingFrame.midLine=-50;
                player.movingFrame.lastLine=-50;
                player.movingFrame.xCh=1;
                player.movingFrame.yCh=0;
            }
            player.movingFrame.exitCount=0;
            player.mapCoord.x=player.mapCoord.x+player.movingFrame.xCh;
            player.mapCoord.y=player.mapCoord.y+player.movingFrame.yCh; 
            player.isMoving=true;          
            player.movingFrame.interval=setInterval(function (){

                if(player.movingFrame.exitCount>=map.blockSize){
                    player.isMoving=false;
                    clearInterval(player.movingFrame.interval);

                }
                player.movingFrame.firstLine=player.movingFrame.firstLine+player.movingFrame.yCh+player.movingFrame.xCh;
                player.movingFrame.lastLine=player.movingFrame.lastLine+player.movingFrame.yCh+player.movingFrame.xCh; 
                player.movingFrame.midLine=player.movingFrame.midLine+player.movingFrame.yCh+player.movingFrame.xCh;     
                player.movingFrame.exitCount+=1;
            },player.speed);

        },

        drawMovingFrame:function()
        { 
            map.clear();
            screen.drawImage(map.block['floorBig'], 0, 0);
            var curPos=new coord(0,0);
            var canLimit=new coord(601,551);
            var mapCoord=new coord(player.movingFrame.start.x,player.movingFrame.start.y);
           if(player.movingFrame.xCh!=0) //levo ali desno
            {

                for(curPos.y=0;curPos.y<canLimit.y;curPos.y=curPos.y+map.blockSize)//leva vrsta
                {
                     if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy03')
                    {
                
                        screen.drawImage( enemy03.list[enemy03.findByCoord(mapCoord.x,mapCoord.y)].img,player.movingFrame.firstLine,
                            0,map.blockSize, map.blockSize, 0, curPos.y, map.blockSize, map.blockSize);


                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy02')
                    {
                
                        screen.drawImage( enemy02.list[enemy02.findByCoord(mapCoord.x,mapCoord.y)].img,player.movingFrame.firstLine,
                            0,map.blockSize, map.blockSize, 0, curPos.y, map.blockSize, map.blockSize);


                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy01')
                    {
                        screen.drawImage( enemy01.list[enemy01.findByCoord(mapCoord.x,mapCoord.y)].img,player.movingFrame.firstLine,
                            0,map.blockSize, map.blockSize, 0, curPos.y, map.blockSize, map.blockSize);


                    }else
                    {
                        screen.drawImage(map.block[map.getBlock50(mapCoord.x,mapCoord.y)],player.movingFrame.firstLine,
                            0, map.blockSize, map.blockSize, 0, curPos.y, map.blockSize, map.blockSize); 
                    }
                    mapCoord.y=mapCoord.y+1;

                }
                mapCoord.y=player.movingFrame.start.y;
                mapCoord.x=mapCoord.x+1;
                for(curPos.x=0;curPos.x<canLimit.x-map.blockSize;curPos.x=curPos.x+map.blockSize)//ostali bloki vmes
                {
                    mapCoord.y=player.movingFrame.start.y;
                    for(curPos.y=0;curPos.y<canLimit.y;curPos.y=curPos.y+map.blockSize)//ostali bloki vmes
                    {
                    
                     
                        if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy03')
                    {
                        screen.drawImage( enemy03.list[enemy03.findByCoord(mapCoord.x,mapCoord.y)].img,0,
                            0,map.blockSize, map.blockSize, curPos.x+player.movingFrame.midLine*-1, curPos.y, map.blockSize, map.blockSize);


                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy02')
                    {
                        screen.drawImage( enemy02.list[enemy02.findByCoord(mapCoord.x,mapCoord.y)].img,0,
                            0,map.blockSize, map.blockSize, curPos.x+player.movingFrame.midLine*-1, curPos.y, map.blockSize, map.blockSize);


                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy01')
                        {
                            screen.drawImage( enemy01.list[enemy01.findByCoord(mapCoord.x,mapCoord.y)].img,0,
                                0,map.blockSize, map.blockSize, curPos.x+player.movingFrame.midLine*-1, curPos.y, map.blockSize, map.blockSize);
                        }else{
                            screen.drawImage(map.block[map.getBlock50(mapCoord.x,mapCoord.y)], 0,
                                0,map.blockSize, map.blockSize, curPos.x+player.movingFrame.midLine*-1, curPos.y, map.blockSize, map.blockSize);
                        }
                        mapCoord.y=mapCoord.y+1;
                    }
                    mapCoord.x=mapCoord.x+1;

                }
                mapCoord.y=player.movingFrame.start.y;
                for(curPos.y=0;curPos.y<canLimit.y;curPos.y=curPos.y+map.blockSize)//desna vrsta
                {
                     if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy03')
                    {
                        screen.drawImage( enemy03.list[enemy03.findByCoord(mapCoord.x,mapCoord.y)].img,player.movingFrame.lastLine,
                            0,map.blockSize, map.blockSize, 600, curPos.y, map.blockSize, map.blockSize);


                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy02')
                    {
                        screen.drawImage( enemy02.list[enemy02.findByCoord(mapCoord.x,mapCoord.y)].img,player.movingFrame.lastLine,
                            0,map.blockSize, map.blockSize, 600, curPos.y, map.blockSize, map.blockSize);


                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy01')
                    {
                        screen.drawImage(enemy01.list[enemy01.findByCoord(mapCoord.x,mapCoord.y)].img,player.movingFrame.lastLine,
                            0,map.blockSize,map.blockSize,600,curPos.y,map.blockSize,map.blockSize); 


                    }else{
                        screen.drawImage(map.block[map.getBlock50(mapCoord.x,mapCoord.y)],player.movingFrame.lastLine,
                            0,map.blockSize,map.blockSize,600,curPos.y,map.blockSize,map.blockSize); 
                    }
                    mapCoord.y=mapCoord.y+1;
                }
            }
            if(player.movingFrame.yCh!=0)  //gor ali dol
            {

                for(curPos.x=0;curPos.x<canLimit.x;curPos.x=curPos.x+map.blockSize)//zgornja vrsta
                {
                     if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy03')
                    {
                        screen.drawImage( enemy03.list[enemy03.findByCoord(mapCoord.x,mapCoord.y)].img,0,
                            player.movingFrame.firstLine,map.blockSize, map.blockSize, curPos.x, 0, map.blockSize, map.blockSize);

                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy02')
                    {
                        screen.drawImage( enemy02.list[enemy02.findByCoord(mapCoord.x,mapCoord.y)].img,0,
                            player.movingFrame.firstLine,map.blockSize, map.blockSize, curPos.x, 0, map.blockSize, map.blockSize);

                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy01')
                    {
                        screen.drawImage(enemy01.list[enemy01.findByCoord(mapCoord.x,mapCoord.y)].img,0,
                            player.movingFrame.firstLine, map.blockSize, map.blockSize, curPos.x, 0, map.blockSize, map.blockSize); 
                    }else{
                        screen.drawImage(map.block[map.getBlock50(mapCoord.x,mapCoord.y)],0,
                            player.movingFrame.firstLine, map.blockSize, map.blockSize, curPos.x, 0, map.blockSize, map.blockSize); 
                    }
                    mapCoord.x=mapCoord.x+1;
                }
                mapCoord.y=mapCoord.y+1;
                mapCoord.x=player.movingFrame.start.x;
                for(curPos.y=0;curPos.y<canLimit.y-map.blockSize;curPos.y=curPos.y+map.blockSize)//ostali bloki vmes
                {
                    mapCoord.x=player.movingFrame.start.x;
                    for(curPos.x=0;curPos.x<canLimit.x;curPos.x=curPos.x+map.blockSize)//ostali bloki vmes
                    {
                     if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy03')
                    {
                        screen.drawImage( enemy03.list[enemy03.findByCoord(mapCoord.x,mapCoord.y)].img,0,0,
                                map.blockSize, map.blockSize, curPos.x, curPos.y+player.movingFrame.midLine*-1, map.blockSize, map.blockSize);


                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy02')
                    {
                        screen.drawImage( enemy02.list[enemy02.findByCoord(mapCoord.x,mapCoord.y)].img,0,0,
                                map.blockSize, map.blockSize, curPos.x, curPos.y+player.movingFrame.midLine*-1, map.blockSize, map.blockSize);


                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy01')
                        {
                            screen.drawImage(enemy01.list[enemy01.findByCoord(mapCoord.x,mapCoord.y)].img,0,0,
                                map.blockSize, map.blockSize, curPos.x, curPos.y+player.movingFrame.midLine*-1, map.blockSize, map.blockSize);
                        }else{

                            screen.drawImage(map.block[map.getBlock50(mapCoord.x,mapCoord.y)], 0,
                                0,map.blockSize, map.blockSize, curPos.x, curPos.y+player.movingFrame.midLine*-1, map.blockSize, map.blockSize);
                        }
                        mapCoord.x=mapCoord.x+1;

                    }
                    mapCoord.y=mapCoord.y+1;

                }
                mapCoord.x=player.movingFrame.start.x;
                for(curPos.x=0;curPos.x<canLimit.x;curPos.x=curPos.x+map.blockSize)//spodnja vrsta
                {
                     if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy03')
                    {
                        screen.drawImage( enemy03.list[enemy03.findByCoord(mapCoord.x,mapCoord.y)].img,0,
                            player.movingFrame.lastLine,map.blockSize, map.blockSize, curPos.x, 550, map.blockSize, map.blockSize);


                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy02')
                    {
                        screen.drawImage( enemy02.list[enemy02.findByCoord(mapCoord.x,mapCoord.y)].img,0,
                            player.movingFrame.lastLine,map.blockSize, map.blockSize, curPos.x, 550, map.blockSize, map.blockSize);


                    }else if(map.getBlock50(mapCoord.x,mapCoord.y)=='enemy01')
                    {
                        screen.drawImage(enemy01.list[enemy01.findByCoord(mapCoord.x,mapCoord.y)].img,0,
                            player.movingFrame.lastLine,map.blockSize,map.blockSize,curPos.x,550,map.blockSize,map.blockSize);
                    }else
                    {
                        screen.drawImage(map.block[map.getBlock50(mapCoord.x,mapCoord.y)],0,
                            player.movingFrame.lastLine,map.blockSize,map.blockSize,curPos.x,550,map.blockSize,map.blockSize); 
                    }
                    mapCoord.x=mapCoord.x+1;
                }
            } 
            player.draw();
        },

        canvasCoord:function()  //dejanski koordinati v canvasu, v funkciji se izracunajo iz player.mapCoord in map.blockSize
        {
            player.canvasCoord=new coord((this.mapCoord.x-1)*map.blockSize, (this.mapCoord.y-1)* map.blockSize);
        },

        draw:function()
        {
            screen.drawImage(player.img, player.canvasCoord.x, player.canvasCoord.y);
        },

        drawHp:function()
        {
            screen.fillStyle="red";
            screen.fillRect(215, 607,player.hp/100*365, 10);          
            screen.drawImage(map.block['hp'], 200, 603);
       },

        isDead:function()
        {

            if(player.hp<=0)
            {
                return true;
            }else
            {
                return false;

            }
        },

        isHit:function()
        {   
            var lastDir=new coord(player.mapCoord.x,player.mapCoord.y);
            if(player.isMoving==true)
            {
                switch(player.lastDir)
                {
                    case 'up':
                        lastDir.y=lastDir.y+1;
                        break;
                    case 'down':
                        lastDir.y=lastDir.y-1;
                        break;
                    case 'left':
                        lastDir.x=lastDir.x+1;
                        break;
                    case 'right':
                        lastDir.x=lastDir.x-1;
                        break;
                }
            }         
             if(map.level[lastDir.y][lastDir.x]==12)
            {
                player.hp=player.hp-enemy02.dmg;
            }
            if(map.level[lastDir.y][lastDir.x]==11)
            {
                player.hp=player.hp-enemy01.dmg;
           }
        },

        getCloseEnemy:function()
        {
            var dist=new coord(0,0);
            var pos=new coord(0,0);
            for(var i=0;i<enemy01.list.length;i=i+1)
            {
                if(i==0)
                {
                    dist.x=Math.abs(enemy01.list[i].canvasCoord.x-player.canvasCoord.x);
                    dist.y=Math.abs(enemy01.list[i].canvasCoord.y-player.canvasCoord.y);
                    pos.x=enemy01.list[i].canvasCoord.x;
                    pos.y=enemy01.list[i].canvasCoord.y;

                }
                if(Math.abs(enemy01.list[i].canvasCoord.x-player.canvasCoord.x)<dist.x && Math.abs(enemy01.list[i].canvasCoord.y-player.canvasCoord.y)<dist.y)
                {
                    dist.x=Math.abs(enemy01.list[i].canvasCoord.x-player.canvasCoord.x);
                    dist.y=Math.abs(enemy01.list[i].canvasCoord.y-player.canvasCoord.y);
                    pos.x=enemy01.list[i].canvasCoord.x;
                    pos.y=enemy01.list[i].canvasCoord.y;
                }
            }
            return pos;
        },

        canMove:function(dir) //funkcija vrne true ce igralec lahko premakne v zeljeno smer(ce ni ovir), false ce se ne more
        {
            var next2Block=new coord(0,0);
            var nextBlock=new coord(0,0); //tu so shranjeni koordinati naslednjega bloka, ki se bo preverjal
            switch(dir)
            {
                case 'up':
                    nextBlock.x=player.mapCoord.x;
                    nextBlock.y=player.mapCoord.y-1;
                    next2Block.x=player.mapCoord.x;
                    next2Block.y=player.mapCoord.y-2;
                    break;

                case 'down':
                    nextBlock.x=player.mapCoord.x;
                    nextBlock.y=player.mapCoord.y+1;
                    next2Block.x=player.mapCoord.x;
                    next2Block.y=player.mapCoord.y+2;

                    break;

                case 'left':
                    nextBlock.x=player.mapCoord.x-1;
                    nextBlock.y=player.mapCoord.y;
                    next2Block.x=player.mapCoord.x-2;
                    next2Block.y=player.mapCoord.y;

                    break;

                case 'right':
                    nextBlock.x=player.mapCoord.x+1;
                    nextBlock.y=player.mapCoord.y;
                    next2Block.x=player.mapCoord.x+2;
                    next2Block.y=player.mapCoord.y;

                    break;
            }

            //2 - wall  6 - keylock_2  8 - keylock_1
            if(map.level[nextBlock.y][nextBlock.x]==3 && map.level[next2Block.y][next2Block.x] !=0)
            {
                return false;
            }
           if (map.level[nextBlock.y][nextBlock.x] != 2 && map.level[nextBlock.y][nextBlock.x] != 8 
                && map.level[nextBlock.y][nextBlock.x] != 6 && map.level[nextBlock.y][nextBlock.x] != 13)
                //ce naslednji blok ni zid, ali kljucavnica vrne true
            {
                return true;   
            }else if ((map.level[nextBlock.y][nextBlock.x] == 8 && map.keys.key_1.taken == true) ||
                (map.level[nextBlock.y][nextBlock.x]==6 && map.keys.key_2.taken == true))
                //ce naslednje blok je klucavnica in ima igralec ustrezen kljuc vrne true 
            {
                return true;

            }
            return false;
        }
    };

    player.onload=player.canvasCoord(); // funkcija ki izracuna player.canvasCoord se izvede ko se objekt player nalozi
}

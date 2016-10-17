function mapInit()
{
    map={
        blockSize:25, //velikost bloka v pikslih
        block:[],
        level:[],
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
                map.keys.key_2.num=0;
            }
        },
        drawPanel:function()
        {
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
               map.drawPanel();
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

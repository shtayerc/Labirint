function mapInit()
{
    map={
        blockSize:25, //velikost bloka v pikslih
        block:[],
        level:[],
        draw:function()
        {
            var curPos=new coord(0,0); //current position
            var mapa = new coord(1,1); //zacetna pozicija v dvodimenzionalnem polju 
            var limit = new coord(33,25); // meja polja po sirini, po visini


            for(; mapa.x <= limit.x && mapa.y < limit.y; )
            {
                if (map.level[mapa.y][mapa.x] == 2)
                {
                    screen.drawImage(map.block['wall'], curPos.x, curPos.y);
                }
                if (map.level[mapa.y][mapa.x] == 5)
                {
                    screen.drawImage(map.block['key_1'], curPos.x, curPos.y);
                }
                if (map.level[mapa.y][mapa.x] == 7)
                {
                    screen.drawImage(map.block['key_2'], curPos.x, curPos.y);
                }
                if (map.level[mapa.y][mapa.x] == 8)
                {
                    screen.drawImage(map.block['keylock_1'], curPos.x, curPos.y);
                }
                if (map.level[mapa.y][mapa.x] == 6)
                {
                    screen.drawImage(map.block['keylock_2'], curPos.x, curPos.y);
                }
                if (map.level[mapa.y][mapa.x] == 10)
                {
                    screen.drawImage(map.block['end'], curPos.x, curPos.y);
                }
                if (map.level[mapa.y][mapa.x] == 1)
                {

                    player.canvasCoord.x = (mapa.x - 1) * map.blockSize;
                    player.canvasCoord.y = (mapa.y - 1) * map.blockSize;
                    player.mapCoord.x = mapa.x;
                    player.mapCoord.y = mapa.y;
                    player.draw();
                }
                mapa.x = mapa.x + 1;
                curPos.x = curPos.x + map.blockSize;
                if (mapa.x == limit.x)
                {
                    mapa.y = mapa.y + 1;
                    mapa.x = 1;
                    curPos.y = curPos.y + map.blockSize;
                    curPos.x = 0;
                }
            }


        },
        keys:{  //v tem objektu so podatki o pobranih klucih
            key_1:{
                taken:false,
                num:0},
                key_2:{
                    taken:false,
                    num:0

                },
                reset:function()
                {
                    map.keys.key_1.num=0;
                    map.keys.key_2.num=0;
                }
        },
        loadImg:function(name,url) //funkcija sprejme dva parametra: name - index asociativnega polja(map.block) , url - lokacija slike
        {
            map.block[name]=new Image();
            map.block[name].crossOrigin = 'Anonymous'; //zaradi metode screen.getImageData ki mece security error
            map.block[name].onload = function () 
            {
                map.draw();
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

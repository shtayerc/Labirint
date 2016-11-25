function playerInit()
{
    player={
        color:"#0000FF",
        mapCoord:new coord(8,2), //koordinati v polju labirinta
        canvasCoord:function()  //dejanski koordinati v canvasu, v funkciji se izracunajo iz player.mapCoord in map.blockSize
        {
            player.canvasCoord=new coord((this.mapCoord.x-1)*map.blockSize, (this.mapCoord.y-1)* map.blockSize);
        },
        draw:function()
        {
            screen.drawImage(map.block['player'], player.canvasCoord.x, player.canvasCoord.y);

        },
        move:function(dir) //funkcija za premikanje igralca
        {
            player.clear();
             map.level[player.mapCoord.y][player.mapCoord.x]=0;
            switch(dir)
            {
                case 'up':
                    player.mapCoord.y = player.mapCoord.y - 1; //koordinati igralca v polju map.level
                    player.canvasCoord.y = player.canvasCoord.y - map.blockSize; // kooordinate igralca v px na canvasu
                    break;

                case 'down':
                    player.mapCoord.y = player.mapCoord.y + 1;
                    player.canvasCoord.y = player.canvasCoord.y + map.blockSize;
                    break;

                case 'left':
                    player.mapCoord.x = player.mapCoord.x - 1;
                    player.canvasCoord.x = player.canvasCoord.x - map.blockSize;
                    break;

                case 'right':
                    player.mapCoord.x = player.mapCoord.x + 1;
                    player.canvasCoord.x = player.canvasCoord.x + map.blockSize;
                    break;
            }
            map.level[player.mapCoord.y][player.mapCoord.x]=1;
            player.draw();
            
        },
        clear:function()
        {
            screen.clearRect(player.canvasCoord.x, player.canvasCoord.y, map.blockSize, map.blockSize); //brisanje igralca narisanega na starem polozaju
        },
        canMove:function(dir) //funkcija vrne true ce igralec lahko premakne v zeljeno smer(ce ni ovir), false ce se ne more
        {
            var nextBlock=new coord(0,0); //tu so shranjeni koordinati naslednjega bloka, ki se bo preverjal
            switch(dir)
            {
                case 'up':
                    nextBlock.x=player.mapCoord.x;
                    nextBlock.y=player.mapCoord.y-1;
                    break;

                case 'down':
                    nextBlock.x=player.mapCoord.x;
                    nextBlock.y=player.mapCoord.y+1;
                    break;

                case 'left':
                    nextBlock.x=player.mapCoord.x-1;
                    nextBlock.y=player.mapCoord.y;
                    break;

                case 'right':
                    nextBlock.x=player.mapCoord.x+1;
                    nextBlock.y=player.mapCoord.y;
                    break;
            }
            //2 - wall  6 - keylock_2  8 - keylock_1
            if (map.level[nextBlock.y][nextBlock.x] != 2 && map.level[nextBlock.y][nextBlock.x] != 8 && map.level[nextBlock.y][nextBlock.x] != 6)
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

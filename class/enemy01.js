function enemyInit(){
    
	enemy01={
		startCoord:new coord(8,1),
		endCoord:new coord(12,1),
		mapCoord:new coord(8,1),     //v new so koordinati dimenzionalnega polja
		canvasCoord:new coord(200,0),   //na kerih pikslih je v canvasi, dejanska pozicija
		color:"#ff0000",
		draw:function(){
            screen.beginPath();
            screen.rect(enemy01.canvasCoord.x, enemy01.canvasCoord.y, map.blockSize, map.blockSize);
            screen.fillStyle = enemy01.color ;
            screen.fill();
            screen.closePath();

        },
		
		move:function(dir) //funkcija za premikanje igralca
        {
            enemy01.clear();
            switch(dir)
            {
                case 'up':
                    enemy01.mapCoord.y = enemy01.mapCoord.y - 1; //koordinati igralca v polju map.level
                    enemy01.canvasCoord.y = enemy01.canvasCoord.y - map.blockSize; // kooordinate igralca v px na canvasu
                    break;

                case 'down':
                    enemy01.mapCoord.y = enemy01.mapCoord.y + 1;
                    enemy01.canvasCoord.y = enemy01.canvasCoord.y + map.blockSize;
                    break;

                case 'left':
                    enemy01.mapCoord.x = enemy01.mapCoord.x - 1;
                    enemy01.canvasCoord.x = enemy01.canvasCoord.x - map.blockSize;
                    break;

                case 'right':
                    enemy01.mapCoord.x = enemy01.mapCoord.x + 1;
                    enemy01.canvasCoord.x = enemy01.canvasCoord.x + map.blockSize;
                    break;
            }
			enemy01.draw();
		},
		
		clear:function()
        {
            screen.clearRect(enemy01.canvasCoord.x, enemy01.canvasCoord.y, map.blockSize, map.blockSize); //brisanje igralca narisanega na starem polozaju
        },
		
		canMove:function(dir) //funkcija vrne true ce igralec lahko premakne v zeljeno smer(ce ni ovir), false ce se ne more
        {
            var nextBlock=new coord(0,0); //tu so shranjeni koordinati naslednjega bloka, ki se bo preverjal
            switch(dir)
            {
                case 'up':
                    nextBlock.x=enemy01.mapCoord.x;
                    nextBlock.y=enemy01.mapCoord.y-1;
                    break;

                case 'down':
                    nextBlock.x=enemy01.mapCoord.x;
                    nextBlock.y=enemy01.mapCoord.y+1;
                    break;

                case 'left':
                    nextBlock.x=enemy01.mapCoord.x-1;
                    nextBlock.y=enemy01.mapCoord.y;
                    break;

                case 'right':
                    nextBlock.x=enemy01.mapCoord.x+1;
                    nextBlock.y=enemy01.mapCoord.y;
                    break;
            }
            //2 - wall  6 - keylock_2  8 - keylock_1
            if (map.level[nextBlock.y][nextBlock.x] ==0)
            //ce naslednji blok ni zid, ali kljucavnica vrne true
            {
                return true;   
            }
			console.log(map.level[nextBlock.y][nextBlock.x])
            return false;
        },
		patrol:{
			limit:new coord(12,1),
			check: function(){
			var dir="";
			if(enemy01.mapCoord.x==enemy01.patrol.limit.x)
			//if (enemy01.mapCoord==enemy01.startCoord)
			{enemy01.patrol.limit=enemy01.endCoord;
			}
			if(enemy01.mapCoord.x==enemy01.patrol.limit.x) 
			//if (enemy01.mapCoord===enemy01.endCoord)
			{enemy01.patrol.limit=enemy01.startCoord;
			}
			if (enemy01.mapCoord.x<enemy01.patrol.limit.x){
			dir="right";
			}
			if (enemy01.mapCoord.x>enemy01.patrol.limit.x){
			dir="left";
			}
			
			enemy01.move(dir);
		}
		},
		
	};
}
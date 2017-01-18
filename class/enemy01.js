function enemyInit(){

    enemy01={
        list:[],
        startCoord:new coord(8,1),
        distance:4,
        color:"#ff0000",
        dmg:100,
        speed:200, //ms
        add:function(startCoordX,startCoordY){
            enemy01.list[enemy01.list.length]= new enemy_01(startCoordX,startCoordY);
        },
        findByCoord(x,y) //vrne index polja enemy01.list za podane koordinate
        {
            for(var i=0;i<enemy01.list.length;i=i+1)
            {
                if(enemy01.list[i].mapCoord.x==x && enemy01.list[i].mapCoord.y==y)
                {
                    return i;
                }

            }
            console.log('enemy not found');

        },
        resetAll:function()
        {
            for(var i=0;i<enemy01.list.length;i=i+1)
            {
                clearInterval(enemy01.list[i].movingInterval);

            }
            enemy01.list=[];

        },
       patrolAll:function() //funkcija gre cez polje enemy01.list in klice funkcijo enemy01.list[x].patrol() za vsako polje posebaj
        {

            for(var i=0;i<enemy01.list.length;i=i+1)
            {
                enemy01.list[i].movingInterval=setInterval(function (i){enemy01.list[i].patrol();

                },enemy01.speed,i);
            }

        }
    };
    function enemy_01(startCoordX,startCoordY) //struktura enemy01 objekta
    {
        this.startCoord=new coord(startCoordX,startCoordY);
        this.endCoord=new coord(startCoordX+enemy01.distance,startCoordY);
        this.mapCoord=new coord(startCoordX,startCoordY);     //v new so koordinati dimenzionalnega polja
        this.canvasCoord=new coord((startCoordX-1)*map.blockSize,(startCoordY-1)*map.blockSize);   //na kerih pikslih je v canvasi, dejanska pozicija
        this.img=map.block['enemy01R'];

        this.movingInterval=0;
        this.patrol.limit=new coord(startCoordX,startCoordY);
        this.dir='left';
    }
   /* enemy_01.prototype.draw=function()
    {
        //  screen.drawImage(map.block['enemy01'], this.canvasCoord.x, this.canvasCoord.y);
    }*/
   /* enemy_01.prototype.clear=function()
    {
        screen.clearRect(this.canvasCoord.x, this.canvasCoord.y, map.blockSize, map.blockSize); //brisanje igralca narisanega na starem polozaju
    }*/

    enemy_01.prototype.move=function(dir) //premakne izbrani objekt tipa enemy01 v smer podano v parametru(string npr.: 'right')
    {
        //     game.clear();
        map.level[this.mapCoord.y][this.mapCoord.x]=0;
        switch(dir)
        {
            case 'up':

                this.mapCoord.y = this.mapCoord.y - 1; //koordinati igralca v polju map.level
                this.canvasCoord.y = this.canvasCoord.y - map.blockSize; // kooordinate igralca v px na canvasu
                break;

            case 'down':
                this.mapCoord.y = this.mapCoord.y + 1;
                this.canvasCoord.y = this.canvasCoord.y + map.blockSize;
                break;

            case 'left':
                this.mapCoord.x = this.mapCoord.x - 1;
                this.canvasCoord.x = this.canvasCoord.x - map.blockSize;
                break;

            case 'right':
                this.mapCoord.x = this.mapCoord.x + 1;
                this.canvasCoord.x = this.canvasCoord.x + map.blockSize;
                break;
        }

        map.level[this.mapCoord.y][this.mapCoord.x]=11;

        

    }
    enemy_01.prototype.canMove=function(dir) //vrne true, ce je naslednji blok v podani smeri prazen(ce je 0), drugace vrne false. Parameter je string(npr.: 'right')
    {
        var nextBlock=new coord(0,0); //tu so shranjeni koordinati naslednjega bloka, ki se bo preverjal
        switch(dir)
        {
            case 'up':
                nextBlock.x=this.mapCoord.x;
                nextBlock.y=this.mapCoord.y-1;
                break;

            case 'down':
                nextBlock.x=this.mapCoord.x;
                nextBlock.y=this.mapCoord.y+1;
                break;

            case 'left':
                nextBlock.x=this.mapCoord.x-1;
                nextBlock.y=this.mapCoord.y;
                break;

            case 'right':
                nextBlock.x=this.mapCoord.x+1;
                nextBlock.y=this.mapCoord.y;
                break;
        }
        //2 - wall  6 - keylock_2  8 - keylock_1
        if (map.level[nextBlock.y][nextBlock.x] ==0 || map.level[nextBlock.y][nextBlock.x] ==1 )
            //ce je naslednji blok prazen ali je na njem igralec
        {
            return true;   
        }
        return false;
    }
    enemy_01.prototype.patrol=function() //v tej funkciji je algoritem premikanje enemyja
    {
       if(this.canMove(this.dir))
        {

            this.move(this.dir);
        }else
        {
            this.dir=oppositeDir(this.dir);

            if(this.canMove(this.dir))
            {
                this.move(this.dir);
            }
        }
        if(this.dir=='right')
        {
            this.img=map.block['enemy01R'];

        }
        if(this.dir=='left')
        {

            this.img=map.block['enemy01L'];

        }
    }

}

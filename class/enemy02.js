function enemy02Init(){

    enemy02={
        list:[],
        dmg:99,
        speed:200, //ms
        add:function(startCoordX,startCoordY){
            enemy02.list[enemy02.list.length]= new enemy_02(startCoordX,startCoordY);
        },
        findByCoord(x,y) //vrne index polja enemy02.list za podane koordinate
        {
            for(var i=0;i<enemy02.list.length;i=i+1)
            {
                if(enemy02.list[i].mapCoord.x==x && enemy02.list[i].mapCoord.y==y)
                {
                    return i;
                }
            }
            console.log('enemy not found');

        },
        resetAll:function()
        {
            for(var i=0;i<enemy02.list.length;i=i+1)
            {
                clearInterval(enemy02.list[i].movingInterval);
            }
            enemy02.list=[];

        },
       patrolAll:function() //funkcija gre cez polje enemy02.list in klice funkcijo enemy02.list[x].patrol() za vsako polje posebaj
        {

            for(var i=0;i<enemy02.list.length;i=i+1)
            {
                enemy02.list[i].movingInterval=setInterval(function (i){enemy02.list[i].patrol();

                },enemy02.speed,i);
            }

        }
    };
    function enemy_02(startCoordX,startCoordY) //struktura enemy02 objekta
    {
       this.mapCoord=new coord(startCoordX,startCoordY);     //v new so koordinati dimenzionalnega polja
       this.img=map.block['enemy02R'];
        this.movingInterval=0;
        this.dir='right';
    }
     enemy_02.prototype.move=function(dir) //premakne izbrani objekt tipa enemy02 v smer podano v parametru(string npr.: 'right')
    {
        map.level[this.mapCoord.y][this.mapCoord.x]=0;
        switch(dir)
        {
            case 'up':
                this.mapCoord.y = this.mapCoord.y - 1; //koordinati igralca v polju map.level
                break;

            case 'down':
                this.mapCoord.y = this.mapCoord.y + 1;
               break;

            case 'left':
                this.mapCoord.x = this.mapCoord.x - 1;
                break;

            case 'right':
                this.mapCoord.x = this.mapCoord.x + 1;
                break;
        }

        map.level[this.mapCoord.y][this.mapCoord.x]=12;

        

    }
    enemy_02.prototype.canMove=function(dir) //vrne true, ce je naslednji blok v podani smeri prazen(ce je 0), drugace vrne false. Parameter je string(npr.: 'right')
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
    enemy_02.prototype.patrol=function() //v tej funkciji je algoritem premikanje enemyja
    {
     if(this.mapCoord.x == this.endCoord.x )
        {
            this.dir='left';
        }
        if(this.mapCoord.x==this.startCoord.x) 
        {

            this.dir='right';
        }

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
            this.img=map.block['enemy02R'];

        }
        if(this.dir=='left')
        {

            this.img=map.block['enemy02L'];

        }
    }
   
    }
}

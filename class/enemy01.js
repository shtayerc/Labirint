function enemyInit(){

    enemy01={
        list:[],
        dmg:20,
        mapNum:11,
        speed:600, //ms, more bit deljivo z game.tick

        add:function(startCoordX,startCoordY)
        {
            enemy01.list[enemy01.list.length]= new enemy_01(startCoordX,startCoordY);
        },

        findByCoord(x,y) //vrne index polja enemy01.list za podane koordinate
        {
            var len=enemy01.list.length;
            for(var i=0;i<len;i=i+1)
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
            enemy01.list=[];
        },

        patrolAll:function() //funkcija gre cez polje enemy01.list in klice funkcijo enemy01.list[x].patrol() za vsako polje posebaj
        {
            if(game.tickCount%enemy01.speed==0)
            {
                var len=enemy01.list.length;
                for(var i=0;i<len;i=i+1)
                {
                    enemy01.list[i].patrol();
                }
            }
        }
    };

    function enemy_01(startCoordX,startCoordY) //struktura enemy01 objekta
    {
        this.startCoord=new coord(startCoordX,startCoordY);
        this.mapCoord=new coord(startCoordX,startCoordY);     //v new so koordinati dimenzionalnega polja
        this.img=map.block['enemy01R'];
        this.hp=100;
        this.dir='right';
    }

    enemy_01.prototype.move=function(dir) //premakne izbrani objekt tipa enemy01 v smer podano v parametru(string npr.: 'right')
    {

        if( map.level[this.mapCoord.y][this.mapCoord.x]!=3) //fixed disapearing builder bug
        {
            map.level[this.mapCoord.y][this.mapCoord.x]=0;
        }

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
        map.level[this.mapCoord.y][this.mapCoord.x]=enemy01.mapNum;
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
        if(this.hp==0)
        {
            map.level[this.mapCoord.y][this.mapCoord.x]=0;
            enemy01.list.splice(enemy01.findByCoord(this.mapCoord.x,this.mapCoord.y),1);
        }else
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

}

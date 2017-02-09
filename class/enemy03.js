function enemy03Init(){


    enemy03={
        list:[],
        dmg:99,
        mapNum:13,
        animationSpeed:200,
        speed:300, //ms
        add:function(startCoordX,startCoordY)
        {
            enemy03.list[enemy03.list.length]= new enemy_03(startCoordX,startCoordY);
        },
        findByCoord(x,y) //vrne index polja enemy02.list za podane koordinate
        {
            for(var i=0;i<enemy03.list.length;i=i+1)
            {
                if(enemy03.list[i].mapCoord.x==x && enemy03.list[i].mapCoord.y==y)
                {
                    return i;
                }
            }
            console.log('enemy not found');
        },

        animation:function()
        {
            if(game.tickCount%enemy03.animationSpeed==0)
            {
                var vmes;
                for(var i=0;i<enemy03.list.length;i=i+1)
                {
                    switch(enemy03.list[i].dir)
                    {
                        case 'up':
                            vmes='B';
                            break;
                        case 'down':
                            vmes='F';
                            break;
                        case 'left':
                            vmes='L';
                            break;
                        case 'right':
                            vmes='R';
                            break;

                    }
                    if(enemy03.list[i].isMoving==true)
                    {
                        switch(enemy03.list[i].num)
                        {
                            case 0:
                                enemy03.list[i].img=map.block['enemy03'+vmes+'0'];
                                break;
                            case 1:
                                enemy03.list[i].img=map.block['enemy03'+vmes+'1'];
                                break;

                            case 2:
                                enemy03.list[i].img=map.block['enemy03'+vmes+'2'];
                                break;

                        }
                    }else
                    {
                        enemy03.list[i].img=map.block['enemy03'+vmes+'0'];

                    }
                    enemy03.list[i].num+=1;
                    if(enemy03.list[i].num==3)
                    {

                        enemy03.list[i].num=0;
                    }
                }
            }


        },
        resetAll:function()
        {
            /*   for(var i=0;i<enemy03.list.length;i=i+1)
            {
                clearInterval(enemy03.list[i].movingInterval);
            }*/
            enemy03.list=[];

        },
        patrolAll:function() //funkcija gre cez polje enemy02.list in klice funkcijo enemy02.list[x].patrol() za vsako polje posebaj
        {
            if(game.tickCount%enemy03.speed==0)
            {
                for(var i=0;i<enemy03.list.length;i=i+1)
                {
                    enemy03.list[i].patrol();

                }
            }

        }
    };
    function enemy_03(startCoordX,startCoordY) //struktura enemy02 objekta
    {
        this.mapCoord=new coord(startCoordX,startCoordY);     //v new so koordinati dimenzionalnega polja
        this.img=map.block['enemy03F1'];
        this.hp=100;
        this.isMoving=false;
        this.dir='right';
        this.num=0;
    }

    enemy_03.prototype.move=function(dir) //premakne izbrani objekt tipa enemy02 v smer podano v parametru(string npr.: 'right')
    {
        map.level[this.mapCoord.y][this.mapCoord.x]=0;
        switch(dir)
        {
            case 'up':
                this.dir='up';
                this.mapCoord.y = this.mapCoord.y - 1; //koordinati igralca v polju map.level
                break;

            case 'down':
                this.dir='down';
                this.mapCoord.y = this.mapCoord.y + 1;
                break;

            case 'left':
                this.dir='left';
                this.mapCoord.x = this.mapCoord.x - 1;
                break;

            case 'right':
                this.dir='right';
                this.mapCoord.x = this.mapCoord.x + 1;
                break;
        }
        map.level[this.mapCoord.y][this.mapCoord.x]=enemy03.mapNum;
    }

    enemy_03.prototype.canMove=function(dir) //vrne true, ce je naslednji blok v podani smeri prazen(ce je 0), drugace vrne false. Parameter je string(npr.: 'right')
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
        if (map.level[nextBlock.y][nextBlock.x] ==0 && (nextBlock.y != player.mapCoord.y || player.mapCoord.x != nextBlock.x ))
            //ce je naslednji blok prazen ali je na njem igralec
        {
            return true;   
        }
        return false;
    }
    enemy_03.prototype.patrol=function() //v tej funkciji je algoritem premikanje enemyja
    {

        var dir='';
        this.isMoving=false;
        if(player.mapCoord.x < this.mapCoord.x)
        {
            if(this.canMove('left'))
            {
                this.isMoving=true;
                this.move('left');
            }
        }else if(player.mapCoord.x > this.mapCoord.x)
        {
            if(this.canMove('right'))
            {
                this.isMoving=true;
                this.move('right');
            }
        }
        if(player.mapCoord.y < this.mapCoord.y)
        {
            if(this.canMove('up'))
            {
                this.isMoving=true;
                this.move('up');
            }
        }else if(player.mapCoord.y > this.mapCoord.y)
        {
            if(this.canMove('down'))
            {
                this.isMoving=true;
                this.move('down');
            }
        }
        var nextBlock=new coord(0,0); //tu so shranjeni koordinati naslednjega bloka, ki se bo preverjal
        switch(this.dir)
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
        if(nextBlock.y == player.mapCoord.y && player.mapCoord.x == nextBlock.x)
        {
            console.log('attack');
        }
    }


}

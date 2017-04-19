function soundInit()
{
    sound={
        mute:false,
        list:[],
        drawButton:function()
        {
            screen.clearRect(760,0,50,50);
            if(sound.mute==false)
            {
            screen.drawImage(map.block['sound'],760,0);
            }else
            {
             screen.drawImage(map.block['mute'],760,0);

            }
            },
        checkButton:function()
        {
            
            var xDiff=0;
            var yDiff=5;
            if((mouse.canvasCoord.x >= 770+xDiff && mouse.canvasCoord.x <= 760+30+xDiff) && 
                (mouse.canvasCoord.y >= 0+yDiff && mouse.canvasCoord.y <= 0+30+yDiff))
            {

                if(mouse.click.left==true)
                {

                    mouse.click.left=false;
                    if(sound.mute==false)
                    {
                    sound.mute=true;
                        sound.set(0);
                    
                    }else
                    {
                    sound.mute=false;
                        sound.set(1);
                    
                    }
                }
            }
        },
        add:function(name,path)
        {
            sound.list[name]=new Audio(path);
        },
        play:function(name)
        {
            if(sound.mute==false)
            {
                sound.list[name].play();
            }
        },
        set:function(num) //0 mute, 1 full volume
        {
            for(var key in sound.list)
            {   
                sound.list[key].volume=num;
            }
        },
        loadSounds:function()
        {
            //console.log('load');
            sound.add('key',path+'sounds/KeyPickup.wav');
            sound.add('lock',path+'sounds/LockUnlock.wav');
            sound.add('walk',path+'sounds/walk2.wav');
        }

    };


}

function soundInit()
{
    sound={
        list:[],
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
        
        
        }

    };


}

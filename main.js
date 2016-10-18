function main()
{
    createCanvas();
     levelsInit();

    keyInit();
    mapInit();
   
    //map.loadBlocks();   
    playerInit();
    gameInit();
       game.menu.main();
     map.level=level_00; 
  
    //  game.start();
}

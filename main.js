function main()
{
    createCanvas();
    keyInit();
    mapInit();
   //map.loadBlocks();   
    playerInit();
    gameInit();
    levelsInit();
  game.menu.main();
     map.level=level_00; 
  
    //  game.start();
}

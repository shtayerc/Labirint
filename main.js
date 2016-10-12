function main()
{
    createCanvas();
    keyInit();
    mapInit();
    map.loadBlocks();   
    playerInit();
    gameInit();
    levelsInit();
    map.level=level_00; 
    game.start();
}

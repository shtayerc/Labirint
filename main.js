function main()
{
    createCanvas();
    levelsInit();
    keyInit();
    mapInit();
    map.loadBlocks();   
    enemyInit();
    playerInit();
    gameInit();
    map.loading();   

}


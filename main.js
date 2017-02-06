function main()
{
    createCanvas();
    levelsInit();
    keyInit();
    mapInit();
    map.loadBlocks();   
    enemyInit();
    enemy02Init();
    enemy03Init();
    playerInit();
    gameInit();
    game.session.checkServer();
    map.loading();   

}


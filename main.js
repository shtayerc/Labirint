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
    soundInit();
    playerInit();
    gameInit();
    game.session.checkServer();
    map.loading();   

}


function main()
{
    createCanvas();
    levelsInit();
    keyInit();
    mapInit();
    map.loadBlocks();   
    enemyInit();
    enemy02Init();
    playerInit();
    gameInit();
    game.session.checkServer();
    map.loading();   

}


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
    game.session.checkServer();
    map.loading();   

}


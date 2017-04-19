function main()
{
    createCanvas();
    soundInit();
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
    game.checkBrowser();
    game.checkPopUp();
    sound.loadSounds();
    map.loading();


}


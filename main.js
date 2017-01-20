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
   // enemy01.add(9,2);
    map.loading();   

}


function main()
{
    createCanvas();
    levelsInit();
    keyInit();
    mapInit();
    map.loadBlocks();   
    playerInit();
    gameInit();
    map.loading();   
}

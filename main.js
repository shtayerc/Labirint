function main()
{
    createCanvas();
    keyInit();
    mapInit();
    map.loadBlocks();   
    playerInit();
    gameInit(); 
    map.level=[[0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0], [2, 5, 5, 5, 5, 5, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 5, 5, 5, 5, 5, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [2, 5, 5, 2, 2, 2, 6, 6, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2], [2, 5, 5, 2, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2], [2, 2, 5, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2], [2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2], [2, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2], [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 6, 0, 2, 0, 2, 0, 2, 0, 2], [2, 0, 2, 0, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2], [2, 0, 7, 2, 0, 2, 2, 0, 2, 2, 2, 2, 8, 8, 8, 8, 2, 0, 2, 0, 2, 0, 2, 6, 10, 2, 0, 2, 0, 2, 0, 2, 0, 2], [2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 8, 8, 8, 8, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 0, 2], [2, 0, 2, 0, 8, 2, 0, 0, 0, 2, 2, 0, 2, 8, 8, 8, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 5, 2, 0, 2, 0, 2, 0, 2], [2, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 8, 8, 8, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2], [2, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 2, 2, 8, 8, 8, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2], [2, 0, 2, 0, 0, 0, 2, 0, 2, 2, 0, 0, 2, 8, 8, 8, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2], [2, 0, 0, 2, 0, 2, 0, 0, 2, 0, 2, 2, 2, 8, 8, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2], [2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 7, 2, 8, 8, 8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2], [2, 0, 2, 0, 0, 0, 2, 0, 8, 0, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2], [2, 0, 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 2], [2, 0, 0, 0, 0, 8, 0, 0, 2, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 5, 0, 2], [2, 0, 0, 2, 8, 2, 8, 2, 2, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2], [2, 0, 2, 5, 5, 5, 5, 5, 2, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 2], [2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2], [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]];

    game.start();
}

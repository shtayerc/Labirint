function playerInit()
{
    player={
        color:"#0000FF",
        mapCoord:new coord(8,2), //koordinati v polju labirinta
        canvasCoord:function()  //dejanski koordinati v canvasu, v funkciji se izracunajo iz player.mapCoord in map.blockSize
        {
            player.canvasCoord=new coord((this.mapCoord.x-1)*map.blockSize, (this.mapCoord.y-1)* map.blockSize);
        },
        draw:function()
        {
            screen.beginPath();
            screen.rect(player.canvasCoord.x, player.canvasCoord.y, map.blockSize, map.blockSize);
            screen.fillStyle = player.color ;
            screen.fill();
            screen.closePath();

        }
    };
    player.onload=player.canvasCoord(); // funkcija ki izracuna player.canvasCoord se izvede ko se objekt player nalozi
}

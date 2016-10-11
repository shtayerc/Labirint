function gameInit()
{
    game={
        loop:true,
        tick:100,
        start:function()
        {
            screen.clearRect(player.canvasCoord.x, player.canvasCoord.y, map.blockSize, map.blockSize); //brisanje igralca narisanega na starem polozaju
            if (key.up == true)
            {
                if (map.level[player.mapCoord.y - 1][player.mapCoord.x] != 2 && map.level[player.mapCoord.y - 1][player.mapCoord.x] != 8 && 
                        map.level[player.mapCoord.y - 1][player.mapCoord.x] != 6)
                {
                    if (map.level[player.mapCoord.y - 1][player.mapCoord.x] == 14 && map.level[player.mapCoord.y - 2][player.mapCoord.x] == 0)
                    {
                        player.mapCoord.y = player.mapCoord.y - 1;
                        player.canvasCoord.y = player.canvasCoord.y - map.blockSize;
                    } else
                        if (map.level[player.mapCoord.y - 1][player.mapCoord.x] != 14)
                        {

                            player.mapCoord.y = player.mapCoord.y - 1;
                            player.canvasCoord.y = player.canvasCoord.y - map.blockSize;

                        }

                } else if ((map.level[player.mapCoord.y - 1][player.mapCoord.x] == 8 && map.keys.key_1.taken == true) || 
                        (map.level[player.mapCoord.y - 1][player.mapCoord.x] == 6 && map.keys.key_2.taken == true))
                {
                    player.mapCoord.y = player.mapCoord.y - 1;
                    player.canvasCoord.y = player.canvasCoord.y - map.blockSize;
                }
            }
            else if (key.down == true)
            {
                if (map.level[player.mapCoord.y + 1][player.mapCoord.x] != 2 && map.level[player.mapCoord.y + 1][player.mapCoord.x] != 8 && 
                        map.level[player.mapCoord.y + 1][player.mapCoord.x] != 6)
                {
                    if (map.level[player.mapCoord.y + 1][player.mapCoord.x] == 14 && map.level[player.mapCoord.y + 2][player.mapCoord.x] == 0)
                    {
                        player.mapCoord.y = player.mapCoord.y + 1;
                        player.canvasCoord.y = player.canvasCoord.y + map.blockSize;
                    } else if (map.level[player.mapCoord.y + 1][player.mapCoord.x] != 14)
                    {
                        player.mapCoord.y = player.mapCoord.y + 1;
                        player.canvasCoord.y = player.canvasCoord.y + map.blockSize;
                    }
                } else if ((map.level[player.mapCoord.y + 1][player.mapCoord.x] == 8 && map.keys.key_1.taken == true) || 
                        (map.level[player.mapCoord.y + 1][player.mapCoord.x] == 6 && map.keys.key_2.taken == true))
                {
                    player.mapCoord.y = player.mapCoord.y + 1;
                    player.canvasCoord.y = player.canvasCoord.y + map.blockSize;
                }
            }
            else if (key.left == true)
            {
                if (map.level[player.mapCoord.y][player.mapCoord.x - 1] != 2 && map.level[player.mapCoord.y][player.mapCoord.x - 1] != 8 && 
                        map.level[player.mapCoord.y][player.mapCoord.x - 1] != 6)
                {
                    if (map.level[player.mapCoord.y][player.mapCoord.x - 1] == 14 && map.level[player.mapCoord.y][player.mapCoord.x - 2] == 0)
                    {
                        player.mapCoord.x = player.mapCoord.x - 1;
                        player.canvasCoord.x = player.canvasCoord.x - map.blockSize;
                    } else if (map.level[player.mapCoord.y][player.mapCoord.x - 1] != 14)
                    {
                        player.mapCoord.x = player.mapCoord.x - 1;
                        player.canvasCoord.x = player.canvasCoord.x - map.blockSize;
                    } 
                } else if ((map.level[player.mapCoord.y][player.mapCoord.x - 1] == 8 && map.keys.key_1.taken == true) || 
                        (map.level[player.mapCoord.y][player.mapCoord.x - 1] == 6 && map.keys.key_2.taken == true))
                {
                    player.mapCoord.x = player.mapCoord.x - 1;
                    player.canvasCoord.x = player.canvasCoord.x - map.blockSize;
                }

            }
            else if (key.right == true)
            {
                if (map.level[player.mapCoord.y][player.mapCoord.x + 1] != 2 && map.level[player.mapCoord.y][player.mapCoord.x + 1] != 8 && 
                        map.level[player.mapCoord.y][player.mapCoord.x + 1] != 6)
                {
                    if (map.level[player.mapCoord.y][player.mapCoord.x + 1] == 14 && map.level[player.mapCoord.y][player.mapCoord.x + 2] == 0)
                    {

                        player.mapCoord.x = player.mapCoord.x + 1;
                        player.canvasCoord.x = player.canvasCoord.x + map.blockSize;
                    } else if (map.level[player.mapCoord.y][player.mapCoord.x + 1] != 14)
                    {
                        player.mapCoord.x = player.mapCoord.x + 1;
                        player.canvasCoord.x = player.canvasCoord.x + map.blockSize;
                    }

                } else if ((map.level[player.mapCoord.y][player.mapCoord.x + 1] == 8 && map.keys.key_1.taken == true) || 
                        (map.level[player.mapCoord.y][player.mapCoord.x + 1] == 6 && map.keys.key_2.taken == true))
                {
                    player.mapCoord.x = player.mapCoord.x + 1;
                    player.canvasCoord.x = player.canvasCoord.x + map.blockSize;
                }
            }
            if (map.level[player.mapCoord.y][player.mapCoord.x] == 5) //ce poberes key_1
            {
                map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                map.keys.key_1.num = map.keys.key_1.num + 1; 
                // update panel
                if (map.keys.key_1.num == 1)
                {
                    map.keys.key_1.taken = true;
                }
            }
            if (map.level[player.mapCoord.y][player.mapCoord.x] == 7) //ce poberes key_2
            {
                map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                map.keys.key_2.num = map.keys.key_2.num + 1;
                // update panel
                if (map.keys.key_2.num == 1)
                {
                    map.keys.key_2.taken = true;
                }
            }
            if (map.level[player.mapCoord.y][player.mapCoord.x] == 8) //ce gres skozi keylock_1
            {
                map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                map.keys.key_1.num = map.keys.key_1.num - 1;
                // update panel
                if (map.keys.key_1.num == 0)
                {
                    map.keys.key_1.taken = false;

                }
            }
            if (map.level[player.mapCoord.y][player.mapCoord.x] == 6) //ce gres skozi keylock_2
            {
                map.level[player.mapCoord.y][player.mapCoord.x] = 0;
                map.keys.key_2.num = map.keys.key_2.num - 1;
                // update panel
                if (map.keys.key_2.num == 0)
                {
                    map.keys.key_2.taken = false;

                }
            }
            if (map.level[player.mapCoord.y][player.mapCoord.x] == 10) 
            {
                alert("konec si zaenkrat");
                document.location.reload();
            }
            player.draw();

            //  if ((((mouse_x >= text_play_1.x && mouse_x <= text_play_1.x_2) && (mouse_y >= text_play_1.y_1 && mouse_y <= text_play_1.y))) && mouse_click_left == true)
            if(game.loop == false)
            {

                console.log('quit');
                //menu();

            } else
            {
                setTimeout(game.start, game.tick);
            }

        }

    
    };


}

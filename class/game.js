function gameInit()
{
    game={
        loop:true,
        tick:100,
        start:function()
        {

            if (key.up == true)
            {
                if(player.canMove('up'))
                {
                    player.move('up');
                }
            }
            else if (key.down == true)
            {
                if(player.canMove('down'))
                {
                    player.move('down');
                }
            }
            else if (key.left == true)
            {
                if(player.canMove('left'))
                {
                    player.move('left');
                }
            }
            else if (key.right == true)
            {
                if(player.canMove('right'))
                {
                    player.move('right');
                }
            }
            switch(map.level[player.mapCoord.y][player.mapCoord.x]) //preverja trenutne koordinate v polju map.level
            {
                case 5: //key_1
                    map.keys.key_1.pickUp();
                    break;

                case 7: //key_2
                    map.keys.key_2.pickUp();
                    break;

                case 8: //keylock_1
                    map.keys.key_1.unlock();
                    break;

                case 6: //keylock_2
                    map.keys.key_2.unlock();
                    break;

                case 10: //end
                    alert("konec si zaenkrat");
                    document.location.reload();
                    break;

            }

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

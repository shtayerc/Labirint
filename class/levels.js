function levelsInit()
{
    emptyTest="0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0";
    empty=[ 
                    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]];

level_00="0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0|2,5,5,5,5,5,0,2,11,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2|2,5,5,5,5,5,0,2,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,5,5,2,2,2,6,6,0,0,0,2,0,0,0,0,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,2|2,5,5,2,0,0,2,2,2,0,0,0,2,2,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2|2,2,5,2,2,0,0,2,0,0,2,0,0,2,0,0,2,0,2,0,2,2,2,2,2,2,2,2,2,2,0,2,0,2|2,2,2,2,2,0,11,0,0,2,2,0,0,0,0,0,2,0,2,0,2,0,0,0,0,0,0,0,0,2,0,2,0,2|2,0,2,0,0,0,2,2,2,2,2,2,2,2,2,0,2,0,2,0,2,0,2,2,2,2,2,2,0,2,0,2,0,2|2,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,2,0,2,0,2,0,2,0,0,6,0,2,0,2,0,2,0,2|2,0,2,0,2,0,2,2,2,0,0,0,0,0,0,0,2,0,2,0,2,0,2,0,2,2,0,2,0,2,0,2,0,2|2,0,7,2,0,2,2,0,2,2,2,2,8,8,8,8,0,1,0,0,2,0,2,6,10,2,0,2,0,2,0,2,0,2|2,0,0,0,2,0,0,0,2,2,0,2,8,8,8,8,2,0,2,0,2,0,2,2,2,2,0,2,0,2,0,2,0,2|2,0,2,0,8,2,0,0,0,2,2,0,2,8,8,8,2,0,2,0,2,0,0,0,0,0,5,2,0,2,0,2,0,2|2,0,0,2,0,0,0,2,2,2,0,0,2,8,8,8,2,0,2,0,2,2,2,2,2,2,2,2,0,2,0,2,0,2|2,0,0,0,2,0,0,2,0,0,0,2,2,8,8,8,2,0,2,0,0,0,0,0,0,0,0,0,0,2,0,2,0,2|2,0,2,0,0,0,2,0,2,2,0,0,2,8,8,8,2,0,2,2,2,2,2,2,2,2,2,2,2,2,0,2,0,2|2,0,0,2,0,2,0,0,2,0,2,2,2,8,8,8,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2|2,0,0,0,0,0,0,0,2,0,7,2,8,8,8,8,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,2|2,0,2,0,0,0,2,0,8,0,2,8,8,8,8,8,8,8,8,8,8,0,0,0,2,0,2,0,0,0,0,2,0,2|2,0,0,2,0,2,2,0,2,2,2,2,8,8,8,8,8,8,8,8,8,0,2,0,2,0,0,0,2,0,0,2,0,2|2,0,0,0,0,8,0,0,2,7,8,8,8,8,8,8,8,8,8,8,8,0,2,2,2,0,2,0,0,0,0,5,0,2|2,0,0,2,8,2,8,2,2,2,8,8,8,8,8,8,8,8,8,8,8,0,0,0,0,0,2,0,0,0,0,2,0,2|2,0,2,5,5,5,5,5,2,7,8,8,8,8,8,8,8,8,8,8,8,2,2,2,0,0,2,0,0,0,2,2,0,2|2,0,2,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,2|2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0"; 

level_01="0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0|2,0,2,0,0,0,8,0,0,0,5,5,0,0,0,0,8,0,0,0,0,5,5,0,0,0,8,2,2,2,2,2,0,2|2,0,2,2,2,2,0,2,2,2,2,2,2,2,2,2,8,2,2,2,2,2,2,2,2,2,0,2,5,2,2,2,0,2|2,0,5,5,0,2,0,2,8,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,8,2,0,2,0,2,5,2,0,2|2,0,2,2,0,2,0,2,0,2,2,2,2,2,2,2,8,2,2,2,2,2,2,2,0,2,0,2,0,2,5,2,0,2|2,0,2,2,0,2,0,2,0,2,8,0,0,0,0,0,8,0,0,0,0,0,8,2,0,2,0,2,0,2,2,2,0,2|2,0,2,2,0,2,0,2,5,2,0,2,2,2,2,2,8,2,2,2,2,2,0,2,0,2,0,2,0,0,2,2,0,2|2,0,2,2,0,2,0,2,0,2,0,2,8,0,5,5,8,5,5,0,8,2,0,2,0,2,5,2,2,0,2,2,0,6|2,0,0,0,0,2,0,2,0,2,0,2,0,2,2,2,8,2,2,2,0,2,0,2,5,2,0,2,2,0,2,2,0,6|2,0,2,2,2,2,0,2,0,2,0,2,5,2,0,0,8,0,0,2,5,2,0,2,0,2,0,2,2,0,0,0,0,2|2,0,0,0,0,2,0,2,0,2,0,2,5,2,0,2,8,2,0,2,5,2,0,2,0,2,0,2,2,0,2,2,0,6|2,0,5,2,0,2,8,8,8,8,8,8,8,8,8,8,7,8,8,8,8,8,8,8,8,8,8,2,2,0,2,2,0,2|2,2,2,2,0,2,0,2,0,2,0,2,5,2,0,2,8,2,0,2,5,2,0,2,0,2,0,2,2,0,0,0,0,2|2,0,0,0,0,2,0,2,0,2,0,2,5,2,0,0,8,0,0,2,5,2,0,2,0,2,0,2,5,0,2,2,0,2|2,0,2,2,5,2,0,2,0,2,0,2,0,2,2,2,8,2,2,2,0,2,0,2,0,2,0,2,5,5,2,5,0,2|2,0,0,2,2,2,0,2,5,2,0,2,8,0,5,5,8,5,5,0,8,2,0,2,5,2,0,2,2,0,2,2,0,2|2,2,0,2,2,2,0,2,0,2,0,2,2,2,2,2,8,2,2,2,2,2,0,2,0,2,0,2,5,0,2,2,0,2|2,0,0,2,2,2,0,2,0,2,8,0,0,0,0,0,8,0,0,0,5,0,8,2,0,2,0,2,5,0,2,5,0,2|2,0,2,2,2,2,0,2,0,2,2,2,2,2,2,2,8,2,2,2,2,2,2,2,0,2,0,2,2,0,2,5,6,2|2,0,0,2,2,2,0,2,8,0,0,0,0,5,0,0,8,0,0,0,0,5,0,0,8,2,0,2,5,0,2,2,6,2|2,2,5,2,2,2,0,2,2,2,2,2,2,2,2,2,8,2,2,2,2,2,2,2,2,2,0,2,2,2,2,5,5,2|2,0,0,0,5,2,8,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,0,8,6,5,5,5,5,5,2|2,1,0,0,5,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,10,2|0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0";
level_02="0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,2|2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,2|2,11,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,5,0,2,2|2,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2|2,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,2|2,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2|2,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,11,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,11,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2|2,1,0,0,8,0,0,0,0,10,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2|0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0";
}

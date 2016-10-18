function createCanvas() //funkcija ki naredi canvas element
{
    canvas = document.createElement('CANVAS'); //ce napises brez var spremenljivka postane avtomatsko globalna  
    canvas.width = '800';
    canvas.height = '627';
    canvas.style.background='#000000';
    canvas.style.border = 'black solid 2px';
    screen = canvas.getContext('2d');
    document.getElementsByTagName('BODY') [0].appendChild(canvas);
}
function coord(x,y) //za lazje shranjevanje koordinat, npr. start=new coord(2,10);
{
    this.x=x;
    this.y=y;

}
function text(x,y,txt)
{
    this.txt=txt;
    this.x=x;
    this.y=y;

    this.isClicked=function()

    {
        screen.font=game.menu.font;

        var width=screen.measureText(txt).width; //izracuna dolzino besedila v pikslih
        var height=screen.measureText('M').width; //sirina velikega M je priblizno visina fonta

        if((mouse.canvasCoord.x >= this.x && mouse.canvasCoord.x <= this.x+width) && 
            (mouse.canvasCoord.y >= this.y-height && mouse.canvasCoord.y <= this.y))
        {
            if(mouse.button.left==true)
            {
                return true;
            }
        }


        return false;
    };
    this.draw=function()
    {
        screen.font=game.menu.font;
        screen.fillStyle=game.menu.color;
        screen.fillText(this.txt, this.x, this.y);
    };
}

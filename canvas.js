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
function text(x,y,txt) //ustvari besedilo na katerega lahko kliknes, metoda object.isClicked vrne true ce je uporabnik stisnil na text
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
            if(mouse.click.left==true)
            {
               mouse.click.left=false;
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
function toArray(str) //pretvori string mape v dvodimenzionalno polje
{
    var arr=str.split('|');
    var n=[];
    for(var i=0;i<arr.length;i=i+1)
    {
        n[i]=JSON.parse('[' + arr[i] + ']');

    }
    return n;
}
function toMapString(arr) //pretvori dvodimenzionalno polje v string
{
    var str='';
    for(var i=0;i<arr.length;i=i+1)
    {
        str=str+arr[i].join(',');
        if(i+1<arr.length)
        {
            str=str+'|';
        }

    }
    return str;
}
function msg(text,color)
{


    screen.font = "50px Arial";
    screen.fillStyle = color;
    screen.textAlign = "center";
    screen.fillText(text, canvas.width / 2, canvas.height / 2);

}

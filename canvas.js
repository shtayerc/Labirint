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

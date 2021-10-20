export class Field{
    isVisible : boolean;
    hasMine : boolean;
    nearbyMines: number = 0;
    isFlagged : boolean ;
    isWrongFlagged : boolean = false;
    xCord : number; //vertical     TOP-Left x=0,y=0
    yCord : number; //horizontal

    constructor(xCord: number, yCord: number, isVisible:boolean, isFlagged: boolean, hasMine:boolean){
        this.isVisible = isVisible;
        this.isFlagged = isFlagged;
        this.hasMine = hasMine;
        this.xCord = xCord;
        this.yCord = yCord;
    }
}
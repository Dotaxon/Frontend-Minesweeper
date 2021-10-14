export class Field{
    isVisible : boolean;
    hasMine : boolean;
    xCord : number; //vertical     TOP-Left x=0,y=0
    yCord : number; //horizontal

    constructor(xCord: number, yCord: number, isVisible:boolean, hasMine:boolean){
        this.isVisible = isVisible;
        this.hasMine = hasMine;
        this.xCord = xCord;
        this.yCord = yCord;
    }
}
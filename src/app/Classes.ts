import { GameLevel } from "./Enums";

export class Field{
    isVisible : boolean;
    hasMine : boolean;
    nearbyMines: number = 0;
    isFlagged : boolean ;
    isWrongFlagged : boolean = false;
    hasBeenClicked : boolean = false;
    hasBeenWrongClicked : boolean = false;
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
export class HighScore{

    seconds : number;
    name : string;
    difficulty : GameLevel;

    constructor(seconds : number, name :string, gameLevel : GameLevel) {
        this.seconds = seconds;
        this.name = name;
        this.difficulty = gameLevel;
    }
    
}
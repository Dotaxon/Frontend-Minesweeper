import { Component, OnInit } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { Field } from '../Field';
import { GameLevel, GameStatus } from '../Enums';
import { InformationService } from '../information.service';
import { ResetService } from '../new-game-button/reset.service';
import { PlaygroundService } from './playground.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  rows : number ;
  columns : number ;
  mines : number ; 
  countInvisibleFields : number = NaN; //wenn null dann gibt es keine Felder mehr die angeklickt werden können -> spiel zuende
  flagCount : number; //Es gibt soviele Flaggen wie Minen flagCount zählt runter 
  arr_Fields : Field[][] = [];

 
  //Style attributes unit px!!
  columnsStyleString : string = ""; //ist dafür dar um einen String zu haben der den css Style beschreibt
                                    //verwendet in playground.component.html
  playgroundWidthStyle : string ;
  playgroundHeightStyle : string ;
  playgroundPaddingStyle : string;
  private static _playgroundWidthStyle: string;
  private static _playgroundHeightStyle: string;
  private static _playgroundPaddingStyle: string;
  
  
  constructor(
      private playgroundService : PlaygroundService,
      private infoService : InformationService,
      private resetService : ResetService
    ) { 
    if(this.infoService.gameLevel == GameLevel.hard){
      this.rows = 30;
      this.columns = 16;
      this.mines = 10;
    }
    else if (this.infoService.gameLevel == GameLevel.normal){
      this.rows = 15;
      this.columns = 13;
      this.mines = 40;
    }
    else{ //GameLevel is easy
      this.rows = 10;
      this.columns = 10;
      this.mines = 10;
    }

    this.flagCount = this.mines;
    this.countInvisibleFields = this.rows * this.columns;
    
    //InfoService configurieren
    this.infoService.nextFlagCountValue(this.flagCount);
    this.infoService.gameStatus = GameStatus.playing;
    this.infoService.isTimeRunning = false;
    this.infoService.nextTime(0); //Zeit auf null setzen

    //Reset Service configurieren/subscriben 
    this.resetService.isReset.next(false); //sichergehen das false
    this.resetService.isReset.subscribe(isReset => {
      if(isReset){
        this.resetPlayground();
      }
    })


    //styles
    for (let i = 0; i < this.columns; i++) //um columnsStyleString zu erstellen 
      this.columnsStyleString += "1fr ";    
    this.playgroundPaddingStyle = "8px";
    
    
    //Werte ohne Einheit holen
    let cellWidth = +CellComponent.cellWidth.replace("px","");
    let cellHeight = +CellComponent.cellHeight.replace("px","");
    let paddingSize = +this.playgroundPaddingStyle.replace("px","");
    
    //berechnet die größe des Playgrounds
    this.playgroundWidthStyle = (cellWidth*this.columns + paddingSize*2) + "px";
    this.playgroundHeightStyle = (cellHeight*this.rows + paddingSize*2) + "px";
    
    //Statische Attribute initzialisieren
    PlaygroundComponent._playgroundWidthStyle = this.playgroundWidthStyle;
    PlaygroundComponent._playgroundHeightStyle = this.playgroundHeightStyle;
    PlaygroundComponent._playgroundPaddingStyle = this.playgroundPaddingStyle;
    
  }
  
  async ngOnInit(): Promise<void> {

    this.arr_Fields = await this.playgroundService.getFieldArray(this.rows, this.columns, this.mines);
  
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.countMinesNearbyBetter(this.arr_Fields[i][j]);  
        
      }
    }


  }

  resetPlayground(){
    if(this.infoService.gameLevel == GameLevel.hard){
      this.rows = 16;
      this.columns = 30;
      this.mines = 99;
    }
    else if (this.infoService.gameLevel == GameLevel.normal){
      this.rows = 15;
      this.columns = 13;
      this.mines = 40;
    }
    else{ //GameLevel is easy
      this.rows = 10;
      this.columns = 10;
      this.mines = 10;
    }
    this.flagCount = this.mines;
    this.countInvisibleFields = this.rows * this.columns;
    
    //InfoService configurieren
    this.infoService.nextFlagCountValue(this.flagCount);
    this.infoService.gameStatus = GameStatus.playing;
    this.infoService.isTimeRunning = false;
    this.infoService.nextTime(0); //Zeit auf null setzen

    //Reset Service configurieren/subscriben 
    this.resetService.isReset.next(false); //sichergehen das false
    this.resetService.isReset.subscribe(isReset => {
      if(isReset){
        this.resetPlayground();
      }
    })


    //styles
    for (let i = 0; i < this.columns; i++) //um columnsStyleString zu erstellen 
      this.columnsStyleString += "1fr ";    
    this.playgroundPaddingStyle = "8px";
    
    
    //Werte ohne Einheit holen
    let cellWidth = +CellComponent.cellWidth.replace("px","");
    let cellHeight = +CellComponent.cellHeight.replace("px","");
    let paddingSize = +this.playgroundPaddingStyle.replace("px","");
    
    //berechnet die größe des Playgrounds
    this.playgroundWidthStyle = (cellWidth*this.columns + paddingSize*2) + "px";
    this.playgroundHeightStyle = (cellHeight*this.rows + paddingSize*2) + "px";
    
    //Statische Attribute initzialisieren
    PlaygroundComponent._playgroundWidthStyle = this.playgroundWidthStyle;
    PlaygroundComponent._playgroundHeightStyle = this.playgroundHeightStyle;
    PlaygroundComponent._playgroundPaddingStyle = this.playgroundPaddingStyle;
    
    this.arr_Fields = [];
    //this.resetPlaygroundAsync();
    this.ngOnInit();
  }

  async resetPlaygroundAsync() : Promise<void>{

    this.arr_Fields = await this.playgroundService.getFieldArray(this.rows, this.columns, this.mines);
  
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.countMinesNearbyBetter(this.arr_Fields[i][j]);  
        
      }
    }

  }

  
  /**Händelt den Click auf einem field (cell)
   * 
   * @param field das field welches gedrückt wurde
   * @returns 
   */
  handleLeftClick(field : Field) : void{
    if (this.infoService.gameStatus != GameStatus.playing) return; //wenn spiel zu ende
    if (field.isVisible) return; //Feld wurde schon angeklickt
    if (field.isFlagged) return; //ein Geflaggtes Feld kann nicht geklickt werden
    if (!this.infoService.isTimeRunning) { //speichert Zeitpunkt des ersten Klicks
      this.infoService.isTimeRunning = true;
    }
    

    field.isVisible = true;
    this.countInvisibleFields--;
    
    if (field.hasMine){ //spiel zu ende
      this.gameOver();
      return;
    }
    
    if (field.nearbyMines == 0) {  //Wenn 0 müssen die Felder drum herum (3mal3) aufgedeckt werden  
      let x = field.xCord;
      let y = field.yCord;
      
      for (let i = -1; i <=1; i++) {
        for (let j = -1; j <=1; j++) {
          if (i == 0 && j == 0) continue; //überspringt das mittlere Feld, also jenes welches angeklickt wurde
          try {
            
            if (this.arr_Fields[y-i][x-j].isVisible) continue; //wenn das Feld schon sichtbar ist muss es nicht mehr sichtbar gemacht werden         
            this.arr_Fields[y-i][x-j].isVisible = true;
            this.countInvisibleFields--;
            
            if(this.arr_Fields[y-i][x-j].nearbyMines == 0) {
              this.arr_Fields[y-i][x-j].isVisible = false; //damit die if Abfrage in handleCellClick nicht greift
              this.countInvisibleFields++; // damit der counter auf dem richtigen stand bleibt
              this.handleLeftClick(this.arr_Fields[y-i][x-j]);
            }
          } catch (error) {}          
        }     
      }
    }
    
    if (this.countInvisibleFields <= this.mines && this.flagCount <= 0){ //Gewinn Bedinung
      this.gameHasBeenWon();
    } 
    
  }

  handleRightClick(field : Field): void{
    if (this.infoService.gameStatus != GameStatus.playing) return; //wenn spiel zu ende
    if (field.isVisible) return; //Sichtbares Feld kann nicht geflaggt/deflaggt werden
    if (!this.infoService.isTimeRunning) { //speichert Zeitpunkt des ersten Klicks
      this.infoService.isTimeRunning = true;
    }

    if (field.isFlagged){ //Flage entfernen deflaggen
      this.flagCount++;
      field.isFlagged = false;
      this.infoService.nextFlagCountValue(this.flagCount);
    }
    else if(!field.isFlagged && this.flagCount > 0){//Flagge setzen
      this.flagCount--;
      field.isFlagged = true;
      this.infoService.nextFlagCountValue(this.flagCount);
    }

    if (this.countInvisibleFields <= this.mines && this.flagCount <= 0){ //Gewinn Bedinung
      this.gameHasBeenWon();
    } 

  }
  
  gameOver(){
    this.infoService.isTimeRunning = false;
    this.infoService.gameStatus = GameStatus.lost;
    console.log("Game Over");
  }
  
  gameHasBeenWon(){
    this.infoService.isTimeRunning = false;
    this.infoService.gameStatus = GameStatus.won;
    console.log("Winner");
  }
  
  
  /**Zählt die Anzahl an Feldern in einem 3mal3 Radius 
   * um ein Feld
   * 
   * @param field Das Feld um das gezählt wird
   */
  countMinesNearbyBetter(field :Field) : void {
    let x = field.xCord;
    let y = field.yCord;
    let count = 0;
    
    
    for (let i = -1; i <=1; i++) {
      for (let j = -1; j <=1; j++) {
        if (i == 0 && j == 0) continue;
        try {
          if (this.arr_Fields[y+i][x+j].hasMine) count++;
          
          
        } catch (error) {}          
      }     
    }

    
    
    field.nearbyMines = count;
  }
  
  public static get playgroundWidthStyle(): string {
    return PlaygroundComponent._playgroundWidthStyle;
  }

  public static get playgroundHeightStyle(): string {
    return PlaygroundComponent._playgroundHeightStyle;
  }

  public static get playgroundPaddingStyle(): string {
    return PlaygroundComponent._playgroundPaddingStyle;
  }
  
}

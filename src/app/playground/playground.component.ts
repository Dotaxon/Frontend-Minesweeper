import { Component, OnInit } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { Field } from '../Field';
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
  arr_Fields : Field[][] = [];
 
  //Style attributes unit px!!
  columnsStyleString : string = ""; //ist dafür dar um einen String zu haben der den css Style beschreibt
                                    //verwendet in playground.component.html
  playgroundWidthStyle ;
  playgroundHeightStyle  ;
  playgroundPaddingStyle ;
  


  constructor(private playgroundService : PlaygroundService) { 
    this.rows = 10;
    this.columns = 10;
    this.mines = 5;
    this.countInvisibleFields = this.rows * this.columns;

    
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



  }

  async ngOnInit(): Promise<void> { 
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
    if (field.isVisible) return; //Feld wurde schon angeklickt
    if (field.isFlagged) return; //ein Geflaggtes Feld kann nicht geklickt werden

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

    if (this.countInvisibleFields <= this.mines){
      this.gameHasBeenWon();
    } 

  }

  handleRightClick(field : Field): void{
    if (field.isVisible) return; //Sichtbares Feld kann nicht geflaggt werden
    
    field.isFlagged = !field.isFlagged;
  }

  gameOver(){
    console.log("Game Over");
  }

  gameHasBeenWon(){
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


    /**
   * 
   * @param field 
   * @deprecated
   */
     countMinesNearby(field :Field): void{
      let x = field.xCord;
      let y = field.yCord;
      let count = 0;
  
      if(y > 0 && y < this.rows-1 && x > 0 && x < this.columns-1)
      {//if not at border
        if(this.arr_Fields[y+1][x].hasMine) count++; //below
        if(this.arr_Fields[y-1][x].hasMine) count++; //on top
        if(this.arr_Fields[y][x-1].hasMine) count++; //left
        if(this.arr_Fields[y][x+1].hasMine) count++; //right
        if(this.arr_Fields[y+1][x+1].hasMine) count++; //bottom right
        if(this.arr_Fields[y+1][x-1].hasMine) count++; //bottom left
        if(this.arr_Fields[y-1][x+1].hasMine) count++; //top right
        if(this.arr_Fields[y-1][x-1].hasMine) count++; //top left
      }
      else if(y == 0 && x > 0 && x < this.columns-1)
      {//if at top border but not in corner
        if(this.arr_Fields[y+1][x].hasMine) count++; //below
        if(this.arr_Fields[y][x-1].hasMine) count++; //left
        if(this.arr_Fields[y][x+1].hasMine) count++; //right
        if(this.arr_Fields[y+1][x+1].hasMine) count++; //bottom right
        if(this.arr_Fields[y+1][x-1].hasMine) count++; //bottom left
      }
      else if(y == this.rows-1 && x > 0 && x < this.columns-1)
      {//if at bottom border but not in corner
        if(this.arr_Fields[y-1][x].hasMine) count++; //on top
        if(this.arr_Fields[y][x-1].hasMine) count++; //left
        if(this.arr_Fields[y][x+1].hasMine) count++; //right
        if(this.arr_Fields[y-1][x+1].hasMine) count++; //top right
        if(this.arr_Fields[y-1][x-1].hasMine) count++; //top left
      }
      else if(y == this.rows-1 && x > 0 && x < this.columns-1)
      {//if at right border but not in corner
        if(this.arr_Fields[y-1][x].hasMine) count++; //on top
        if(this.arr_Fields[y][x-1].hasMine) count++; //left
        if(this.arr_Fields[y+1][x].hasMine) count++; //below
        if(this.arr_Fields[y-1][x-1].hasMine) count++; //top left
        if(this.arr_Fields[y+1][x-1].hasMine) count++; //bottom left
      }
      else if(y > 0 && y < this.rows-1 && x == 0)
      {//if at left border but not in corner
        if(this.arr_Fields[y-1][x].hasMine) count++; //on top
        if(this.arr_Fields[y+1][x].hasMine) count++; //below
        if(this.arr_Fields[y][x+1].hasMine) count++; //right
        if(this.arr_Fields[y-1][x+1].hasMine) count++; //top right
      }
      else if(y == 0 && x == 0)
      {//top left corner
        if(this.arr_Fields[y+1][x].hasMine) count++; //below
        if(this.arr_Fields[y][x+1].hasMine) count++; //right
        if(this.arr_Fields[y+1][x+1].hasMine) count++; //bottom right
        if(this.arr_Fields[y+1][x+1].hasMine) count++; //bottom right
      }
      else if(y == 0 && x == this.columns-1)
      {//top right corner
        if(this.arr_Fields[y+1][x].hasMine) count++; //below
        if(this.arr_Fields[y][x-1].hasMine) count++; //left
        if(this.arr_Fields[y+1][x-1].hasMine) count++; //bottom left
      }
      else if (y == this.rows-1 && x == 0)
      {//bottom left corner
        if(this.arr_Fields[y-1][x].hasMine) count++; //on top
        if(this.arr_Fields[y][x+1].hasMine) count++; //right
        if(this.arr_Fields[y-1][x+1].hasMine) count++; //top right
      }
      else if(y == this.rows-1 && x == this.columns-1)
      {//bottom right corner
        if(this.arr_Fields[y-1][x].hasMine) count++; //on top
        if(this.arr_Fields[y][x-1].hasMine) count++; //left
        if(this.arr_Fields[y-1][x-1].hasMine) count++; //top left
      }
  
  
      field.nearbyMines = count;
    }
}

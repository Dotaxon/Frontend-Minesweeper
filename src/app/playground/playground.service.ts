import { Injectable } from '@angular/core';
import { Field } from '../Field';
import { PlaygroundComponent } from './playground.component';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {

  constructor() { }


  /**Macht eine HTTP anfrage ans Backend und hohlt sich die Stellen an 
   * Denen Minen sein sollen
   * 
   * @param rows Anzahl an Zeilen
   * @param colums Anzahl an Spalten
   * @param mines Anzahl an Minen im ganzen Array
   * @returns Boolean Array 
   */
  private getMineArray(rows : number, colums : number, mines : number): boolean[][]{
    //todo http anfrage backend
    return [[false,false, true],[true,true,false]];
  }


  /**Gibt ein 2D Array an Feldern zurück In den Zufällig Minen plaziert sind
   * 
   * @param rows Anzahl an Zeilen
   * @param colums Anzahl an Spalten
   * @param mines Anzahl an Minen im ganzen Array
   * @returns Array an Feldern zur Verwendung im Spiel
   */
  getFieldArray(rows : number, colums : number, mines : number): Field[][]{
    let arr_Fields : Field[][] = [];
    let arr_Mines : boolean[][] = this.getMineArray(rows, colums, mines);
  
    for (let i = 0; i < rows; i++) {
        arr_Fields[i] = [];

        for (let j = 0; j < colums; j++) {

          let field : Field = new Field(j,i,false, arr_Mines[i][j]);
          arr_Fields[i][j] = field;
        }
    }
    
    
    return arr_Fields;
  }

  countMinesNearby(field :Field){
    let x = field.xCord;
    let y = field.yCord;

   // if(y > 0 && y < )


  }

}



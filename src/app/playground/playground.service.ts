import { Injectable } from '@angular/core';
import { Field } from '../Classes';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaygroundService {

  private readonly backendURL = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) { }


  /**Macht eine HTTP anfrage ans Backend und hohlt sich die Stellen an 
   * Denen Minen sein sollen
   * 
   * @param rows Anzahl an Zeilen
   * @param columns Anzahl an Spalten
   * @param mines Anzahl an Minen im ganzen Array
   * @returns Boolean 2D Array [row][colum]
   */
  private  getMineArray(rows : number, columns : number, mines : number): Observable<boolean[][]>{
    
    let returnVal =  this.http.get<boolean[][]>(this.backendURL + "/?rows="+rows+"&columns="+columns+"&mines="+mines);

    console.log(this.backendURL +"/?rows="+rows+"&columns="+columns+"&mines="+mines);

    return returnVal;
  }


  /**Gibt ein 2D Array an Feldern zurück In den Zufällig Minen plaziert sind
   * 
   * @param rows Anzahl an Zeilen
   * @param columns Anzahl an Spalten
   * @param mines Anzahl an Minen im ganzen Array
   * @returns Array an Feldern zur Verwendung im Spiel [row][colum]
   */
  async getFieldArray(rows : number, columns : number, mines : number): Promise<Field[][]>{
    let arr_Fields : Field[][] = [];
    let arr_Mines : boolean[][];
    arr_Mines = await this.getMineArray(rows,columns,mines).toPromise();
  
    
      
    for (let i = 0; i < rows; i++) {
        arr_Fields[i] = [];

        for (let j = 0; j < columns; j++) {

          let field : Field = new Field(j,i,false,false, arr_Mines[i][j]);
          arr_Fields[i][j] = field;
        }
    }
    
    
    return arr_Fields;
  }



}

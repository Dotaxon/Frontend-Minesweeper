import { Injectable } from '@angular/core';
import { Field } from '../Field';
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
   * @param colums Anzahl an Spalten
   * @param mines Anzahl an Minen im ganzen Array
   * @returns Boolean 2D Array [row][colum]
   */
  private  getMineArray(rows : number, colums : number, mines : number): Observable<boolean[][]>{
    //console.log(this.backendURL + `?rows=${rows}&colums=${colums}&mines=${mines}`);
    
    let returnVal =  this.http.get<boolean[][]>("http://localhost:3000/?rows=3&columns=3&mines=3");
    


    return returnVal;
  }


  /**Gibt ein 2D Array an Feldern zurück In den Zufällig Minen plaziert sind
   * 
   * @param rows Anzahl an Zeilen
   * @param colums Anzahl an Spalten
   * @param mines Anzahl an Minen im ganzen Array
   * @returns Array an Feldern zur Verwendung im Spiel [row][colum]
   */
  getFieldArray(rows : number, colums : number, mines : number): Field[][]{
    let arr_Fields : Field[][] = [];
    let arr_Mines : boolean[][];
    this.getMineArray(rows,colums,mines).subscribe(arr => arr_Mines = arr);
    
    
      
    for (let i = 0; i < rows; i++) {
        arr_Fields[i] = [];

        for (let j = 0; j < colums; j++) {

          let field : Field = new Field(j,i,false, arr_Mines[i][j]);
          arr_Fields[i][j] = field;
        }
    }
    
    
    return arr_Fields;
  }



}

/*
{

      let arr_tmp : boolean[][] = [];

      for(let i = 0; i<arr.length; i++){
        arr_tmp[i] = [];
        for(let j = 0; j< arr[i].length; j++){
          arr_tmp[i][j] = arr[i][j];
        }
      }
      arr_Mines = arr_tmp;
    });*/
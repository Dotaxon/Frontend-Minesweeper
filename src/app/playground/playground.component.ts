import { Component, OnInit } from '@angular/core';
import { Field } from '../Field';
import { PlaygroundService } from './playground.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  rows : number;
  colums : number;
  mines : number; 
  columsStyleString : string = ""; //ist dafür dar um einen String zu haben der den css Style beschreibt
                                    //verwendet in playground.component.html

  arr_Fields : Field[][] ;

  constructor(private playgroundService : PlaygroundService) { 
    this.rows = 3;
    this.colums = 5;
    this.mines = 3;
    this.arr_Fields = this.playgroundService.getFieldArray(this.rows, this.colums, this.mines);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.colums; j++) {
        this.countMinesNearbyBetter(this.arr_Fields[i][j]);     
      }
    }

    for (let i = 0; i < this.colums; i++) {
      this.columsStyleString += "1fr ";
      
    }
    console.log("test");
  }

  ngOnInit(): void {}

  /**
   * 
   * @param field 
   * @deprecated
   */
  countMinesNearby(field :Field): void{
    let x = field.xCord;
    let y = field.yCord;
    let count = 0;

    if(y > 0 && y < this.rows-1 && x > 0 && x < this.colums-1)
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
    else if(y == 0 && x > 0 && x < this.colums-1)
    {//if at top border but not in corner
      if(this.arr_Fields[y+1][x].hasMine) count++; //below
      if(this.arr_Fields[y][x-1].hasMine) count++; //left
      if(this.arr_Fields[y][x+1].hasMine) count++; //right
      if(this.arr_Fields[y+1][x+1].hasMine) count++; //bottom right
      if(this.arr_Fields[y+1][x-1].hasMine) count++; //bottom left
    }
    else if(y == this.rows-1 && x > 0 && x < this.colums-1)
    {//if at bottom border but not in corner
      if(this.arr_Fields[y-1][x].hasMine) count++; //on top
      if(this.arr_Fields[y][x-1].hasMine) count++; //left
      if(this.arr_Fields[y][x+1].hasMine) count++; //right
      if(this.arr_Fields[y-1][x+1].hasMine) count++; //top right
      if(this.arr_Fields[y-1][x-1].hasMine) count++; //top left
    }
    else if(y == this.rows-1 && x > 0 && x < this.colums-1)
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
    else if(y == 0 && x == this.colums-1)
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
    else if(y == this.rows-1 && x == this.colums-1)
    {//bottom right corner
      if(this.arr_Fields[y-1][x].hasMine) count++; //on top
      if(this.arr_Fields[y][x-1].hasMine) count++; //left
      if(this.arr_Fields[y-1][x-1].hasMine) count++; //top left
    }


    field.nearbyMines = count;
  }

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

}

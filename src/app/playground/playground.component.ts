import { Component, OnInit } from '@angular/core';
import { Field } from '../Field';
import { PlaygroundService } from './playground.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  constructor(private playgroundService : PlaygroundService) { }

  public static rows? : number;
  public static colums? : number;
  mines? : number; 


  arr_Fields? : Field[][];

  ngOnInit(): void {
    
    this.arr_Fields = this.playgroundService.getFieldArray(2,3,3)
    console.log(this.arr_Fields);
  }

}

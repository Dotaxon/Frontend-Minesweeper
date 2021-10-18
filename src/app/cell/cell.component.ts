import { Component, Input, OnInit, Output } from '@angular/core';
import { Field } from '../Field';
import { PlaygroundService } from '../playground/playground.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  constructor(
    private playgroundService : PlaygroundService
  ) { }
  
  @Input() field! : Field;

  ngOnInit(): void {
  }

  onClick(){
    this.field.isVisible=true;
    console.log(this.field); 
  }

}

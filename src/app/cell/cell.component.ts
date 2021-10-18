import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() emitter = new EventEmitter<Field>();

  ngOnInit(): void {
  }

  onClick(){
    //this.field.isVisible=true;
    this.emitter.emit(this.field);
    console.log(this.field); 
  }

  onRightClick(){
    return false;
  }

}

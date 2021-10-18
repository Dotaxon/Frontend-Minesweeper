import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from '../Field';
import { PlaygroundService } from '../playground/playground.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  private static _cellWidth: string = "34px";
  private static _cellHeight: string = "34px";
  
  @Input() field! : Field;
  @Output() emitter = new EventEmitter<Field>();
  
  
  
  constructor(private playgroundService : PlaygroundService) { }
  
  
  
  
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
  
  public get cellHeight(): string {
    return CellComponent._cellHeight;
  }
  public set cellHeight(value: string) {
    CellComponent._cellHeight = value;
  }
  public get cellWidth(): string {
    return CellComponent._cellWidth;
  }
  public set cellWidth(value: string) {
    CellComponent._cellWidth = value;
  }
  public static get cellHeight(): string {
    return CellComponent._cellHeight;
  }
  public static set cellHeight(value: string) {
    CellComponent._cellHeight = value;
  }
  public static get cellWidth(): string {
    return CellComponent._cellWidth;
  }
  public static set cellWidth(value: string) {
    CellComponent._cellWidth = value;
  }
}

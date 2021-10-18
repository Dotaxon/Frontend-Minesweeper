import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Field } from '../Field';


@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  private static _cellWidth: string = "34px";
  private static _cellHeight: string = "34px";
  borderWidth : string = "3.5px";

  
  @Input() field! : Field;
  @Output() leftClickEmitter = new EventEmitter<Field>();
  @Output() rightClickEmitter = new EventEmitter<Field>();
  
  
  constructor() { 


  }
  
  
  
  
  ngOnInit(): void {
  }
  
  onClick(){
    this.leftClickEmitter.emit(this.field);
  }
  
  /**Reagiert auf rechtsklick
   * 
   * @returns wenn false wird das Contextmenu des Browsers unterdrückt
   */
  onRightClick(){
    this.rightClickEmitter.emit(this.field);

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

import { Component, OnInit } from '@angular/core';
import { GameStatus } from '../GameStatus';
import { InformationService } from '../information.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  private _valueFlags : string = "000"; 
  public time$ = this.infoService.getTime();
  gameStatusEnum = GameStatus;
  
  
  
  constructor(private infoService : InformationService) {
    this.infoService.getFlagCount().subscribe(value => this._valueFlags = String(value));
    
  }
  
  ngOnInit(): void {
    
  }
  
  
  
  public getGameStatus() {
    return this.infoService.gameStatus;
  }
  public get valueFlags() : string {
    return this._valueFlags;
  }
}

import { Component, OnInit } from '@angular/core';
import { GameLevel, GameStatus } from '../Enums';
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
  gameLevelEnum = GameLevel;

  
  
  
  constructor(public infoService : InformationService) {
    this.infoService.getFlagCount().subscribe(value => this._valueFlags = String(value));
    
  }
  
  ngOnInit(): void {
    
  }
  
  onDifficultyChange(level : any){
    console.log(level);
  }
  

  public getGameStatus() {
    return this.infoService.gameStatus;
  }
  public get valueFlags() : string {
    return this._valueFlags;
  }
}

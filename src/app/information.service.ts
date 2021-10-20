import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription, timer} from 'rxjs';
import { GameLevel, GameStatus } from './Enums';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  private flagCount = new BehaviorSubject<number>(0);

  private time = new BehaviorSubject<number>(0);
  private _isTimeRunning: boolean = false; 
  private timerSub : Subscription | undefined

  gameStatus = GameStatus.playing;
  gameLevel = GameLevel.easy;
  
  constructor() { }
  
  
  
  public get isTimeRunning(): boolean {
    return this._isTimeRunning;
  }
  public set isTimeRunning(value: boolean) {
    

    if (value){
      this.nextTime(0)
      this.timerSub = timer(0,100).subscribe(x => this.nextTime(x))
    }
    else{
      this.timerSub?.unsubscribe();
    }

    this._isTimeRunning = value;
  }
  public getFlagCount(): Observable<number> {
    return this.flagCount;
  }
  public getTime() : Observable<number>{
    return this.time;
  }

  public nextFlagCountValue(value : number) : void{
    this.flagCount.next(value);
  }
  public nextTime(value : number){
    this.time.next(value);
  }
}

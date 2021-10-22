import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { HighScore } from '../Classes';
import { backendURL } from '../Constants';
import { GameLevel } from '../Enums';

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  arr_Easy : HighScore[] = [new HighScore(22,'v',GameLevel.easy)];
  arr_Normal : HighScore[] = [new HighScore(22,'v',GameLevel.normal)];
  arr_Hard : HighScore[] = [new HighScore(22,'v',GameLevel.hard)];

  constructor(
    private http : HttpClient
  ) { }


  addHighScore(highScore : HighScore) : Observable<any>{
    return this.http.put(backendURL +"/highscore", highScore)

  }

  getHighScorePartWithGameLevel(count : number ,filter : GameLevel) : Observable<any>{
    let tmp = this.http.get(backendURL + "/highscore/" + count + "/" + filter);
    tmp.subscribe(s => console.log(s));
    console.log(backendURL + "/highscore/" + count + "/" + filter)
    return tmp;
  }

    /**Doe not work
   * Refreshes the Arrays
   */
     refresh() : void{
      //Gets arr_Easy
      this.getHighScorePartWithGameLevel(5, GameLevel.easy).pipe(first()).toPromise().then(arr => this.arr_Easy = arr);
      //Gets arr_Normal
      this.getHighScorePartWithGameLevel(5, GameLevel.normal).pipe(first()).toPromise().then(arr => this.arr_Normal = arr);
      //Gets arr_Hard
      this.getHighScorePartWithGameLevel(5, GameLevel.hard).pipe(first()).toPromise().then(arr => this.arr_Hard = arr);
    }

}

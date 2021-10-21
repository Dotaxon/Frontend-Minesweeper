import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HighScore } from '../Classes';
import { backendURL } from '../Constants';
import { GameLevel } from '../Enums';

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  constructor(
    private http : HttpClient
  ) { }


  addHighScore(highScore : HighScore) : Observable<any>{
    return this.http.put(backendURL +"/highscore", highScore)

  }

  getHighScorePartWithGameLevel(count : number ,filter : GameLevel) : Observable<any>{
    return this.http.get(backendURL + "/highscore/" + count + "/" + filter)
  }
}

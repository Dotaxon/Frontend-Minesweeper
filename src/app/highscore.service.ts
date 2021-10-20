import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HighScore } from './Classes';
import { backendURL } from './Constants';

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  constructor(
    private http : HttpClient
  ) { }


  addHighScore(highScore : HighScore) : Observable<any>{
    console.log("put");
    return this.http.put("http://localhost:3000/highscore", highScore)

  }
}

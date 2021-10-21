import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HighScore } from '../Classes';
import { GameLevel } from '../Enums';
import { HighscoreService } from './highscore.service';

@Component({
  selector: 'app-high-score-board',
  templateUrl: './high-score-board.component.html',
  styleUrls: ['./high-score-board.component.css']
})
export class HighScoreBoardComponent implements OnInit {

  arr_Easy : HighScore[] = [new HighScore(22,'v',GameLevel.easy)];
  arr_Normal : HighScore[] = [new HighScore(22,'v',GameLevel.normal)];
  arr_Hard : HighScore[] = [new HighScore(22,'v',GameLevel.hard)];

  constructor(
    private highScoreService : HighscoreService
  ) {

   }

  ngOnInit(): void {
    console.log(this.arr_Easy);
  }

  /**Doe not work
   * Refreshes the Arrays
   */
  refresh() : void{
    //Gets arr_Easy
    this.highScoreService.getHighScorePartWithGameLevel(5, GameLevel.easy).pipe(first()).toPromise().then(arr => this.arr_Easy = arr);
    //Gets arr_Normal
    this.highScoreService.getHighScorePartWithGameLevel(5, GameLevel.normal).pipe(first()).toPromise().then(arr => this.arr_Normal = arr);
    //Gets arr_Hard
    this.highScoreService.getHighScorePartWithGameLevel(5, GameLevel.hard).pipe(first()).toPromise().then(arr => this.arr_Hard = arr);
  }
}

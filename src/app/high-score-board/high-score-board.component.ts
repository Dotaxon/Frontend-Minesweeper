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



  constructor(
    public highScoreService : HighscoreService
  ) {
    this.highScoreService.refresh();
   }

  ngOnInit(): void {
    this.highScoreService.refresh();
  }


}

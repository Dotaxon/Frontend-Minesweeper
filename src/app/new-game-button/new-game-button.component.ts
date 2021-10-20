import { Component, OnInit } from '@angular/core';
import { PlaygroundComponent } from '../playground/playground.component';
import { ResetService } from './reset.service';

@Component({
  selector: 'app-new-game-button',
  templateUrl: './new-game-button.component.html',
  styleUrls: ['./new-game-button.component.css']
})
export class NewGameButtonComponent implements OnInit {


  heightStyle: string;
  paddingSizeStyle :string;

  constructor(
    private resetService : ResetService
  ) {    
    this.heightStyle = "40px"
    this.paddingSizeStyle = PlaygroundComponent.playgroundPaddingStyle;
  }

  ngOnInit(): void {
  }

  onClick(){
    this.resetService.isReset.next(true);
  }

}

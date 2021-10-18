import { Component, OnInit } from '@angular/core';
import { PlaygroundComponent } from '../playground/playground.component';

@Component({
  selector: 'app-new-game-button',
  templateUrl: './new-game-button.component.html',
  styleUrls: ['./new-game-button.component.css']
})
export class NewGameButtonComponent implements OnInit {

  widthStyle : string;
  heightStyle: string;
  paddingSizeStyle :string;

  constructor() { 
    this.widthStyle = PlaygroundComponent.playgroundWidthStyle;
    this.heightStyle = "40px"
    this.paddingSizeStyle = PlaygroundComponent.playgroundPaddingStyle;
  }

  ngOnInit(): void {
  }

}

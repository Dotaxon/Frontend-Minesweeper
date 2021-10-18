import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaygroundComponent } from './playground/playground.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CellComponent } from './cell/cell.component';
import { HttpClientModule } from '@angular/common/http';
import { NewGameButtonComponent } from './new-game-button/new-game-button.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    CellComponent,
    NewGameButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

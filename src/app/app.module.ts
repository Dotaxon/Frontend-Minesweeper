import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaygroundComponent } from './playground/playground.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

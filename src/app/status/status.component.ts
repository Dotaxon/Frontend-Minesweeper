import { Component, OnInit } from '@angular/core';
import { InformationService } from '../information.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  private _valueFlags = "000";
  private _valueTime = "000";
  
  constructor(private infoService : InformationService) { }
  
  ngOnInit(): void {
  }


  
  public get valueFlags() {
    return this._valueFlags;
  }
  public set valueFlags(value) {
    this._valueFlags = value;
  }
  public get valueTime() {
    return this._valueTime;
  }
  public set valueTime(value) {
    this._valueTime = value;
  }
}

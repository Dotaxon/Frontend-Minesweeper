import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor() { }

  public isReset = new BehaviorSubject<boolean>(false);

}

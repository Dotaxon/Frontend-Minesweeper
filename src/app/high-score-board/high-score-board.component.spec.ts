import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighScoreBoardComponent } from './high-score-board.component';

describe('HighScoreBoardComponent', () => {
  let component: HighScoreBoardComponent;
  let fixture: ComponentFixture<HighScoreBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighScoreBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighScoreBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

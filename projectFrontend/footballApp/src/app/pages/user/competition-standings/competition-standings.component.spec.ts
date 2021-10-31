import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionStandingsComponent } from './competition-standings.component';

describe('CompetitionStandingsComponent', () => {
  let component: CompetitionStandingsComponent;
  let fixture: ComponentFixture<CompetitionStandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionStandingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

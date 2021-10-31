import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllCompetitionsComponent } from './show-all-competitions.component';

describe('ShowAllCompetitionsComponent', () => {
  let component: ShowAllCompetitionsComponent;
  let fixture: ComponentFixture<ShowAllCompetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllCompetitionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllCompetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCrestComponent } from './team-crest.component';

describe('TeamCrestComponent', () => {
  let component: TeamCrestComponent;
  let fixture: ComponentFixture<TeamCrestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamCrestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

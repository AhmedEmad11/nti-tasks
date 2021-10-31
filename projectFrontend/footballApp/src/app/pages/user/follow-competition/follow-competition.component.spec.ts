import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowCompetitionComponent } from './follow-competition.component';

describe('FollowCompetitionComponent', () => {
  let component: FollowCompetitionComponent;
  let fixture: ComponentFixture<FollowCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowCompetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

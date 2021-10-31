import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowTeamComponent } from './follow-team.component';

describe('FollowTeamComponent', () => {
  let component: FollowTeamComponent;
  let fixture: ComponentFixture<FollowTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

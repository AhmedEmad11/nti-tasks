import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateTeamSquadComponent } from './add-or-update-team-squad.component';

describe('AddOrUpdateTeamSquadComponent', () => {
  let component: AddOrUpdateTeamSquadComponent;
  let fixture: ComponentFixture<AddOrUpdateTeamSquadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateTeamSquadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateTeamSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

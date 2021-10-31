import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowPlayerComponent } from './follow-player.component';

describe('FollowPlayerComponent', () => {
  let component: FollowPlayerComponent;
  let fixture: ComponentFixture<FollowPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

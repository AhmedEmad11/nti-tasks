import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersNewsComponent } from './players-news.component';

describe('PlayersNewsComponent', () => {
  let component: PlayersNewsComponent;
  let fixture: ComponentFixture<PlayersNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

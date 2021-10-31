import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsNewsComponent } from './teams-news.component';

describe('TeamsNewsComponent', () => {
  let component: TeamsNewsComponent;
  let fixture: ComponentFixture<TeamsNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

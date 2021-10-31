import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionsNewsComponent } from './competitions-news.component';

describe('CompetitionsNewsComponent', () => {
  let component: CompetitionsNewsComponent;
  let fixture: ComponentFixture<CompetitionsNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionsNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

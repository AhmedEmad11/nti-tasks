import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateCompetitionComponent } from './add-or-update-competition.component';

describe('AddOrUpdateCompetitionComponent', () => {
  let component: AddOrUpdateCompetitionComponent;
  let fixture: ComponentFixture<AddOrUpdateCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateCompetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

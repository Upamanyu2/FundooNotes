import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotesMoreComponent } from './add-notes-more.component';

describe('AddNotesMoreComponent', () => {
  let component: AddNotesMoreComponent;
  let fixture: ComponentFixture<AddNotesMoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNotesMoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotesMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

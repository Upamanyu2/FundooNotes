import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorGetComponent } from './collaborator-get.component';

describe('CollaboratorGetComponent', () => {
  let component: CollaboratorGetComponent;
  let fixture: ComponentFixture<CollaboratorGetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorGetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

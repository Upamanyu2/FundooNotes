import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLabelsOnClickComponent } from './get-labels-on-click.component';

describe('GetLabelsOnClickComponent', () => {
  let component: GetLabelsOnClickComponent;
  let fixture: ComponentFixture<GetLabelsOnClickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetLabelsOnClickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetLabelsOnClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

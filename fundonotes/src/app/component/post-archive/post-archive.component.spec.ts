import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostArchiveComponent } from './post-archive.component';

describe('PostArchiveComponent', () => {
  let component: PostArchiveComponent;
  let fixture: ComponentFixture<PostArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

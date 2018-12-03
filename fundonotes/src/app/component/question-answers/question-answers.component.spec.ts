import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnswersComponent } from './question-answers.component';

describe('QuestionAnswersComponent', () => {
  let component: QuestionAnswersComponent;
  let fixture: ComponentFixture<QuestionAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    });
    it('should return true when there is a like by user', () => {
    let likeArray = [{
    like : true,
    userId:localStorage.getItem('userId')
    }]
    let questionAnswersArray = {
    like : likeArray
    }
    
    });
    });

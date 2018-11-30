import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponentComponent } from './signup-component.component';

describe('SignupComponentComponent', () => {
  let component: SignupComponentComponent;
  let fixture: ComponentFixture<SignupComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid', ()=>{
    component.signupForm.controls['Fname'].setValue('');
    component.signupForm.controls['Lname'].setValue('');
    component.signupForm.controls['Uname'].setValue('');
    component.signupForm.controls['Email'].setValue('');
    component.signupForm.controls['Password'].setValue('');
    component.signupForm.controls['Confirm password'].setValue('');
    expect(component.signupForm.valid).toBeFalsy();
  });
  it('form should be valid', ()=>{
    component.signupForm.controls['Fname'].setValue('asdd');
    component.signupForm.controls['Lname'].setValue('asdd');
    component.signupForm.controls['Uname'].setValue('asd@asd.com');
    component.signupForm.controls['Email'].setValue('asd@asd.com');
    component.signupForm.controls['Password'].setValue('asssddd12');
    component.signupForm.controls['Confirm password'].setValue('asssddd12');
    expect(component.signupForm.valid).toBeTruthy();
  });
 

});

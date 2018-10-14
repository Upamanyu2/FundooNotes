import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material';
import { ServiceService } from '../../service/http/service.service' ;
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { error } from 'protractor';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm : FormGroup;
  submitted = false;
  public token;
  model:any={}
  constructor(
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private _service : ServiceService,
    private formBuilder : FormBuilder,
    public router:Router
  ) { }
/*------------------------------------------------------------------------------------------------------------------------------------*/ 
  ngOnInit() {                  // function executes while initialization
    this.token=this.route.snapshot.params['token'];
    console.log(this.token);
    
    this.resetPasswordForm = this.formBuilder.group({
      pass :['', [Validators.required, Validators.minLength(6)]],
      Conpass : ['', [Validators.required, Validators.minLength(6)]]
    })
  }


/*------------------------------------------------------------------------------------------------------------------------------------*/ 
get f() {                     // function returns all the controls of the input field.
  return this.resetPasswordForm.controls;
}

/*------------------------------------------------------------------------------------------------------------------------------------*/ 
reset(){                     // function called while the reset button is pressed for resetting the password
  this.submitted = true;
  var password=this.model.password;
  var confirmpassword=this.model.confirmpassword;
  if(password==''||password==undefined||confirmpassword==''||confirmpassword==undefined)
  {
    this.snackBar.open('Please provide a password to reset password', 'close', {
      duration: 2000,
    });
    return;
  }
  if(password!=confirmpassword)
  {
    this.snackBar.open('Password did not matched,try valid password', 'close', {
      duration: 2000,
    });
    return;
  }
  this._service.posttoken("user/reset-password",{"newPassword":password},this.token)
  .subscribe(
    data =>{
      console.log("POST Request is successful ", data);
      this.snackBar.open('Password change sucessfull', 'redirecting...', {
        duration: 2000,
      });
      this.router.navigate(['/',]);
    },
    error =>{
      console.log("Error", error);
      this.snackBar.open('Time over', 'try again sending a new mail', {
        duration: 2000,
      });
    });
}

}
/*------------------------------------------------------------------------------------------------------------------------------------*/ 
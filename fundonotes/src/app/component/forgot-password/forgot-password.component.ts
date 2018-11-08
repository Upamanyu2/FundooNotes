import { Component, OnInit } from '@angular/core';  //Importing modules to inject dependencies
import { ServiceService } from '../../core/service/http/user/service.service';//Importing the service file
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; //Importing the form modules
import { MatSnackBar } from '@angular/material'; //Importing snckbar module
/*------------------------------------------------------------------------------------------------------------------------------------*/
@Component({  //Injected component dependencies
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {  //Exported class
  forgotPasswordForm: FormGroup;
  model: any = {};
  submitted = false;
  constructor(   //All instances of module is made
    private _service: ServiceService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) { }
  /*------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {                   //initialisation function which is called when the page loads
    this.forgotPasswordForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]]
    })
  }
  /*------------------------------------------------------------------------------------------------------------------------------------*/
  get f() {                     // function returns all the controls of the input field.
    return this.forgotPasswordForm.controls;
  }
  /*------------------------------------------------------------------------------------------------------------------------------------*/
  mailSend() {                  //Function to send the link to the registered mail.
    this.submitted = true;
    let mail = this.model.email;
    if (mail.length == 0) {
      console.log("Please provide an email.");
      this.snackBar.open("Please provide a valid email", "cannot send mail", {
        duration: 2000
      })
      return;
    }
    this._service.postData("user/reset", {
      "email": this.model.email
    }).subscribe(data => {   //On success of api call
      console.log("POST request is successful", data);
      this.snackBar.open("Check your mail", "mail sent", {
        duration: 2000
      })
    },
      error => {   //On failure of api call.
        console.log("Error", error);
        this.snackBar.open("Something bad happened", "please contact the support", {
          duration: 2000
        })
      })
    if (this.forgotPasswordForm.invalid) {
      return;
    }

  }

}
/*------------------------------------------------------------------------------------------------------------------------------------*/
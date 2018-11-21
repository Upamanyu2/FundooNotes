import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../core/service/http/user/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { passValidator } from '../../core/util/custom';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
/*-------------------------------------------------------------------------------------------------- */
@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.scss']
})
/*-------------------------------------------------------------------------------------------------- */
export class SignupComponentComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  buttonDisabled = true;
  private cards = [];
  signupForm: FormGroup;
  private service: string;
  submitted: boolean = false;
  private selectService: boolean;
  private serviceName: string;
  model: any = {};
  constructor(
    private _service: ServiceService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }
  /*------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {    //initialisation function which is called when the page loads

    this.signupForm = this.formBuilder.group({
      Fname: ['', Validators.required],
      Lname: ['', Validators.required],
      Uname: ['', [Validators.required, Validators.email]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ['', [Validators.required, Validators.minLength(6), passValidator]]
    })

    let obs = this._service.getDataService();
    obs.pipe(takeUntil(this.destroy$))
      .subscribe((response) => {

        var data = response["data"];
        for (var i = 0; i < data.data.length; i++) {
          data.data[i].select = false;
          this.cards.push(data.data[i]);
        }

      });
  }

  /*------------------------------------------------------------------------------------------------------------------------------------*/
  get f() {                     // function returns all the controls of the input field.
    return this.signupForm.controls;
  }

  /*------------------------------------------------------------------------------------------------------------------------------------*/
  signup() {                      //function should be called of during the next button click.

    this.submitted = true;
    if (this.selectService == true) {
      this.serviceName = this.service;
    }
    else {
      this.snackBar.open("Please select a card", "signup failed", {
        duration: 2000
      })
      return;
    }
    let firstName = this.model.fname;
    let lastName = this.model.lname;
    let username = this.model.uname;
    let email = this.model.uname;
    let password = this.model.pass;
    let confirmpassword = this.model.Cpass;
    if (firstName.length == 0 || lastName.length == 0 || username.length == 0 ||
      password.length == 0 || this.service.length == 0) {
      this.buttonDisabled = false;
      console.log("fill all the details");
      this.snackBar.open("fill in all the details", "signup failed", {
        duration: 2000
      })
      return;
    }
    else if (password != confirmpassword) {
      console.log("give same password to confirm");
      this.snackBar.open("should give same password", "signup failed", {
        duration: 2000
      })
      return;
    }

    else if (password.length < 6 || confirmpassword.length < 6) {
      console.log("Password should be minimum of 6 characters");
      this.snackBar.open("Password should be minimum of 6 characters", "signup failed", {
        duration: 2000
      })
      return;
    }

    this._service.postSignupService(
      {
        "firstName": this.model.fname,
        "lastName": this.model.lname,
        "phoneNumber": 9674921473,
        "service": this.serviceName,
        "createdDate": new Date,
        "modifiedDate": new Date,
        "username": this.model.uname,
        "email": this.model.uname,
        "emailVerified": true,
        "password": this.model.pass
      }).pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          console.log("POST request is successful", data);
          this.snackBar.open("The user is successfully registered", "signup successful", {
            duration: 2000
          })
          return;

        },
        error => {
          console.log("Error", error);
        }
      );
    if (this.signupForm.invalid) {
      return;
    }

  }
  /*------------------------------------------------------------------------------------------------------------------------------------*/
  toggle(datas) {                     //function is used to toggle the card selection and display which card is selected on clicking card.
    // console.log(datas.select);
    datas.select = !datas.select;
    this.selectService = datas.select;
    console.log(this.selectService);
    console.log(datas.select);
    console.log("toggle");
    for (var i = 0; i < this.cards.length; i++) {
      if (datas.name == this.cards[i].name) {
        this.service = this.cards[i].name;
        console.log(this.service);
        continue;
      }
      this.cards[i].select = false;
    }
  }
/*------------------------------------------------------------------------------------------------------------------------------------*/

ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}
}

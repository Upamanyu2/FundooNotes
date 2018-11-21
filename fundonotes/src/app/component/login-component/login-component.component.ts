import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../../core/service/http/user/service.service';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { LoggerServiceService } from '../../core/service/logger/logger-service.service'
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

/*------------------------------------------------------------------------------------------ */
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],

})
/*------------------------------------------------------------------------------------------ */
export class LoginComponentComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  submitted = false;
  model: any = {};
  loginForm: FormGroup;
  body = {};
  private pushedToken;
  constructor(private _service: ServiceService,
    private _service1: NotesServiceService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
  /*------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this._service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {

      })
  }
  /*------------------------------------------------------------------------------------------------------------------------------------*/
  get f() {                     // function returns all the controls of the input field.
    return this.loginForm.controls;
  }
  /*------------------------------------------------------------------------------------------------------------------------------------*/
  login() {                      //function will be called at the time of login.

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    let mail = this.model.email;
    let password = this.model.password;
    if (mail.length == 0) {
      console.log("Provide an email to login");
      this.snackBar.open("fill in all the details", "login failed", {
        duration: 2000
      })
      return;
    }
    else if (password == 0) {
      console.log("Provide a password to login");
      this.snackBar.open("fill in all the details", "login failed", {
        duration: 2000
      })
      return;
    }

    this._service.postData({
      "email": this.model.email,
      "password": this.model.password
    }).pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          console.log("POST request is successful");
          localStorage.setItem("token", data['id'])
          localStorage.setItem("FirstName", data['firstName']);
          console.log(data['userId']);
          localStorage.setItem("UserId", data['userId']);
          localStorage.setItem("imageUrl", data['imageUrl']);
          localStorage.setItem("userName", mail);
          this.pushedToken = localStorage.getItem("pushToken");

          this.body = {
            "pushToken": this.pushedToken
          }
          this._service1.pushNotificationPost(this.body)
            .pipe(takeUntil(this.destroy$))
            .subscribe(reult => {
              LoggerServiceService.log("Post is successful");
            },
              error => {
                LoggerServiceService.log("Unsuccesful, rendered some problem");
              })

          this.router.navigate(['../home', 'notes']);           //for navigating to the home page. 
        },
        error => {
          console.log("Error", error);
          this.snackBar.open("Please provide a valid username or password", "login failed", {
            duration: 2000
          })
          return;
        }
      )

  }
  /*------------------------------------------------------------------------------------------ */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
/*------------------------------------------------------------------------------------------------------------------------------------*/
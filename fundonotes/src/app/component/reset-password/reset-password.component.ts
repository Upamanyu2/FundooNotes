import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ServiceService } from '../../core/service/http/user/service.service';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
/*------------------------------------------------------------------------------------------------------------------------------------*/
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
/*------------------------------------------------------------------------------------------------------------------------------------*/
export class ResetPasswordComponent implements OnInit { //Exported class
  private destroy$: Subject<boolean> = new Subject<boolean>();
  resetPasswordForm: FormGroup;
  submitted = false;
  private accessToken;
  model: any = {}
  /*------------------------------------------------------------------------------------------------------------------------------------*/
  constructor(
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private _service: ServiceService,
    private formBuilder: FormBuilder,
    public router: Router,
    private _service1: NotesServiceService,
  ) { }
  /*------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {                  // function executes while initialization

    this.accessToken = this.route.snapshot.params['token'];

    this.resetPasswordForm = this.formBuilder.group({
      pass: ['', [Validators.required, Validators.minLength(6)]],
      Conpass: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  /*------------------------------------------------------------------------------------------------------------------------------------*/
  get f() {                     // function returns all the controls of the input field.
    return this.resetPasswordForm.controls;
  }

  /*------------------------------------------------------------------------------------------------------------------------------------*/
  reset() {                     // function called while the reset button is pressed for resetting the password
    localStorage.setItem("token", this.accessToken)
    this.submitted = true;
    var password = this.model.password;
    var confirmpassword = this.model.confirmpassword;
    if (password == '' || password == undefined || confirmpassword == '' || confirmpassword == undefined) {
      this.snackBar.open('Please provide a password to reset password', 'close', {
        duration: 2000,
      });
      return;
    }
    if (password != confirmpassword) {
      this.snackBar.open('Password did not matched,try valid password', 'close', {
        duration: 2000,
      });
      return;
    }
    this._service.resetPasswordPost({ "newPassword": password })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          localStorage.removeItem("token");
          this.snackBar.open('Password change sucessfull', 'redirecting...', {
            duration: 2000,
          });
          this.router.navigate(['/',]);
        },
        error => {

          this.snackBar.open('Time over', 'try again sending a new mail', {
            duration: 2000,
          });
        });

  }
  /*------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
/*------------------------------------------------------------------------------------------------------------------------------------*/
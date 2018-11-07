import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ServiceService } from '../../service/user/service.service' ;
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  
})
export class LoginComponentComponent implements OnInit {
  submitted = false;
  model: any ={};
  loginForm : FormGroup;
  constructor(private _service : ServiceService,
     private formBuilder : FormBuilder,
      public snackBar: MatSnackBar,
      public router:Router
      ) { }
 
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        Email : ['', [Validators.required, Validators.email]],
        Password : ['', [Validators.required, Validators.minLength(6)]],
    });
    this._service.getData("user")
       .subscribe((data)=>{
         console.log(data);
         
       }) 
  }
/*------------------------------------------------------------------------------------------------------------------------------------*/ 
  get f() {                     // function returns all the controls of the input field.
    return this.loginForm.controls;
  }
/*------------------------------------------------------------------------------------------------------------------------------------*/ 
  login(){                      //function will be called at the time of login.
          this.submitted=true;
        if (this.loginForm.invalid) {
          return;  
      } 
      let mail = this.model.email;
      let password = this.model.password;
      if(mail.length==0){
        console.log("Provide an email to login");
        this.snackBar.open("fill in all the details", "login failed", {
          duration: 2000
        })
        return;
      }
    else if(password==0){
        console.log("Provide a password to login");
        this.snackBar.open("fill in all the details", "login failed", {
          duration: 2000
        })
        return;
      }
    
      this._service.postData("user/login",{
        "email": this.model.email,
        "password": this.model.password
      }).subscribe(
        data =>{
          console.log("POST request is successful", data);
          localStorage.setItem("token",data['id'])
           localStorage.setItem("FirstName",data['firstName']);
           console.log(data['userId']);
           
           localStorage.setItem("UserId",data['userId']);
           localStorage.setItem("imageUrl",data['imageUrl'])
           
          // console.log(data['id']);
          
          this.router.navigate(['../home','notes']);           //for navigating to the home page. 
        },
        error => {
          console.log("Error",error);
          this.snackBar.open("Please provide a valid username or password", "login failed", {
            duration: 2000
          })
          return;
        }
      )

  }

}
/*------------------------------------------------------------------------------------------------------------------------------------*/
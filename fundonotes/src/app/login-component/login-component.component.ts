import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ServiceService } from '../service/http/service.service' ;

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  
})
export class LoginComponentComponent implements OnInit {
  
  loginForm : FormGroup;
  constructor(private _service : ServiceService, private formBuilder : FormBuilder) { }
 
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        Email : ['', Validators.required],
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
  login(){
    if (this.loginForm.invalid) {
      return;
  }  
  }

}

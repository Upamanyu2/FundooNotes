import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ServiceService } from '../service/http/service.service' ;

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  
})
export class LoginComponentComponent implements OnInit {
  
  loginForm : FormGroup;
  constructor(private _service : ServiceService) { }
 
  ngOnInit() {
    this.loginForm = new FormGroup({
        Email : new FormControl(),
        Password : new FormControl()
    });
    this._service.getData("user")
       .subscribe((data)=>{
         console.log(data);
         
       })
  }

}

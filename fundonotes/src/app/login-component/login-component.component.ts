import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  
})
export class LoginComponentComponent implements OnInit {
  
  signupform : FormGroup;
  constructor() { }
 
  ngOnInit() {
    this.signupform = new FormGroup({
        Email : new FormControl()
    });
  }

}

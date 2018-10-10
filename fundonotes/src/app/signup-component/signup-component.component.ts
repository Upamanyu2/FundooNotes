import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/http/service.service' ;
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})
export class SignupComponentComponent implements OnInit {

  public cards=[];
  signupForm : FormGroup;
  public service;
  constructor(private _service : ServiceService) {  }
  
  ngOnInit() { 
    this.signupForm = new FormGroup({
      Fname : new FormControl(),
      Lname : new FormControl(),
      Uname : new FormControl(),
      Email : new FormControl(),
      Password : new FormControl(),
      ConfirmPassword : new FormControl()
    })
    
    let obs=this._service.getData("user/service");
    
  obs.subscribe((response) =>{
    
    console.log(response);
    var data = response["data"];
    
    for(var i=0;i<data.data.length;i++){
      data.data[i].select=false;
      this.cards.push(data.data[i]);
      
    }
    console.log("cards:", this.cards);
    
  });
   }
   model: any ={};
   signup(){
    this._service.postData("user/userSignUp",
    {
      "firstName": this.model.fname,
      "lastName": this.model.lname,
      "phoneNumber": 9674921473,
      "service": this.service,
      "createdDate": "2018-10-09T06:35:12.617Z",
      "modifiedDate": "2018-10-09T06:35:12.617Z",
      "username": this.model.uname,
      "email": this.model.uname,
      "emailVerified": true,
      "password": this.model.pass
    }).subscribe(
      data => {
        console.log("POST request is successful", data);
      },
      error => {
        console.log("Error",error);
      }
    );
   }
  toggle(datas){
    console.log(datas.select);
    datas.select = !datas.select;
    console.log(datas.select);
    console.log("toggle");
    for(var i = 0; i < this.cards.length; i++){
      if(datas.name==this.cards[i].name){
        this.service=this.cards[i].name;
        console.log(this.service);
        continue;
      }
      this.cards[i].select=false;
    } 
  }

}

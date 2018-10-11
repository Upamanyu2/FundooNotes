import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/http/service.service' ;
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { passValidator } from '../util/custom';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})
export class SignupComponentComponent implements OnInit {
      
      public cards=[];
      signupForm : FormGroup;
      public service : string;
      submitted = false;
      model: any ={};
      constructor(private _service : ServiceService, private formBuilder : FormBuilder, public snackBar: MatSnackBar) {  }
      
      ngOnInit() {    //initialisation function which is called when the page loads
        
        this.signupForm = this.formBuilder.group({
          Fname :['', Validators.required],
          Lname :['', Validators.required],
          Uname :['', [Validators.required, Validators.email]],
          Email :['', [Validators.required, Validators.email]],
          Password :['', [Validators.required, Validators.minLength(6)]],
          ConfirmPassword :['', [Validators.required, Validators.minLength(6),passValidator]]
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

/*------------------------------------------------------------------------------------------------------------------------------------*/ 
      get f() {                     // function returns all the controls of the input field.
        return this.signupForm.controls;
      }

/*------------------------------------------------------------------------------------------------------------------------------------*/ 
      signup(){                      //function should be called of during the next button click.
        
          this.submitted = true;
          
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
              if (this.model.fname.length == 0 || this.model.lname.length == 0 || this.model.uname.length == 0 || 
                this.model.pass.length == 0 || this.service.length == 0  ){
                 console.log("fill all the details")
                 this.snackBar.open("fill in all the details", "signup failed", {
                   duration: 2000
                 })
                 return;
               }
               else if(this.model.pass!=this.model.Cpass){
                 console.log("give same password to confirm");
                 this.snackBar.open("should give same password", "signup failed", {
                   duration: 2000
                 })
                    return;
               }
               else if(this.model.pass.length<6 || this.model.Cpass<6){
                console.log("Password should be minimum of 6 characters");
                this.snackBar.open("Password should be minimum of 6 characters", "signup failed", {
                  duration: 2000
                })
                   return;
              }
               else console.log("POST request is successful", data);
            },
            error => {
              console.log("Error",error);
            }
          ); 
          if (this.signupForm.invalid) {
            return;
        }   
        
    }
/*------------------------------------------------------------------------------------------------------------------------------------*/ 
      toggle(datas){                     //function is used to toggle the card selection and display which card is selected on clicking card.
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

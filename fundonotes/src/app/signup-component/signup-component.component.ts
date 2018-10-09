import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/http/service.service' 

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})
export class SignupComponentComponent implements OnInit {
  public show:boolean = true;

  public cards=[];
  constructor(private _service : ServiceService) {  }
  
  ngOnInit() { 
    let obs=this._service.getData("user/service")
  obs.subscribe((response) =>{
    console.log(response);
    var data = response["data"];
    for(var i=0;i<data.data.length;i++){
      this.cards.push(data.data[i]);
    }
    console.log("cards:", this.cards);
  });
   }
  toggle(){
    this.show = !this.show;
    console.log("toggle");
   
  }

}

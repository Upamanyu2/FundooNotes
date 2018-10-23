import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;


@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {
private token;
public pin: boolean=false;
  constructor(
    private _service : ServiceService,
    
  ) { }

  ngOnInit() {
    this.token=localStorage.getItem("token");
  }
  public pinned(){
    this.pin=!this.pin;
    console.log(this.pin);
    
   }
  public getData(){
    let title = document.getElementById("title").innerHTML;
    let description = document.getElementById("description").innerHTML;
    
    this._service.addNotes("notes/addNotes",{
    'title':title, 
    'description': description,
    'isPined': this.pin},this.token)
    .subscribe(
      data =>{
        console.log("POST Request is successful ", data);   
      },
      error=>{
        console.log("Error", error);
      }
    )
  }
 
}

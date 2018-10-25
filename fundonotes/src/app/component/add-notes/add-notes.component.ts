import { Component, OnInit,  EventEmitter, Output  } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;
// import { log } from 'util';


@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css'],
  outputs: ['closeClicked']
})
export class AddNotesComponent implements OnInit {
private token;
public notes=[];
public pin: boolean=false;
  constructor(
    private _service : ServiceService,
    
  ) { }
  @Output() closeClicked = new EventEmitter<any>();
  ngOnInit() {
    this.token=localStorage.getItem("token");
  }
  public pinned(){
    this.pin=!this.pin;
    console.log(this.pin);
    
   }

  


  public addNotes(){
    let title = document.getElementById("title").innerHTML;
    let description = document.getElementById("description").innerHTML;
        
        this._service.addNotes("notes/addNotes",{
        'title':title, 
        'description': description,
        'isPined': this.pin},this.token)
        .subscribe(
          data =>{
            console.log("POST Request is successful ", data);
            this.closeClicked.emit(true);   
          },
          error=>{
            console.log("Error", error);
          });



       

  }
  
  
 

  
  
 
}

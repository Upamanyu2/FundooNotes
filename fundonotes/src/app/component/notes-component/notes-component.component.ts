import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;

@Component({
  selector: 'app-notes-component',
  templateUrl: './notes-component.component.html',
  styleUrls: ['./notes-component.component.css'],
  
})
 /*-------------------------------------------------------------------------------------------------------------------------------------*/
export class NotesComponentComponent implements OnInit {
  
  constructor(private _service : ServiceService) { }

public notes=[];
private token;
 /*-------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {
    this.token=localStorage.getItem("token");
    console.log(this.token);
    this.getNotes();
  }

 /*-------------------------------------------------------------------------------------------------------------------------------------*/
 displayCard(event){
  if(event){
    console.log(event);
    this.notes=[];
    console.log(this.token);
    this.getNotes();
    
  }   
 }
 /*-------------------------------------------------------------------------------------------------------------------------------------*/
  getNotes(){
  this._service.getDeleteNotes("notes/getNotesList",this.token)
  .subscribe(
    data=>{
    console.log(data['data'].data);
    for(var i=data['data'].data.length-1;i>=0;i--){
      if(data['data'].data[i].isDeleted==false)
      {
        this.notes.push(data['data'].data[i]);
        console.log(data['data'].data[i].id);
      }
     
      
    } 
    
    },
    error=>{
      console.log(error);
      
    });
 }
/*-------------------------------------------------------------------------------------------------------------------------------------*/


}

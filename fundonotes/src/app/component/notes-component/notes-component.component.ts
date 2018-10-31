import { Component, OnInit } from '@angular/core';
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
    this.getNotes();
  }

 /*-------------------------------------------------------------------------------------------------------------------------------------*/
 displayCard(event){
  if(event){
    this.getNotes();
    
  }   
 }
 /*-------------------------------------------------------------------------------------------------------------------------------------*/
  getNotes(){
  this._service.getDeleteNotes("notes/getNotesList",this.token)
  .subscribe(
    data=>{
      this.notes=[];
    console.log(data['data'].data);
    for(var i=data['data'].data.length-1;i>=0;i--){
      if(data['data'].data[i].isDeleted==false && data['data'].data[i].isArchived==false)
      {
        this.notes.push(data['data'].data[i]);
       
      }
     
      
    } 
    
    },
    error=>{
      console.log(error);
      
    });
 }
/*-------------------------------------------------------------------------------------------------------------------------------------*/


}

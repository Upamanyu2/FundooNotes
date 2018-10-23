import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
  public notes=[];
  private token;
  constructor(
    private _service : ServiceService,
  ) { }

  ngOnInit() {
    this.token=localStorage.getItem("token");
    this._service.getNotes("notes/getNotesList",this.token)
    .subscribe(
      data=>{
      console.log(data['data'].data);
      for(var i=0;i<data['data'].data.length;i++){
        this.notes.push(data['data'].data[i]);
      } 
      },
      error=>{
        console.log(error);
        
      }

    )
  }
  
 
}

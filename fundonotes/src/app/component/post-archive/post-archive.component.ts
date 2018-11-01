import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;

@Component({
  selector: 'app-post-archive',
  templateUrl: './post-archive.component.html',
  styleUrls: ['./post-archive.component.css']
})
export class PostArchiveComponent implements OnInit {
  private token=localStorage.getItem("token");
  @Input() 
  Noteid:any;
  constructor(private _service : ServiceService) { }
  @Output() ArchiveClicked = new EventEmitter<any>();
  ngOnInit() {
  }
postArchivedNotes(){
  // console.log(this.Noteid.id);
  let noteId=[];
  if(this.Noteid!=null && this.Noteid.noteLabels.length!=undefined){
    noteId.push(this.Noteid.id);
    this._service.postArchiveNotes("notes/archiveNotes",{
     "isArchived":true,
     "noteIdList":noteId
    },
    this.token)
    .subscribe(
      data=>{
      console.log(data);
      this.ArchiveClicked.emit(true);
      },
      error=>{
     console.log(error);
     
      }
    )
  }
  else{
    this.ArchiveClicked.emit(true);
  }
   
}
  

}

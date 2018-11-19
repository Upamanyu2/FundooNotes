import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';

@Component({
  selector: 'app-post-archive',
  templateUrl: './post-archive.component.html',
  styleUrls: ['./post-archive.component.scss']
})
export class PostArchiveComponent implements OnInit {
  @Output() ArchiveClicked = new EventEmitter<any>();
  @Input() Noteid:any;
  @Input() Archive:any;
  @Input() Delete:any;


  
  constructor(private _service : NotesServiceService) { }


  
  ngOnInit() {
   
  
  }


postArchivedNotes(flag){

  let noteId=[];
  if(this.Noteid!=null && this.Noteid.noteLabels.length!=undefined){
    noteId.push(this.Noteid.id);
    this._service.postArchive({
     "isArchived":flag,
     "noteIdList":noteId
    })
    .subscribe(
      data=>{
      
      this.ArchiveClicked.emit(true);
      },
      error=>{
   
     
      }
    )
  }
  else{
    this.ArchiveClicked.emit(true);
  }
   
}
  

}

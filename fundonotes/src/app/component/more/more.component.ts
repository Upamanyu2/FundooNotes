import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
/*-------------------------------------------------------------------------------------------------------------------------------------*/
export class MoreComponent implements OnInit {
  private token=localStorage.getItem("token");
  constructor(private _service : ServiceService) { }
/*-------------------------------------------------------------------------------------------------------------------------------------*/

@Input() 
Noteid:any;
@Output() DeleteClicked = new EventEmitter<any>(); // Event emitter for emitting the deleted arrray while it is getting posted.
/*-------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {
   
  }
/*-------------------------------------------------------------------------------------------------------------------------------------*/

  deleteNotes(){   //Delete post function.
    console.log(this.Noteid.id);

    let noteId=[]
    noteId.push(this.Noteid.id);
    this._service.postDeleteColorNotes("notes/trashNotes",{
     "isDeleted":true,
     "noteIdList":noteId
    },
    this.token)
    .subscribe(
      data=>{
      console.log(data);
      this.DeleteClicked.emit(true);
      },
      error=>{
     console.log(error);
     
      }
    )
  }

}
/*-------------------------------------------------------------------------------------------------------------------------------------*/
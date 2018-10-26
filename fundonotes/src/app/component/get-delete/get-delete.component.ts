import { Component, OnInit} from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;
@Component({
  selector: 'app-get-delete',
  templateUrl: './get-delete.component.html',
  styleUrls: ['./get-delete.component.css']
})
export class GetDeleteComponent implements OnInit {
  private token=localStorage.getItem("token");
  public notes=[];
  constructor(private _service : ServiceService) { }
 
  ngOnInit() {
    this.getDelete();
  }
  getDelete(){
    this._service.getDeleteNotes("/notes/getTrashNotesList",this.token)
    .subscribe(
      data=>{
       for(var i=data['data'].data.length-1;i>=0;i--){
         if( data['data'].data[i].isDeleted==true)
         {
           this.notes.push(data['data'].data[i]);
           console.log(data['data'].data[i].id);
         }
       } 
      },
      error=>{
        console.log(error);
      }
    )
   }
}

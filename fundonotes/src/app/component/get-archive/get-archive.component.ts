import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;
@Component({
  selector: 'app-get-archive',
  templateUrl: './get-archive.component.html',
  styleUrls: ['./get-archive.component.css']
})
export class GetArchiveComponent implements OnInit {
  private token=localStorage.getItem("token");
  public notes=[];
  constructor(private _service : ServiceService) { }
  
  ngOnInit() {
    this.getArchive();
  }
  getArchive(){
   this._service.getArchiveNotes("notes/getArchiveNotesList",this.token)
   .subscribe(
     data=>{
      for(var i=data['data'].data.length-1;i>=0;i--){
        if( data['data'].data[i].isArchived==true)
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

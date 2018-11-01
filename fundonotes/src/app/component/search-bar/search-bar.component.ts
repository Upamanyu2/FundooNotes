import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;
import { SearchServiceService }from '../../service/searchService/search-service.service'
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  public notes=[];
  public searched;
  private token:any =localStorage.getItem("token");
  constructor(private _service : ServiceService, public search:SearchServiceService) { }
 
  ngOnInit() {
    this.getNotes();
    this.search.currentMessage.subscribe(message=> this.searched = message)
  }


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
}

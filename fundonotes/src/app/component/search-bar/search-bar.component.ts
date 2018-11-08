import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';
import { SearchServiceService } from '../../core/service/searchService/search-service.service'
/*------------------------------------------------------------------------------------------- */
@Component({      //Injected dependency for component
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
/*------------------------------------------------------------------------------------------- */
export class SearchBarComponent implements OnInit { //Exported class
  public notes = [];
  public searched;
  private token: any = localStorage.getItem("token");
  constructor(private _service: NotesServiceService, public search: SearchServiceService) { }
  /*------------------------------------------------------------------------------------------- */
  ngOnInit() { //Injected dependency for reloading of page
    this.getNotes();
    this.search.currentMessage.subscribe(message => this.searched = message)
  }
  /*------------------------------------------------------------------------------------------- */

  getNotes() {  //Function for getting all the notes
    this._service.getNotes("notes/getNotesList", this.token)
      .subscribe(
        data => {
          this.notes = [];
          console.log(data['data'].data);
          for (var i = data['data'].data.length - 1; i >= 0; i--) {
            if (data['data'].data[i].isDeleted == false && data['data'].data[i].isArchived == false) {
              this.notes.push(data['data'].data[i]);

            }


          }

        },
        error => {
          console.log(error);

        });
  }
  /*------------------------------------------------------------------------------------------- */
}

import { Component, OnInit } from '@angular/core';//Importing all modules for adding dependencies
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing notes service
/*---------------------------------------------------------------------------------------- */
@Component({  //Injecting the component dependencies
  selector: 'app-get-delete',
  templateUrl: './get-delete.component.html',
  styleUrls: ['./get-delete.component.scss']
})
/*---------------------------------------------------------------------------------------- */
export class GetDeleteComponent implements OnInit { //Exported class
  private token = localStorage.getItem("token");
  public notes = [];
  constructor(private _service: NotesServiceService) { }
/*---------------------------------------------------------------------------------------- */
  ngOnInit() {  
    this.getDelete();
  }
/*---------------------------------------------------------------------------------------- */
  getDelete() {  //Function for getting all the deleted notes
    this._service.getNotes("/notes/getTrashNotesList", this.token)
      .subscribe(
        data => {
          this.notes = []
          for (var i = data['data'].data.length - 1; i >= 0; i--) {
            if (data['data'].data[i].isDeleted == true && data['data'].data[i].isArchived == false) {
              this.notes.push(data['data'].data[i]);
              console.log(data['data'].data[i].id);
            }
          }
        },
        error => {
          console.log(error);
        }
      )
  }

/*---------------------------------------------------------------------------------------- */
  refresh(event) {  //Function for handling all the events
    if (event = true) {
      this.getDelete();
    }
  }
/*---------------------------------------------------------------------------------------- */

}

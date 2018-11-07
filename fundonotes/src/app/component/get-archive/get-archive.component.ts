import { Component, OnInit } from '@angular/core';  //Importing for injecting all the dependencies.
import { NotesServiceService } from '../../service/notes/notes-service.service'; //Importing the service file for using the get archive api.
/*------------------------------------------------------------------------------------------------------------------------ */
@Component({         //Injection of component dependencies
  selector: 'app-get-archive',
  templateUrl: './get-archive.component.html',
  styleUrls: ['./get-archive.component.css']
})
/*------------------------------------------------------------------------------------------------------------------------ */
export class GetArchiveComponent implements OnInit {  //Exporting all the functionalities to use it in the while the initilisation of the page.
  private token = localStorage.getItem("token");
  public notes = [];
  constructor(private _service: NotesServiceService) { }
  /*------------------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {   //Initialisation function to called while the page is reloaded.
    this.getArchive();
  }
  /*------------------------------------------------------------------------------------------------------------------------ */
  getArchive() {  //Function for calling the get api.

    this._service.getNotes("notes/getArchiveNotesList", this.token)
      .subscribe(
        data => {
          this.notes = []
          for (var i = data['data'].data.length - 1; i >= 0; i--) {
            if (data['data'].data[i].isArchived == true && data['data'].data[i].isDeleted == false) {
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
  /*------------------------------------------------------------------------------------------------------------------------ */
  refresh(event) {    //Function for handling all the event emitters catched
    if (event == true) {
      this.getArchive();
    }
    console.log(event)
  }
  /*------------------------------------------------------------------------------------------------------------------------ */


}

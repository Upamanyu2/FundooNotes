import { Component, OnInit } from '@angular/core';  //Importing all functions for injecting the dependencies
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing notes service

@Component({  //Dependency injection for component
  selector: 'app-notes-component',
  templateUrl: './notes-component.component.html',
  styleUrls: ['./notes-component.component.scss'],

})

/*-------------------------------------------------------------------------------------------------------------------------------------*/
export class NotesComponentComponent implements OnInit {    //Exported class

  constructor(private _service: NotesServiceService) { }

  public notes = [];
  private token;
  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {
    this.token = localStorage.getItem("token");
    this.getNotes();
  }

  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  displayCard(event) { //Function for handling the events emitted
    if (event) {
      this.getNotes();

    }
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  getNotes() {     //Function for getting all theb notes
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
  /*-------------------------------------------------------------------------------------------------------------------------------------*/


}

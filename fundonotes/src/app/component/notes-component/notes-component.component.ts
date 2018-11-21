import { Component, OnInit } from '@angular/core';  //Importing all functions for injecting the dependencies
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing notes service
import { Note } from '../../core/model/notes/note';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
/*---------------------------------------------------------------------------------------------------------------- */
@Component({  //Dependency injection for component
  selector: 'app-notes-component',
  templateUrl: './notes-component.component.html',
  styleUrls: ['./notes-component.component.scss'],

})

/*-------------------------------------------------------------------------------------------------------------------------------------*/
export class NotesComponentComponent implements OnInit {    //Exported class
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private notes: Note[] = [];
  private pinArray: Note[] = [];
  /*----------------------------------------------------------------------------------------------------------- */

  constructor(private _service: NotesServiceService) { }

  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {

    this.getNotes();
    this.getPinnedNotes();

  }
  onNewEntryAdded(event: Note) {
    this.notes.splice(0, 0, event)
  }

  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  displayCard(event) { //Function for handling the events emitted
    if (event) {
      this.getNotes();
      this.getPinnedNotes();
    }
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  getNotes() {     //Function for getting all the notes

    this._service.getNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.notes = [];
          let myData: Note[] = data['data']['data'];
          for (var i = myData.length - 1; i >= 0; i--) {
            if (myData[i].isDeleted == false && myData[i].isArchived == false && myData[i].isPined == false) {
              this.notes.push(myData[i]);

            }


          }

        },
        error => {


        });
  }

  getPinnedNotes() {
    this._service.getNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.pinArray = [];
          var myData: Note[] = data['data']['data'];
          for (var i = myData.length - 1; i >= 0; i--) {
            if (myData[i].isDeleted == false && myData[i].isArchived == false && myData[i].isPined == true) {
              this.pinArray.push(myData[i]);
            }

          }
        },
        error => {

        }
      )

  }



  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

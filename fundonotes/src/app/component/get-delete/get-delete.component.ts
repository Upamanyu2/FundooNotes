import { Component, OnInit } from '@angular/core';//Importing all modules for adding dependencies
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing notes service
import { Note } from '../../core/model/notes/note';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
/*---------------------------------------------------------------------------------------- */
@Component({  //Injecting the component dependencies
  selector: 'app-get-delete',
  templateUrl: './get-delete.component.html',
  styleUrls: ['./get-delete.component.scss']
})
/*---------------------------------------------------------------------------------------- */
export class GetDeleteComponent implements OnInit { //Exported class
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private notes: Note[] = [];
  constructor(private _service: NotesServiceService) { }
  /*---------------------------------------------------------------------------------------- */
  ngOnInit() {
    this.getDelete();
  }
  /*---------------------------------------------------------------------------------------- */
  getDelete() {  //Function for getting all the deleted notes
    this._service.getTrashNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.notes = []
          let myData: Note[] = data['data']['data'];
          for (var i = myData.length - 1; i >= 0; i--) {
            if (myData[i].isDeleted == true && myData[i].isArchived == false) {
              this.notes.push(myData[i]);

            }
          }
        },
        error => {

        }
      )
  }

  /*---------------------------------------------------------------------------------------- */
  refresh(event) {  //Function for handling all the events
    if (event == true) {
      // this.getDelete();
    }
  }
  /*---------------------------------------------------------------------------------------- */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

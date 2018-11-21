import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';//Import all the classes for dependency injection
import { MatDialog } from '@angular/material';//Importing the matdialog
import { EditComponent } from '../edit/edit.component'//Importing edit component
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing the service file for calling the post api.
import { SearchServiceService } from 'src/app/core/service/dataService/searchService/search-service.service';//Importing search service
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
/*-------------------------------------------------------------------------------------------------------------------------------------- */

@Component({ //Importing dependency injection of component
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
/*-------------------------------------------------------------------------------------------------------------------------------------- */
export class NoteCardComponent implements OnInit {// Exported class
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private modifiedCheckList;
  todayDate = new Date();
  private tomorrowDate = new Date();
  flexValueListCard1 = 5;
  flexValueListCard2 = 95;
  constructor(
    private dialog: MatDialog,
    private data: SearchServiceService,
    private service: NotesServiceService
  ) { }

  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  @Output() refreshClicked = new EventEmitter<any>();//Output decorator and event emitter for color change archive and delete operation.
  @Output() updateCard = new EventEmitter<any>(); //Output decorator and event emitter for updated card array.
  @Input() notesListArray: any;
  @Input() searchData;
  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  ngOnInit() {
    this.view();
    this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);

  }
  toggle = false;
  view() {
    this.data.currentView
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        this.toggle = message
      })
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  openDialog(data): void {         // Function taking the data of the dialogue box
    const dialogRef = this.dialog.open(EditComponent, {
      width: '700px',
      data: data
    });
    dialogRef.afterClosed().
      pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log('The dialog was closed');
        this.updateCard.emit(true);    //Updated card emitting here

      });
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------- */

  refresh(event) {                //Refresh function for the emitted event(delete, archive and color changing of the card)
    this.refreshClicked.emit(event);   //emitting to the parent component.
    this.updateCard.emit(event); //To make the parent known about the model box openDialog function has successfully occured.

  }
  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  checkBox(checkList, note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedCheckList = checkList;
    this.updatelist(note.id);
  }
/*-------------------------------------------------------------------------------------------------------------------------------------- */
  updatelist(id) {
    var apiData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }

    this.service.updateCheckList(id, this.modifiedCheckList.id, apiData)
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      console.log(response);

    })
  }

/*-------------------------------------------------------------------------------------------------------------------------------------- */
  private reminderBody = {};

  removeReminder(id) {
    this.reminderBody = {
      "noteIdList": [id]
    }
    this.service.removeReminderPost(this.reminderBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.updateCard.emit(true);
    })


  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

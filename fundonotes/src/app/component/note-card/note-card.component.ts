import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';//Import all the classes for dependency injection
import { MatDialog } from '@angular/material';//Importing the matdialog
import { EditComponent } from '../edit/edit.component'//Importing edit component
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing the service file for calling the post api.
import { SearchServiceService } from 'src/app/core/service/dataService/searchService/search-service.service';//Importing search service
/*-------------------------------------------------------------------------------------------------------------------------------------- */

@Component({ //Importing dependency injection of component
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
/*-------------------------------------------------------------------------------------------------------------------------------------- */
export class NoteCardComponent implements OnInit {// Exported class
  public modifiedCheckList;
  public todayDate=new Date();
  public tomorrowDate=new Date();
  flexValueListCard1=5;
  flexValueListCard2=95;
  constructor(
    public dialog: MatDialog,
    private data: SearchServiceService,
    private service : NotesServiceService
  ) { }

  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  @Output() refreshClicked = new EventEmitter<any>();//Output decorator and event emitter for color change archive and delete operation.
  @Output() updateCard = new EventEmitter<any>(); //Output decorator and event emitter for updated card array.
  @Input() notesListArray: any;
  @Input() searchData;
  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  ngOnInit() {
    this.view();
    this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);
    
  }
  toggle = false;
  view() {
    this.data.currentView.subscribe(message => {
      this.toggle = message
    })
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  openDialog(data): void {         // Function taking the data of the dialogue box
    const dialogRef = this.dialog.open(EditComponent, {
      width: '700px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
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

  updatelist(id) {
    var apiData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
    var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
    this.service.postNotes(url, JSON.stringify(apiData), localStorage.getItem('token')).subscribe(response => {
      console.log(response);

    })
  }

public reminderBody={};

  removeReminder(id){
    this.reminderBody={
      "noteIdList":[id]
    }
    this.service.postNotes('notes/removeReminderNotes',this.reminderBody,localStorage.getItem('token')).subscribe(result=>{
      this.updateCard.emit(true); 
    })


  }
}

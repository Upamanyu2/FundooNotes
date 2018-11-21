import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core'; //Importing the (inject is used for injecting the avlues to the modal box) output input and the event emitter for connecting child to parent.
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; //Importing all the dialogue box requirements
import { NoteCardComponent } from '../note-card/note-card.component'; //Note card component is imported to link the edit component and note component.
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Http service file is imported.
import { SearchServiceService } from '../../core/service/dataService/searchService/search-service.service'
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators'

/*------------------------------------------------------------------------------------------------------------------------- */

@Component({ //Injecting component dependency
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
/*------------------------------------------------------------------------------------------------------------ */
export class EditComponent implements OnInit { //Export class to export all the functionalities while initialisation of the page.
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private modifiedCheckList;
  private description;
  private title;
  private click: boolean = false;
  bgColor = this.data.color;
  private data1;
  adding;
  isChecked;
  private status = "open";
  private addCheck;
  private checkListItemArray = [];
  private removedList;
  private reminderBody = {};
  private reminderArray = [];
  private pinClick = this.data.isPined;
  /*------------------------------------------------------------------------------------------------------------ */
  constructor(
    private _service: NotesServiceService, //Service file reference is made.
    private service: SearchServiceService,
    public dialogRef: MatDialogRef<NoteCardComponent>, //Reference for dialogue box reference is being made.

    @Inject(MAT_DIALOG_DATA) public data: any,  //Used for injecting the datas received by the modal box from the note-card.
  ) { }
  @Output() ColorClicked = new EventEmitter<any>(); //Output decorator used for emitting the function for color being picked with the click function.
  @Output() UpdatingCard = new EventEmitter<any>();
  @Output() ReminderEmit = new EventEmitter<any>();
  /*------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
    this.checkListItemArray = this.data.noteCheckLists;

    this.reminderArray.push(this.data.reminder);

  }


  /*------------------------------------------------------------------------------------------------------------ */
  onNoClick(): void {        //Function for closing the dialogue or modal box when the datas are contained.
    this.dialogRef.close();
  }

  toggle() {
    this.click = true;
  }

  /*------------------------------------------------------------------------------------------------------------ */
  updatecard(check) {    //Update card post function is occuring to send the updated card details

    if (this.click == false && check == true) {

      this.title = document.getElementById("title").innerHTML;  //Used to bind the updated div data.
      this.description = document.getElementById("description").innerHTML; //Used to bind the updated div data.
      var body = {
        "noteId": this.data.id,
        "title": this.title,
        "description": this.description
      }
      this._service.postEditNotes(body)  //Update card service is called to call the post api.
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {  //On success

            this.UpdatingCard.emit(true);
          },
          error => { //On faliure (of api calling)


          }
        )
    }

    else {
      return;
    }
  }



  pined() {
    this.pinClick = !this.pinClick;
    if (this.data.isPined == true) {
      this.pinClick = false;


      if (this.data.isPined == false) {
        this.pinClick = true;

      }
    }
    let noteid = []
    noteid.push(this.data.id)
    let body = {
      "isPined": this.pinClick,
      "noteIdList": noteid
    }
    this._service.postPin(body).pipe(takeUntil(this.destroy$))
    .subscribe(result => {
    },
      error => {

      })
   

     
  }






  /*------------------------------------------------------------------------------------------------------------ */

  checkBox(checkList, note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }

    this.modifiedCheckList = checkList;
    this.updatelist(note.id);
  }
  /*------------------------------------------------------------------------------------------------------------ */
  updatelist(id) {

    var apiData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }

    this._service.postUpdatedNotes(id, this.modifiedCheckList.id, JSON.stringify(apiData)).subscribe(response => {

    });
  }


  editCard(event, checklist) {

    if (event.isTrusted == true) {
      this.modifiedCheckList = checklist;
    }
    this.updatelist(this.data.id)
  }




  /*------------------------------------------------------------------------------------------------------------ */

  onEnter(event) {

    if (this.data1 != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
    this.isChecked = this.addCheck
    if (event.code == "Enter") {
      if (this.data.isChecked == true && this.data1 != null) {
        this.status = "close"
      } else {
        this.status = "open";
      }

      var obj = {
        "itemName": this.data1,
        "isChecked": this.status
      }


      this._service.editNotes(this.data.id, obj).subscribe(response => {

        this.data1 = null;
        this.adding = false;
        this.isChecked = false;
        this.addCheck = false;

        this.checkListItemArray.push(response["data"].details);

      });


    }
  }




  /*------------------------------------------------------------------------------------------------------------ */

  onDelete(checklist) {
    this.removedList = checklist;

    this.deleteList()

  }
  deleteList() {
    this._service.deleteCheckList(this.data.id, this.removedList.id, {})
      .subscribe(response => {

        for (let i = 0; i < this.checkListItemArray.length; i++) {
          if (this.checkListItemArray[i].id == this.removedList.id) {

            this.checkListItemArray.splice(i, 1);
          }

        }

      });
  }



  /*------------------------------------------------------------------------------------------------------------ */

  removeReminder(id) {
    this.reminderBody = {
      "noteIdList": [id]
    }
    this._service.postRemoveReminder(this.reminderBody).subscribe(result => {

      for (let i = 0; i < this.reminderArray.length; i++) {

        if (this.data.reminder == this.reminderArray[i]) {

          this.reminderArray.splice(i, 1)
        }
      }
    })


  }
  /*------------------------------------------------------------------------------------------------------------ */
  refresh(event) {                //Refresh function for the emitted event(delete, archive and color changing of the card)

    this.ColorClicked.emit();
    this.bgColor = event;

  }

  archive(event) {                 //Function called while archive function is called in the archiveclicked emitter.
    this.dialogRef.close();
  }

  delete(event) {                 //Function called while archive function is called in the archiveclicked emitter.
    this.dialogRef.close();
  }
  reminderEvent(event) {
    if (event.status) {
      this.reminderArray = [];
      this.reminderArray.push(event.details.reminder);
    }
  }
  /*------------------------------------------------------------------------------------------------------------ */

  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }

}
import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core'; //Importing the (inject is used for injecting the avlues to the modal box) output input and the event emitter for connecting child to parent.
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; //Importing all the dialogue box requirements
import { NoteCardComponent } from '../note-card/note-card.component'; //Note card component is imported to link the edit component and note component.
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Http service file is imported.

@Component({ //Injecting component dependency
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
/*------------------------------------------------------------------------------------------------------------ */
export class EditComponent implements OnInit { //Export class to export all the functionalities while initialisation of the page.
  public modifiedCheckList;
  public description;
  public title;
  public click: boolean = false;
  constructor(
    private _service: NotesServiceService, //Service file reference is made.
    public dialogRef: MatDialogRef<NoteCardComponent>, //Reference for dialogue box reference is being made.

    @Inject(MAT_DIALOG_DATA) public data: any,  //Used for injecting the datas received by the modal box from the note-card.
  ) { }
  @Output() ColorClicked = new EventEmitter<any>(); //Output decorator used for emitting the function for color being picked with the click function.
  @Output() UpdatingCard = new EventEmitter<any>();
  /*------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
  }
  public bgColor = this.data.color;

  /*------------------------------------------------------------------------------------------------------------ */
  onNoClick(): void {        //Function for closing the dialogue or modal box when the datas are contained.
    this.dialogRef.close();
  }

  toggle() {
    this.click = true;
  }
  toggle1() {

  }

  /*------------------------------------------------------------------------------------------------------------ */
  updatecard(check) {    //Update card post function is occuring to send the updated card details
    console.log(check)
    if (this.click == false && check == true) {
      console.log("update card api")
      this.title = document.getElementById("title").innerHTML;  //Used to bind the updated div data.
      this.description = document.getElementById("description").innerHTML; //Used to bind the updated div data.
      var token = localStorage.getItem('token');
      var body = {
        "noteId": this.data.id,
        "title": this.title,
        "description": this.description
      }
      this._service.postNotes('notes/updateNotes', body, token)  //Update card service is called to call the post api.
        .subscribe(
          data => {  //On success
            console.log(data);
            this.UpdatingCard.emit(true);
          },
          error => { //On faliure (of api calling)
            console.log(error);

          }
        )
    }


    else {
      return;
    }
  }



  checkBox(checkList, note) {
    console.log(checkList)
    console.log(note)
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
    this._service.postNotes(url, JSON.stringify(apiData), localStorage.getItem('token')).subscribe(response => {
      console.log(response);

    })
  }
  public data1;
  public adding;
  public isChecked;
  public i;
  public addCheck;
  public dataArray=[];

  onEnter(event) {
    if (this.data1 != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
    this.i++;
    this.isChecked = this.addCheck
    if (this.data1 != null && event.code == "Enter") {

      var obj = {
        "index": this.i,
        "data": this.data1,
        "isChecked": this.isChecked
      }
      this.dataArray.push(obj)

      this.data1 = null;
      this.adding = false;
      this.isChecked = false;
      this.addCheck = false;
    }
  }

  /*------------------------------------------------------------------------------------------------------------ */
  refresh(event) {                //Refresh function for the emitted event(delete, archive and color changing of the card)
    console.log(event);
    this.ColorClicked.emit();
    this.bgColor = event;
  }

  archive(event) {                 //Function called while archive function is called in the archiveclicked emitter.
    this.dialogRef.close();
  }

  delete(event) {                 //Function called while archive function is called in the archiveclicked emitter.
    this.dialogRef.close();
  }
  /*------------------------------------------------------------------------------------------------------------ */
}
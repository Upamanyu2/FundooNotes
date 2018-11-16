import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';//Importing the output input and the event emitter for connecting child to parent.
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing the service file for calling the post api.
import { MatSnackBar } from '@angular/material';//Importing properties of snackbar.
import { LoggerServiceService } from '../../core/service/logger/logger-service.service';
/*----------------------------------------------------------------------------------------------------------- */

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss'],
  outputs: ['closeClicked']
})

/*----------------------------------------------------------------------------------------------------------- */
export class AddNotesComponent implements OnInit {  //Export class top export all the functionalities.
  private token;
  public notes = [];
  public pin: boolean = false;
  public check: boolean = false;
  public click: boolean = false;
  public bgColor = "#ffffff";
  public isArchived = false;
  public LabelObj = []
  public LabelObjId = []
  public dataArray = [];
  public dataArrayApi = [];
  public status;
  public body = {};
  public title;
  public data;
  public adding;
  public x = 0;
  public isChecked = false;
  public addCheck;
  public description;
  public apiObj = {};
  public reminderBody = {};
  public reminderArray = [];
  public showCheckbox = true;
  public hideCheckbox;
  /*----------------------------------------------------------------------------------------------------------- */
  constructor(
    private _service: NotesServiceService, //Service file reference is made in the constructor to use it.
    public snackBar: MatSnackBar
  ) { }
  /*----------------------------------------------------------------------------------------------------------- */
  @Output() closeClicked = new EventEmitter<any>(); //Outputting the post function event while the close click is clicked.
  @Output() ArchiveClicked = new EventEmitter<any>(); //Output decorator used for emitting the function for color being picked with the click function.
  @Input() notesListArray: any

  /*----------------------------------------------------------------------------------------------------------- */
  ngOnInit() {     //Initialisation function to called while the page is reloaded.
    this.token = localStorage.getItem("token");

  }
  public pinned() {     //Function used for sending the true and false values while the pin is pressed.
    this.pin = !this.pin;


  }


  /*----------------------------------------------------------------------------------------------------------- */


  public addNotes() {             //Used for posting the notes being added.

    this.title = document.getElementById("title").innerHTML;
    let changecolor = this.bgColor;
    this.bgColor = '#ffffff';
    if (this.click == true) {
      this.description = document.getElementById("description").innerHTML;




      if (this.description == "" && this.title == "") {   //For preventing the api call while the two filds are left empty.
        this.reminderArray = [];
        this.LabelObj = [];
        return;
      }

      this._service.addNotes("notes/addNotes", {   //Service file addnotes post api is called with all the parameters.
        'title': this.title,
        'description': this.description,
        'isPined': this.pin,
        'color': changecolor,
        'isArchived': this.isArchived,
        'labelIdList': JSON.stringify(this.LabelObjId),
        'reminder': this.reminderArray
      }, this.token)

        .subscribe(
          data => {    //On success.

            this.closeClicked.emit(true);
            this.LabelObj = [];
            this.reminderArray = [];

          },
          error => {  //On failure of api call.
            this.reminderArray = [];
            this.LabelObj = [];
          });
    }


    // let changecolor = this.bgColor;
    // this.bgColor = '#ffffff';
    else if (this.click == false) {
      for (var i = 0; i < this.dataArray.length; i++) {
        if (this.dataArray[i].isChecked == true) {
          this.status = "close"

        }
        else {

          this.status = "open"

        }
        this.apiObj = {
          "itemName": this.dataArray[i].data,
          "status": this.status
        }

        this.dataArrayApi.push(this.apiObj)

      }
      if (this.title == "") {
        this.dataArray = [];
        this.dataArrayApi = [];
        this.LabelObj = [];
        this.reminderArray = [];
      }

      this.body = {
        "title": this.title,
        "checklist": JSON.stringify(this.dataArrayApi),
        "isPined": this.pin,
        "color": changecolor,
        "isArchived": this.isArchived,
        "labelIdList": JSON.stringify(this.LabelObjId),
        'reminder': this.reminderArray
      }
    }
    if (this.title != "") {
      this._service.addNotes("notes/addNotes", this.body, this.token)
        .subscribe(response => {
          this.click == false;
          this.LabelObj = []
          this.reminderArray = []
          this.dataArray = [];
          this.dataArrayApi = [];
          //emitting an event when the note is added
          this.closeClicked.emit(true);
        }, error => {
          this.click == false;
          this.LabelObj = []
          this.reminderArray = []
          this.dataArray = [];
          this.dataArrayApi = [];

        })
    }
  }


  /*----------------------------------------------------------------------------------------------------------- */
  onEnter(event) {        //Function working for pushing in checklist array(dataArray).
    if (this.data != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
    this.x++;
    this.isChecked = this.addCheck
    if (this.data != null && event.code == "Enter") {

      var obj = {
        "index": this.x,
        "data": this.data,
        "isChecked": this.isChecked
      }
      this.dataArray.push(obj)

      this.data = null;
      this.adding = false;
      this.isChecked = false;
      this.addCheck = false;
    }
  }
  /*----------------------------------------------------------------------------------------------------------- */
  // onCheck(){
  //   for (let i = 0; i < this.dataArray.length; i++) {
  //     if (this.dataArray[i].isChecked == true) {
  //       this.status = "close"
  //     }
  //     else{
  //       this.status="open"
  //     }
  //     this.apiObj = {
  //       "itemName": this.dataArray[i].data,
  //       "status": this.status
  //     }
  //     // if (this.dataArray[i].isChecked == false || this.dataArray[i].isChecked == undefined) {
  //     //   this.status = "open"
  //     // }

  //   }
  // }
  /*----------------------------------------------------------------------------------------------------------- */
  onDelete(dataFromArray) {         // Function to delete from the checklist array.

    for (let i = 0; i < this.dataArray.length; i++) {
      if (this.dataArray[i].index == dataFromArray.index)
        this.dataArray.splice(i, 1)
    }
  }

  removeReminder() {
    this.reminderArray.pop()


  }

  /*----------------------------------------------------------------------------------------------------------- */
  public toggle1() {         //Function for toggling the click variable
    this.click = false;
    // this.click = false;

  }
  public toggle2() {
    this.click = true;
    // this.click = false;

  }


  public toggle() {        //Toggling function for toggling the checklist view
    this.check = !this.check


  }
  public toggle3() {

  }


  /*----------------------------------------------------------------------------------------------------------- */
  refresh(event) {                //Refresh function for the emitted event(delete, archive and color changing of the card)

    this.bgColor = event;

  }



  archive(event) {                 //Function called while archive function is called in the archiveclicked emitter.
    this.isArchived = event;
    this.ArchiveClicked.emit();

    this.addNotes();
    this.snackBar.open("Please add something first", "", {
      duration: 2000
    })
  }


  labels(event) {                   //Function for receiving all the datas of from the child more component

    if (event.status == undefined || event.status == false) {

      this.LabelObj.push(event.labelObject)
      this.LabelObjId.push(event.labelObject.id);


    }
    else if (event.status == true) {

      for (let i = 0; i < this.LabelObj.length; i++) {
        if (this.LabelObj[i].id == event.labelObject.id) {


          this.LabelObj.splice(i, 1)
          this.LabelObjId.splice(i, 1)

        }

      }


    }


  }
  reminderEvent(event) {

    if (event.status == true) {
      this.reminderArray = [];
      this.reminderArray.push(event.details);
    }
  }
  
  toggleCheckbox(event) {
    // this.click==event
    // LoggerServiceService.data(this.click)
    if (event == false) {
      this.showCheckbox = event
      this.hideCheckbox = !event;
      // console.log(this.showCheckbox)
      // console.log(this.hideCheckbox)

    }
    else {
      this.showCheckbox = event
      this.hideCheckbox = !event;
      // console.log(this.showCheckbox)
      // console.log(this.hideCheckbox)
    }
  }
  /*----------------------------------------------------------------------------------------------------------- */



}

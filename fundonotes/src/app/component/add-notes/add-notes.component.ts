import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';//Importing the output input and the event emitter for connecting child to parent.
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing the service file for calling the post api.
import { MatSnackBar } from '@angular/material';//Importing properties of snackbar.
// import { LoggerServiceService } from '../../core/service/logger/logger-service.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CollaboratorService } from "../../core/service/http/collaborator/collaborator.service";
// import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
// import { JsonPipe } from '@angular/common';
/*----------------------------------------------------------------------------------------------------------- */

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss'],
  outputs: ['closeClicked']
})

/*----------------------------------------------------------------------------------------------------------- */
export class AddNotesComponent implements OnInit {  //Export class top export all the functionalities.
  private destroy$: Subject<boolean> = new Subject<boolean>();
  tempTitle: string;
  tempDescription: string;
  showSave = false;
  notes = [];
  userArray = [];
  receiverArray = [];
  receiverArray1 = []
  private collaboratorShow = false;
  private pin: boolean = false;
  private check: boolean = false;
  private click: boolean = false;
  private bgColor = "#ffffff";
  private isArchived = false;
  private LabelObj = []
  private LabelObjId = []
  private dataArray = [];
  private dataArrayApi = [];
  private status;
  private body = {};
  private title;
  private data;
  adding;
  private x = 0;
  private isChecked = false;
  private addCheck;
  private description;
  private apiObj = {};
  reminderBody = {};
  private reminderArray = [];
  showCheckbox = true;
  hideCheckbox;
  /*----------------------------------------------------------------------------------------------------------- */
  constructor(
    private _service: NotesServiceService, //Service file reference is made in the constructor to use it.
    private service: CollaboratorService,
    private snackBar: MatSnackBar,

  ) { }
  /*----------------------------------------------------------------------------------------------------------- */
  @Output() closeClicked = new EventEmitter<any>(); //Outputting the post function event while the close click is clicked.
  @Output() ArchiveClicked = new EventEmitter<any>(); //Output decorator used for emitting the function for color being picked with the click function.
  @Input() notesListArray: any
  @Output() notesAddedEmit = new EventEmitter<any>();
  /*----------------------------------------------------------------------------------------------------------- */
  ngOnInit() {     //Initialisation function to called while the page is reloaded.

  }
  public pinned() {     //Function used for sending the true and false values while the pin is pressed.
    this.pin = !this.pin;


  }
  img = environment.baseUrl1 + localStorage.getItem("imageUrl");
  email = localStorage.getItem("userName");
  firstName = localStorage.getItem("FirstName")
  lastName = localStorage.getItem("LastName")

  /*----------------------------------------------------------------------------------------------------------- */

  searchUsers(searchValue) {
    this.body = {
      "searchWord": searchValue
    }
    if (searchValue != "") {
      this.service.searchUserCollabService(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this.userArray = [];
          this.userArray = (result['data'].details);
        },
          error => {

          })
    }
    else {
      return
    }

  }

  saveUsers(users) {
    this.showSave = true;
    this.receiverArray1.push(users);
  }

  addUser() {
    this.showSave = false;
    this.receiverArray.push(this.receiverArray1[0]);
    this.receiverArray1 = []


  }

  removeUsers(users) {
    for (let i = 0; i < this.receiverArray.length; i++) {
      if (users.userId == this.receiverArray[i].userId) {
        this.receiverArray.splice(i, 1);
        this.receiverArray1.splice(i, 1);
      }
    }

  }




  /*-------------------------------------------------------------------------------------------------------------------- */
  public addNotes() {             //Used for posting the notes being added.

    this.title = document.getElementById("title").innerHTML;
    let changecolor = this.bgColor;
    this.bgColor = '#ffffff';
    if (this.click == true) {
      this.description = document.getElementById("description").innerHTML;




      if (this.description == "" && this.title == "") {   //For preventing the api call while the two filds are left empty.
        this.reminderArray = [];
        this.LabelObj = [];
        this.receiverArray = []
        this.pin = false
        return;
      }

      this._service.addNotes({   //Service file addnotes post api is called with all the parameters.
        'title': this.title,
        'description': this.description,
        'isPined': this.pin,
        'color': changecolor,
        'isArchived': this.isArchived,
        'labelIdList': JSON.stringify(this.LabelObjId),
        'reminder': this.reminderArray,
        'collaberators': JSON.stringify(this.receiverArray)
      })

        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {    //On success.
            this.notesAddedEmit.emit(data['status'].details)
            this.pin = false
            this.closeClicked.emit(true);
            this.LabelObj = [];
            this.reminderArray = [];
            this.receiverArray = []
            this.tempTitle = null;
            this.tempDescription = null;

          },
          error => {  //On failure of api call.
            this.reminderArray = [];
            this.LabelObj = [];
            this.receiverArray = [];
            throw new Error("Internal server error");
          });
    }



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
        this.pin = false
        this.dataArray = [];
        this.dataArrayApi = [];
        this.LabelObj = [];
        this.reminderArray = [];
        this.receiverArray = []
      }

      this.body = {
        "title": this.title,
        "checklist": JSON.stringify(this.dataArrayApi),
        "isPined": this.pin,
        "color": changecolor,
        "isArchived": this.isArchived,
        "labelIdList": JSON.stringify(this.LabelObjId),
        'reminder': this.reminderArray,
        'collaberators': JSON.stringify(this.receiverArray)
      }
    }
    if (this.title != "") {
      this._service.addNotes(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(response => {
          this.pin = false
          this.click = false;
          this.LabelObj = []
          this.reminderArray = []
          this.dataArray = [];
          this.dataArrayApi = [];
          this.receiverArray = []
          //emitting an event when the note is added
          this.closeClicked.emit(true);
        }, error => {
          this.click = false;
          this.LabelObj = [];
          this.reminderArray = []
          this.dataArray = [];
          this.dataArrayApi = [];
          this.receiverArray = [];
          throw new Error(error);
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
  collaboratorShowHide() {
    this.collaboratorShow = !this.collaboratorShow;


  }
  collaboratorDetails() {
    this.tempTitle = document.getElementById("title").innerText;
    if (this.click == false) {
      this.tempDescription = document.getElementById("description").innerText;
    }
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

    if (event == false) {
      this.showCheckbox = event
      this.hideCheckbox = !event;


    }
    else {
      this.showCheckbox = event
      this.hideCheckbox = !event;

    }
  }
  /*----------------------------------------------------------------------------------------------------------- */

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

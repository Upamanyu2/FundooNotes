import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';//Importing the output input and the event emitter for connecting child to parent.
import { NotesServiceService } from '../../service/notes/notes-service.service';//Importing the service file for calling the post api.
import { MatSnackBar } from '@angular/material';//Importing properties of snackbar.

/*----------------------------------------------------------------------------------------------------------- */

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css'],
  outputs: ['closeClicked']
})

/*----------------------------------------------------------------------------------------------------------- */
export class AddNotesComponent implements OnInit {  //Export class top export all the functionalities.
  private token;
  public notes = [];
  public pin: boolean = false;
  public checkListCard: boolean = false;
  public bgColor = "#ffffff";
  public isArchived = false;
  public LabelObj = []
  public LabelName = []
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
    this.LabelName = [];
    this.LabelObj = [];
  }
  public pinned() {     //Function used for sending the true and false values while the pin is pressed.
    this.pin = !this.pin;
    console.log(this.pin);

  }


  /*----------------------------------------------------------------------------------------------------------- */


  public addNotes() {             //Used for posting the notes being added.

    let changecolor = this.bgColor;
    this.bgColor = '#ffffff';
    let title = document.getElementById("title").innerHTML;
    let description = document.getElementById("description").innerHTML;




    if (description == "" && title == "") {   //For preventing the api call while the two filds are left empty.
      this.LabelName = [];
      this.LabelObj = [];
      return;
    }

    this._service.addNotes("notes/addNotes", {   //Service file addnotes post api is called with all the parameters.
      'title': title,
      'description': description,
      'isPined': this.pin,
      'color': changecolor,
      'isArchived': this.isArchived,
      'labelIdList': JSON.stringify(this.LabelObj)
    }, this.token)

      .subscribe(
        data => {    //On success.
          console.log("POST Request is successful ", data);
          this.closeClicked.emit(true);
          this.LabelObj = [];
          this.LabelName = [];
        },
        error => {  //On failure of api call.
          console.log("Error", error);
          this.LabelName = [];
          this.LabelObj = [];
        });

  }



  

  public toggle() {        //Toogling function for toggling the checklist view
    this.checkListCard = !this.checkListCard;
  }



  /*----------------------------------------------------------------------------------------------------------- */
  refresh(event) {                //Refresh function for the emitted event(delete, archive and color changing of the card)
    console.log(event);
    this.bgColor = event;

  }



  archive(event) {                 //Function called while archive function is called in the archiveclicked emitter.
    this.isArchived = event;
    this.ArchiveClicked.emit();
    console.log(event);
    this.addNotes();
    this.snackBar.open("Note is archived successfully", "", {
      duration: 2000
    })
  }


  labels(event) {                   //Function for receiving all the datas of from the child more component
    if (event.status == undefined || event.status == false) {
      this.LabelObj.push(event.labelObject.id)
      this.LabelName.push(event.labelObject.label)
    }
    else if (event.status == true) {
      this.LabelObj.pop()
      this.LabelName.pop()
    }
  }
  /*----------------------------------------------------------------------------------------------------------- */



}

import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';//Importing the output input and the event emitter for connecting child to parent.
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing the service file for calling the post api.
import { MatSnackBar } from '@angular/material';//Importing properties of snackbar.

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
  public LabelName = []
  public dataArray = [];
  public dataArrayApi = [];
  public status;
  public body={};
  public title;
  public data;
  public adding;
  public i=0;
  public isChecked=false;
  public addCheck;
  public description;
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
    this.title = document.getElementById("title").innerHTML;
    if (this.click == true) {
      let changecolor = this.bgColor;
      this.bgColor = '#ffffff';
     
      this.description = document.getElementById("description").innerHTML;




      if (this.description == "" && this.title == "") {   //For preventing the api call while the two filds are left empty.
        this.LabelName = [];
        this.LabelObj = [];
        return;
      }

      this._service.addNotes("notes/addNotes", {   //Service file addnotes post api is called with all the parameters.
        'title': this.title,
        'description': this.description,
        'isPined': this.pin,
        'color': changecolor,
        'isArchived': this.isArchived,
        'labelIdList': JSON.stringify(this.LabelObj)
      }, this.token)

        .subscribe(
          data => {    //On success.
            
            this.closeClicked.emit(true);
            this.LabelObj = [];
            this.LabelName = [];
          },
          error => {  //On failure of api call.
            
            this.LabelName = [];
            this.LabelObj = [];
          });
    }
    else {
       
      let changecolor = this.bgColor;
      this.bgColor = '#ffffff';
      for (var i = 0; i < this.dataArray.length; i++) {
        if (this.dataArray[i].isChecked == true) {
          this.status = "close"
        }
        var apiObj = {
          "itemName": this.dataArray[i].data,
          "status": this.status
        }
        if(this.dataArray[i].isChecked == false ||this.dataArray[i].isChecked == undefined)
        this.dataArrayApi.push(apiObj)
        this.status = "open"
      }
     

      this.body = {
        "title": this.title,
        "checklist": JSON.stringify(this.dataArrayApi),
        "isPined": this.pin,
        "color": changecolor,
        "isArchived": this.isArchived,
        "labelIdList": JSON.stringify(this.LabelObj)
      }
    }
    if (this.title != "") {
      this._service.addNotes("notes/addNotes", this.body, this.token)
      .subscribe(response => {
        
        this.LabelObj = []
        this.LabelName = [];
        this.dataArray = [];
        this.dataArrayApi = [];
        //emitting an event when the note is added
        this.closeClicked.emit(true);
      }, error => {
       
        this.LabelObj = []
        this.LabelName = [];
        this.dataArray = [];
        this.dataArrayApi = [];

      })
    }
  }


/*----------------------------------------------------------------------------------------------------------- */
onEnter(event){
  if (this.data != "") {
    this.adding = true;
  }
  else {
    this.adding = false;
  }
  this.i++;
  this.isChecked = this.addCheck
  if (this.data != null && event.code == "Enter") {
    
    var obj = {
      "index": this.i,
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
public toggle1(){
  this.click=!this.click;
  this.click=false;
  
}


  public toggle() {        //Toogling function for toggling the checklist view
  this.check = !this.check
  
  
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

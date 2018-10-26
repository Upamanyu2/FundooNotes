import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NoteCardComponent } from '../note-card/note-card.component'; //Note card component is imported to link the edit component and note component.
import { ServiceService } from '../../service/http/service.service' ;//Http service file is imported.

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
/*------------------------------------------------------------------------------------------------------------ */
export class EditComponent implements OnInit {

  constructor( 
    private _service : ServiceService, //service file reference is made.
    public dialogRef: MatDialogRef<NoteCardComponent>, //reference for dialogue box reference is being made.
    @Inject(MAT_DIALOG_DATA) public data: any,  //Used for injecting the datas received by the modal box from the note-card.
  ) { }
/*------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {
 

  }
/*------------------------------------------------------------------------------------------------------------ */
  onNoClick(): void {        //Function for closing the dialogue or modal box when the datas are contained.
    this.dialogRef.close();
  }
/*------------------------------------------------------------------------------------------------------------ */
  updatecard(){    //Update card post function is occuring to send the updated card details

    var title=document.getElementById("title").innerHTML;  //Used to bind the updated div data.
    var description=document.getElementById("description").innerHTML; //Used to bind the updated div data.
    
    var body={
      "noteId":this.data.id,
      "title":title,
      "description":description
    }
    this._service.updateCard('notes/updateNotes',body)
    .subscribe(
      data=>{
    console.log(data);
    
      },
      error=>{
    console.log(error);
    
      }
    )}
    
    }
 /*------------------------------------------------------------------------------------------------------------ */ 


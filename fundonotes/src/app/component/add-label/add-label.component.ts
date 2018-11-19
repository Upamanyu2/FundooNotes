import { Component, OnInit,Output, EventEmitter } from '@angular/core';//Importing all the dependencies
import { MatDialog } from '@angular/material'; //Importing the mat dialog
import { LabelCreateComponent } from '../label-create/label-create.component'; //Importing label create component
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service'; //Importing notes service
import { Router } from '@angular/router';//Importing router
/*------------------------------------------------------------------------------------------ */
@Component({   //Injecting componet dependencies
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
/*------------------------------------------------------------------------------------------ */
export class AddLabelComponent implements OnInit {   //Exported class
 
  public labelList = [];
  constructor(
    public dialog: MatDialog,
    private _service: NotesServiceService,
    public router: Router) { this.getLabel(); }
    @Output() Name = new EventEmitter<any>();
/*------------------------------------------------------------------------------------------ */
  ngOnInit() {
  }
/*------------------------------------------------------------------------------------------ */
  openDialog(): void {       //Function for the dialog box
    const dialogRef = this.dialog.open(LabelCreateComponent, {
      width: '250px',

    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.getLabel();
    });
  }

/*------------------------------------------------------------------------------------------ */

  getLabel() {        //Function for getting all the labels

    this._service.getNoteJson()
      .subscribe((data) => {
       
        this.labelList = [];
        for (var i = 0; i < data["data"].details.length; i++) {
          if (data["data"].details[i].isDeleted == false) {
            this.labelList.push(data["data"].details[i]);
            
          }

        }
      },
        error => {
        

        })
  }
/*------------------------------------------------------------------------------------------ */
  labelsClicked(labels) {    //Function for handling all the emitted events
    let labelName = labels.label;
    this.router.navigate(['home/label/' + labelName]);
    this.Name.emit(labelName);
  }
  
/*------------------------------------------------------------------------------------------ */
}

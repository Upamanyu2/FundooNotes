import { Component, OnInit, Output, EventEmitter } from '@angular/core';//Importing all the dependencies
import { MatDialog } from '@angular/material'; //Importing the mat dialog
import { LabelCreateComponent } from '../label-create/label-create.component'; //Importing label create component
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service'; //Importing notes service
import { Router } from '@angular/router';//Importing router
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators'
/*------------------------------------------------------------------------------------------ */
@Component({   //Injecting componet dependencies
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
/*------------------------------------------------------------------------------------------ */
export class AddLabelComponent implements OnInit {   //Exported class
  private destroy$: Subject<boolean> = new Subject<boolean>();
  labelList = [];
  constructor(
    private dialog: MatDialog,
    private _service: NotesServiceService,
    private router: Router) { this.getLabel(); }
  @Output() Name = new EventEmitter<any>();
  /*------------------------------------------------------------------------------------------ */
  ngOnInit() {
  }
  /*------------------------------------------------------------------------------------------ */
  openDialog(): void {       //Function for the dialog box
    const dialogRef = this.dialog.open(LabelCreateComponent, {
      width: '250px',

    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {

        this.getLabel();
      });
  }

  /*------------------------------------------------------------------------------------------ */

  getLabel() {        //Function for getting all the labels

    this._service.getNoteJson()
      .pipe(takeUntil(this.destroy$))
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
  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }
}

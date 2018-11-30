import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { ViewChild, ElementRef } from '@angular/core';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';
import { LabelServiceService } from '../../core/service/http/label/label-service.service';
import { Label } from '../../core/model/label/label'
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

/*----------------------------------------------------------------------------------------------------- */
@Component({
  selector: 'app-label-create',
  templateUrl: './label-create.component.html',
  styleUrls: ['./label-create.component.scss'],
  providers: []
})
/*----------------------------------------------------------------------------------------------------- */
export class LabelCreateComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private show = true;
  private userId = localStorage.getItem("UserId");
  private labelList: Label[] = [];
  public editId: any;

  /*----------------------------------------------------------------------------------------------------- */
  constructor(
    public dialogRef: MatDialogRef<NavigationBarComponent>,
    private _service: NotesServiceService, //Service file reference is made.
    private _service1: LabelServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  @ViewChild('label') labelInputRef: ElementRef;
  @ViewChild('labeledit') labelEditInputRef: ElementRef;
  ngOnInit() {
    this.getLabel();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  toggle() {
    this.show = !this.show;
  }


  /*----------------------------------------------------------------------------------------------------- */
  postLabel() {           //Function for posting all the labels
    let label = this.labelInputRef.nativeElement.value;
    if (label == "" || label == null) {
      return;
    }
    this._service.postLabels({
      "userId": this.userId,
      "label": label,
      "isDeleted": false
    })
      .subscribe(
        data => {


        },
        error => {

        }
      )
  }
  /*----------------------------------------------------------------------------------------------------- */
  getLabel() {        //Function for getting all the labels

    this._service.getNoteJson()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        let myData: Label[] = data['data']['details']
        this.labelList = [];
        for (var i = 0; i < myData.length; i++) {
          if (myData[i].isDeleted == false) {
            this.labelList.push(myData[i]);
          }

        }


      })
  }
  /*----------------------------------------------------------------------------------------------------- */
  deleteLabel(id) {            //Function for deleting all the labels
    this._service1.labelDeleteService(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {

          this.getLabel();

        },
        error => {


        }
      )
  }
  /*----------------------------------------------------------------------------------------------------- */
  updateLabel(id) {

    let editLabel = this.labelEditInputRef.nativeElement.value;
    this._service.updateLabels(id, {
      "label": editLabel
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {

          this.getLabel();


        },
        error => {


        }

      )
  }
  /*----------------------------------------------------------------------------------------------------- */

  editLabel(id) {
    this.editId = id;

  }
  /*----------------------------------------------------------------------------------------------------- */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

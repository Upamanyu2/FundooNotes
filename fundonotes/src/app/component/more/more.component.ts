import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';
import { LabelServiceService } from '../../core/service/http/label/label-service.service';
import { Label } from '../../core/model/label/label';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
/*-------------------------------------------------------------------------------------------------------------------------------------*/
export class MoreComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private labelList: Label[] = [];
  public searchLabel;


  constructor(
    private _service: NotesServiceService,
    private _service1: LabelServiceService,
    private router: Router

  ) { }
  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  @Input() showHideData;
  @Input() showHideData1;
  @Input() Noteid: any;
  @Input() Delete: any;
  @Input() checkVariable: boolean
  @Output() DeleteClicked = new EventEmitter<any>(); // Event emitter for emitting the deleted arrray while it is getting posted.
  @Output() LabelObj = new EventEmitter<any>();
  @Output() ParentEmit = new EventEmitter<any>();
  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {


  }
  /*-------------------------------------------------------------------------------------------------------------------------------------*/

  deleteNotes(flag) {   //Delete post function.


    let noteId = []

    if (this.Noteid != undefined && this.Noteid.noteLabels != undefined) {
      noteId.push(this.Noteid.id);
      this._service.deleteNotesPost({
        "isDeleted": flag,
        "noteIdList": noteId
      }).pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {

            this.DeleteClicked.emit(true);
          },
          error => {


          }
        )
    }

  }

  /*-------------------------------------------------------------------------------------------------------------------------------------*/

  deleteForeverNotes(flag) {   //Delete post function.


    let noteId = []
    noteId.push(this.Noteid.id);
    if (this.Noteid != undefined && this.Noteid.noteLabels != undefined) {

      this._service.deleteForeverNotes({
        "isDeleted": flag,
        "noteIdList": noteId
      }).pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {

            this.DeleteClicked.emit(true);
          },
          error => {


          }
        )
    }

  }


  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  getLabel() {        //Function for getting all the labels

    this._service.getNoteJson()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {

        this.labelList = [];
        let myData: Label[] = data['data']['details']
        for (var i = 0; i < myData.length; i++) {
          if (myData[i].isDeleted == false) {
            this.labelList.push(myData[i]);
          }
          if (this.Noteid != null) {
            for (let i = 0; i < this.labelList.length; i++) {
              this.labelList[i].isChecked = false;
              for (let j = 0; j < this.Noteid['noteLabels'].length; j++) {
                if (this.labelList[i]['id'] == this.Noteid['noteLabels'][j].id) {
                  this.labelList[i].isChecked = true;

                }

              }
            }
          }

        }
      },
        error => {


        })
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  addNotesToLabelPost(id) {
    let noteId = this.Noteid.id;

    this._service1.addLabelToNotes(noteId, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {

        this.DeleteClicked.emit(true);
      },
        error => {


        })
  }

  /*-------------------------------------------------------------------------------------------------------------------------------------*/

  deleteNotesfromLabelPost(id) {
    let noteId = this.Noteid.id;

    this._service1.removeLabelFromNotes(noteId, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {

        this.DeleteClicked.emit(true);
      },
        error => {


        })
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  check(label, id) {

    this.LabelObj.emit({ labelObject: label, status: label.isChecked });
    if (this.Noteid != null && label.isChecked == true) {
      this.deleteNotesfromLabelPost(id);

    }
    else if (this.Noteid != null && label.isChecked == false)
      this.addNotesToLabelPost(id);
  }
  /*-------------------------------------------------------------------------------------------------------- */
  private showCheckbox = this.showHideData;
  private hideButton = false;
  public toggleShowHideCheckboxes() {

    if (this.checkVariable == true) {
      this.showCheckbox = true;
      this.ParentEmit.emit(this.showCheckbox);

      this.hideButton = !this.hideButton;
    }
    else {
      this.showCheckbox = false
      this.ParentEmit.emit(this.showCheckbox);
      this.hideButton = !this.hideButton;
    }

  }
  /*-------------------------------------------------------------------------------------------------------- */
  public toggleShowHideCheckboxes1() {

    if (this.checkVariable == false || this.checkVariable == undefined) {
      this.showCheckbox = true;
      this.ParentEmit.emit(this.showCheckbox);

      this.hideButton = !this.hideButton;
    }
    else {
      this.showCheckbox = false;
      this.ParentEmit.emit(this.showCheckbox);
      this.hideButton = !this.hideButton;
    }

  }

  questionAnswerMode(){
    this.router.navigate(['/home/notes/'+this.Noteid.id+'/questionAnswers']);
  }

  /*-------------------------------------------------------------------------------------------------------- */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}  
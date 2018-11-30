import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
/*-------------------------------------------------------------------------------------------------------- */

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
/*-------------------------------------------------------------------------------------------------------- */
export class PinComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private newPin;
  pinClick

  /*-------------------------------------------------------------------------------------------------------- */
  @Input() Noteid: any;
  @Output() pinClicked = new EventEmitter<any>();
  constructor(private service: NotesServiceService) { }
  /*-------------------------------------------------------------------------------------------------------- */
  ngOnInit() {

  }
  /*-------------------------------------------------------------------------------------------------------- */
  pinned() {
    if (this.Noteid != undefined) {
      if ((this.Noteid.isPined == true || this.Noteid.isPined == undefined)) {
        this.newPin = false;

      }
      if ((this.Noteid.isPined == false || this.Noteid.isPined == undefined)) {
        this.newPin = true;

      }
    }
    let noteid = []
    noteid.push(this.Noteid.id)
    let body = {
      "isPined": this.newPin,
      "noteIdList": noteid
    }
    this.service.postPin(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.pinClicked.emit(true);
      },
        error => {

        })

  }
  /*-------------------------------------------------------------------------------------------------------- */

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}

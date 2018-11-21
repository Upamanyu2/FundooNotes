import { Component, OnInit } from '@angular/core';
import { ReminderServiceService } from '../../core/service/http/reminder/reminder-service.service';
import { Note } from '../../core/model/notes/note';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

/*----------------------------------------------------------------------------------------------------- */

@Component({
  selector: 'app-reminder-component',
  templateUrl: './reminder-component.component.html',
  styleUrls: ['./reminder-component.component.scss']
})

/*----------------------------------------------------------------------------------------------------- */
export class ReminderComponentComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private reminder: Note[] = [];
  constructor(private service1: ReminderServiceService) { }
  /*----------------------------------------------------------------------------------------------------- */
  ngOnInit() {
    this.getReminderNotes();
  }
  /*----------------------------------------------------------------------------------------------------- */
  getReminderNotes() {
    this.service1.getReminderNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        let myData: Note[] = result['data']['data']
        this.reminder = myData;
      })
  }
  /*----------------------------------------------------------------------------------------------------- */
  refresh(event) {
    if (event) {
      this.getReminderNotes();
    }
  }
  /*----------------------------------------------------------------------------------------------------- */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

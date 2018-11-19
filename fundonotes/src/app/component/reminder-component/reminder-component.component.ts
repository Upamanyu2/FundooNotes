import { Component, OnInit } from '@angular/core';
import { ReminderServiceService } from '../../core/service/http/reminder/reminder-service.service'
@Component({
  selector: 'app-reminder-component',
  templateUrl: './reminder-component.component.html',
  styleUrls: ['./reminder-component.component.scss']
})
export class ReminderComponentComponent implements OnInit {
  public reminder = [];
  constructor(private service1: ReminderServiceService) { }

  ngOnInit() {
    this.getReminderNotes();
  }
  getReminderNotes() {
    this.service1.getReminderNotes()
      .subscribe(result => {

        this.reminder = result['data'].data;
      })
  }
  refresh(event) {
    if (event) {
      this.getReminderNotes();
    }
  }
}

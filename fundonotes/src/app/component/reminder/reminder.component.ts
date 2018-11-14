import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDatepickerModule } from "@angular/material";
import { FormControl } from '@angular/forms';
import { ReminderServiceService } from '../../core/service/http/reminder/reminder-service.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  public message;
  public reminder;
  constructor(private _service: ReminderServiceService) { }
  @Input() Noteid: any;
  @Input() Delete
  @Output() ReminderEmit = new EventEmitter<any>();
  ngOnInit() {
  }

  body = {};
  public currentDate = new Date();

  reminders: any[] = [
    { value: 'morning', viewPeriod: 'Morning', viewTime: '08:00 AM' },
    { value: 'afternoon', viewPeriod: 'Afternoon', viewTime: '01:00 PM' },
    { value: 'evening', viewPeriod: 'Evening', viewTime: '06:00 PM' },
    { value: 'night', viewPeriod: 'Night', viewTime: '09:00 PM' }];



  addRemToday() {

    this.reminder = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 8, 0, 0, 0)
    this.ReminderEmit.emit({ status: true, details: this.reminder });
    if (this.Noteid != undefined) {
      this.body = {
        "noteIdList": [this.Noteid.id],
        "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 8, 0, 0, 0)
      }
      this._service.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'), this.body).subscribe((result) => {
        this.ReminderEmit.emit({ status: true, details: this.body });

      });
    }


  }

  addRemTomorrow() {
    this.reminder = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 1), 8, 0, 0, 0)
    this.ReminderEmit.emit({ status: true, details: this.reminder });
    if (this.Noteid != undefined) {
      this.body = {
        "noteIdList": [this.Noteid.id],
        "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 1), 8, 0, 0, 0)
      }
      this._service.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'), this.body).subscribe((result) => {
        this.ReminderEmit.emit({ status: true, details: this.body });

      });
    }


  }

  addRemNextWeek() {
    this.reminder = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 7), 8, 0, 0, 0)
    this.ReminderEmit.emit({ status: true, details: this.reminder });
    if (this.Noteid != undefined) {
      this.body = {
        "noteIdList": [this.Noteid.id],
        "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 7), 8, 0, 0, 0)
      }
      this._service.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'), this.body).subscribe((result) => {
        this.ReminderEmit.emit({ status: true, details: this.body });

      });
    }


  }
  show = true
  datePickReminder() {
    this.show = !this.show;
  }
  backPressDatepicker() {
    this.show = true;
  }
  reminderBody = {
    "date": new FormControl(new Date()),
    "time": ""
  }


  addRemCustom(date, timing) {

    timing.match('^[0-2][0-3]:[0-5][0-9]$');

    if (timing == '8:00 AM') {
      this.reminder = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
      this.ReminderEmit.emit({ status: true, details: this.reminder });
      if (this.Noteid != undefined) {
        this.body = {
          "noteIdList": [this.Noteid.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
        }
        this._service.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'), this.body).subscribe((result) => {

          this.ReminderEmit.emit({ status: true, details: this.body });
        });
      }
    } else if (timing == '1:00 PM') {
      this.reminder = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0)
      this.ReminderEmit.emit({ status: true, details: this.reminder });
      if (this.Noteid != undefined) {
        this.body = {
          "noteIdList": [this.Noteid.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0)
        }
        this._service.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'), this.body).subscribe((result) => {

          this.ReminderEmit.emit({ status: true, details: this.reminder });
        });
      }
    } else if (timing == '6:00 PM') {
      this.reminder = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0)
      this.ReminderEmit.emit({ status: true, details: this.body });
      if (this.Noteid != undefined) {
        this.body = {
          "noteIdList": [this.Noteid.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0)
        }
        this._service.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'), this.body).subscribe((result) => {

          this.ReminderEmit.emit({ status: true, details: this.body });
        })
      }
    } else if (timing == '9:00 PM') {
      this.reminder = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0)
      this.ReminderEmit.emit({ status: true, details: this.reminder });
      if (this.Noteid != undefined) {
        this.body = {
          "noteIdList": [this.Noteid.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0)
        }
        this._service.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'), this.body).subscribe((result) => {

          this.ReminderEmit.emit({ status: true, details: this.body });
        })
      }
    } else if (timing == this.reminderBody.time) {
      var x;
      var splitTime = this.reminderBody.time.split("", 8);
      var hour = Number(splitTime[0] + splitTime[1]);
      var minute = Number(splitTime[3] + splitTime[4]);
      var ampm = (splitTime[6] + splitTime[7]);

      if (ampm == 'AM' || ampm == 'am') {
        this.reminder = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0);
        this.ReminderEmit.emit({ status: true, details: this.reminder });
        if (this.Noteid != undefined) {
          this.body = {
            "noteIdList": [this.Noteid.id],
            "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0)
          }
          this._service.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'), this.body).subscribe((result) => {

            this.ReminderEmit.emit({ status: true, details: this.body });
          })
        }
      } else if (ampm == 'PM' || ampm == 'pm') {
        this.reminder = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 12, minute, 0, 0)
        this.ReminderEmit.emit({ status: true, details: this.reminder });
        if (this.Noteid != undefined) {
          this.body = {
            "noteIdList": [this.Noteid.id],
            "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 12, minute, 0, 0)
          }

          this._service.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'), this.body).subscribe((result) => {

            this.ReminderEmit.emit({ status: true, details: this.body });
          });
        }
      }

    }
  }
}




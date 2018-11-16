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
  public reminder1;
  constructor(private _service: ReminderServiceService) { }
  @Input() Noteid: any;
  @Input() Delete
  @Output() ReminderEmit = new EventEmitter<any>();
  reminderBody = {
    "date": new FormControl(new Date()),
    "time": ""
  }
  public setDate = this.reminderBody.date.value
  public currentDate = new Date();
  ngOnInit() {
    this.blockDate();
  }

  body = {};


  reminders: any[] = [
    { value: 'morning', viewPeriod: 'Morning', viewTime: '08:00 AM', disableStatus: false },
    { value: 'afternoon', viewPeriod: 'Afternoon', viewTime: '01:00 PM', disableStatus: false },
    { value: 'evening', viewPeriod: 'Evening', viewTime: '06:00 PM', disableStatus: false },
    { value: 'night', viewPeriod: 'Night', viewTime: '09:00 PM', disableStatus: false }];



  addRemToday() {

    this.reminder = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 8, 0, 0, 0)
    this.ReminderEmit.emit({ status: true, details: this.reminder });
    if (this.Noteid != undefined) {
      this.body = {
        "noteIdList": [this.Noteid.id],
        "reminder": this.reminder
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
        "reminder": this.reminder
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
        "reminder": this.reminder
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



  addRemCustom(date, timing) {
   
    timing.match('^[0-2][0-3]:[0-5][0-9]$');

    if (timing == '8:00 AM') {
      this.reminder = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
      this.ReminderEmit.emit({ status: true, details: this.reminder });
      if (this.Noteid != undefined) {
        this.body = {
          "noteIdList": [this.Noteid.id],
          "reminder": this.reminder
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
          "reminder": this.reminder
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
          "reminder": this.reminder
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
          "reminder": this.reminder
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
            "reminder": this.reminder
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
            "reminder": this.reminder
          }

          this._service.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'), this.body).subscribe((result) => {

            this.ReminderEmit.emit({ status: true, details: this.body });
          });
        }
      }

    }
  }


  blockDate() {
    if ((new Date(this.setDate).getFullYear() - new Date(this.currentDate).getFullYear()) == 0) {
      if ((new Date(this.setDate).getMonth() - new Date(this.currentDate).getMonth()) == 0) {
        if ((new Date(this.setDate).getDate() - new Date(this.currentDate).getDate()) == 0) {
          if ((new Date(this.setDate).getDate() - new Date(this.currentDate).getDate()) == 0) {
            this.reminders[0].disableStatus = true;
          }
          if ((new Date(this.setDate).getHours()) > 13) {

            this.reminders[1].disableStatus = true;

          }
          if ((new Date(this.setDate).getHours()) > 18) {
            this.reminders[2].disableStatus = true;

          }
          if ((new Date(this.setDate).getHours()) > 20) {
            this.reminders[3].disableStatus = true;

          }
        }
      }
    }
    else if ((new Date(this.setDate).getFullYear() - new Date(this.currentDate).getFullYear()) > 0) {
      if ((new Date(this.setDate).getMonth() - new Date(this.currentDate).getMonth()) > 0) {
        if ((new Date(this.setDate).getDate() - new Date(this.currentDate).getDate()) > 0) {
          if ((new Date(this.setDate).getDate() - new Date(this.currentDate).getDate()) == 0) {
            this.reminders[0].disableStatus = false;
          }
          if ((new Date(this.setDate).getHours()) > 13) {

            this.reminders[1].disableStatus = false;

          }
          if ((new Date(this.setDate).getHours()) > 18) {
            this.reminders[2].disableStatus = false;

          }
          if ((new Date(this.setDate).getHours()) > 20) {
            this.reminders[3].disableStatus = false;

          }
        }

      }
    }
  }


}




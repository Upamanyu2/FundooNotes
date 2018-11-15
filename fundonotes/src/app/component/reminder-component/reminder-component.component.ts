import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';

@Component({
  selector: 'app-reminder-component',
  templateUrl: './reminder-component.component.html',
  styleUrls: ['./reminder-component.component.scss']
})
export class ReminderComponentComponent implements OnInit {
  private token;
  public reminder = [];
  constructor(private service: NotesServiceService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.getReminderNotes();
  }
  getReminderNotes() {
    this.service.getNotes('notes/getReminderNotesList', this.token)
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

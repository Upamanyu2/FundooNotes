import { Injectable } from '@angular/core';
import { GenaralService } from '../httpServices/genaral.service'
@Injectable({
  providedIn: 'root'
})
export class ReminderServiceService {

  constructor(private service: GenaralService) { }

  /*----------------------------------------------------------------------------------- */
  public getReminderNotes() {
    let name = 'notes/getReminderNotesList';
    return this.service.getServiceWithToken(name)
  }
  /*----------------------------------------------------------------------------------- */
  httpAddReminder( body) {
    let name = 'notes/addUpdateReminderNotes'
    return this.service.postWithoutContentTypeService(name, body)
  }
  /*----------------------------------------------------------------------------------- */

}

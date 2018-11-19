import { Injectable } from '@angular/core';
import { GenaralService } from '../httpServices/genaral.service'
/*---------------------------------------------------------------------------------------------------------*/
@Injectable({
  providedIn: 'root'
})
/*---------------------------------------------------------------------------------------------------------*/
export class NotesServiceService {
  constructor(
    private service: GenaralService) { }

  /*---------------------------------------------------------------------------------------------------------------------------- */
  public addNotes(body) {
    let name = "notes/addNotes"            //Service function posting whatever notes added
    return this.service.postServiceEncoded(name, body);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  public editNotes(noteId, body) {
    let name = "notes/" + noteId + "/checklist/add";           //Service function posting whatever notes added
    return this.service.postServiceEncoded(name, body);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  public deleteCheckList(noteId, removeId, body) {
    let name = "notes/" + noteId + "/checklist/" + removeId + "/remove";
    return this.service.postServiceEncoded(name, body);
  }


  /*---------------------------------------------------------------------------------------------------------------------------- */
  public getTrashNotes() {    //Get service for getting the note list after deletion
    let name = "/notes/getTrashNotesList";
    return this.service.getServiceWithToken(name);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  public getArchiveNotes() { //Get service for getting the archive list after archiving
    let name = "notes/getArchiveNotesList";
    return this.service.getServiceWithToken(name);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  public getNotes() {  //Get service for getting all the notes.
    let name = "notes/getNotesList";
    return this.service.getServiceWithToken(name);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  postEditNotes(body) {
    let name = 'notes/updateNotes'

    return this.service.postServiceJson(name, body);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  postUpdatedNotes(id, modifiedListId, body) {
    let name = "notes/" + id + "/checklist/" + modifiedListId + "/update";
    return this.service.postServiceJson(name, body);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  postRemoveReminder(body) {
    let name = 'notes/removeReminderNotes'
    return this.service.postServiceJson(name, body);
  }

  /*---------------------------------------------------------------------------------------------------------------------------- */

  public postColorNotes(body) {  //Service file for posting delete function and the color hash codes of notes
    let name = "notes/changesColorNotes";
    return this.service.postServiceJson(name, body);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  public postLabelsToGetNotes(label, body) {
    let name = "notes/getNotesListByLabel/" + label;
    return this.service.postServiceJson(name, body);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  public postLabels(body) {
    let name = "noteLabels";
    return this.service.postServiceJson(name, body);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  public updateLabels(id,body){
    let name="noteLabels/"+id+"/updateNoteLabel";
    return this.service.postServiceJson(name, body);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  public pushNotificationPost(body){
    let name ="user/registerPushToken";
    return this.service.postServiceJson(name, body);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  public deleteNotesPost(body){
    let name="notes/trashNotes";
    return this.service.postServiceJson(name, body);

  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
  public deleteForeverNotes(body){
    let name="notes/deleteForeverNotes";
    return this.service.postServiceJson(name, body);
  }
  /*---------------------------------------------------------------------------------------------------------------------------- */
   public updateCheckList(id,modifiedId,body){
     let name="notes/" + id + "/checklist/" +modifiedId+"/update";
    return this.service.postServiceJson(name, body);

   }
   /*---------------------------------------------------------------------------------------------------------------------------- */
   public removeReminderPost(body){
     let name='notes/removeReminderNotes';
     return this.service.postServiceJson(name, body)

   }
   /*---------------------------------------------------------------------------------------------------------------------------- */

   public postArchive(body){
     let name="notes/archiveNotes";
     return this.service.postServiceJson(name, body)

   }

  /*---------------------------------------------------------------------------------------------------------------------------- */
  public getNoteJson() {
    let name = "noteLabels/getNoteLabelList"
    return this.service.getServiceJson(name);
  }
}
/*---------------------------------------------------------------------------------------------------------------------------- */

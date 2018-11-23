import { Injectable } from '@angular/core';
import { GenaralService } from '../httpServices/genaral.service'
/*---------------------------------------------------------------------------------------------------------*/
@Injectable({
  providedIn: 'root'
})
/*---------------------------------------------------------------------------------------------------------*/
export class LabelServiceService {

  constructor(private service: GenaralService) { }

  /*---------------------------------------------------------------------------------------------------------*/
  public labelDeleteService(id) {
    let name = "noteLabels/" + id + "/deleteNoteLabel";
    return this.service.deleteService(name);
  }
  /*---------------------------------------------------------------------------------------------------------*/

  public addLabelToNotes(noteId, id) {
    let name = "notes/" + noteId + "/addLabelToNotes/" + id + "/add";
    return this.service.postWithoutBodyService(name);
  }
  /*---------------------------------------------------------------------------------------------------------*/
  public removeLabelFromNotes(noteId, id) {
    let name = "notes/" + noteId + "/addLabelToNotes/" + id + "/remove";
    return this.service.postWithoutBodyService(name);
  }
}


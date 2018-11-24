import { Injectable } from '@angular/core';
import { GenaralService } from '../httpServices/genaral.service';
/*------------------------------------------------------------------------------------------------------ */

@Injectable({
  providedIn: 'root'
})
/*--------------------------------------------------------------------------------------------------------------- */
export class CollaboratorService {

  constructor(private service: GenaralService) { }
  searchUserCollabService(body){
 let name="user/searchUserList"
 return this.service.postServiceJson(name,body);
  }
  addUserCollabService(body,data){
    let name="notes/"+ data +"/AddcollaboratorsNotes";
    return this.service.postServiceJson(name,body);

  }
  removeCollabService(id,collabUserId){
    let name= "notes/"+id+"/removeCollaboratorsNotes/"+collabUserId;
    return this.service.deleteService(name);
  }
}

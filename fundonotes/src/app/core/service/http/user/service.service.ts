import { Injectable } from '@angular/core';
import { GenaralService } from '../httpServices/genaral.service'
/*---------------------------------------------------------------------------------------------------------*/
@Injectable({
  providedIn: 'root'
})
/*---------------------------------------------------------------------------------------------------------*/
export class ServiceService {


  constructor(private service:GenaralService) { }
/*------------------------------------------------------------------------------------------------------------------------------------*/
  public getData() {                       //service function for getting the data
    let name="user"
    return this.service.getService(name);
  }
/*------------------------------------------------------------------------------------------------------------------------------------*/
public getDataService(){
let name="user/service"
return this.service.getService(name);
}
/*------------------------------------------------------------------------------------------------------------------------------------*/

public postSignupService(body){
  let name="user/userSignUp"
  return this.service.postService(name, body);
}



/*------------------------------------------------------------------------------------------------------------------------------------*/
  public postData(body) {                 //service function for posting the data
    let name="user/login"
    return this.service.postService(name, body);
  }
/*------------------------------------------------------------------------------------------------------------------------------------*/
public postDataForgotPaasword(body){
  let name="user/reset";
  return this.service.postService(name, body);

}




  
/*------------------------------------------------------------------------------------------------------------------------------------*/
 

// public updateCard(name, body){        //Post function for updating the card.
  
//   var token=localStorage.getItem('token');
  
//   var httpheaders = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': token
//     })
//   };
//   return this.http.post(this.url + "/" + name, body,httpheaders);
// }
/*----------------------------------------------------------------------------------------------------------------------------------------------- */
public logoutService(){
  let name="user/logout";
  return this.service.postWithoutBodyService( name);
}
 /*--------------------------------------------------------------------------------------------------------------------*/

 httpAddImage(body){
  let name='user/uploadProfileImage'
  return this.service.postWithoutContentTypeService(name,body)
}

/*-------------------------------------------------------------------------------------------------- */

public resetPasswordPost(body){
  let name="user/reset-password";
  return this.service.postServiceJson(name, body);
}

}

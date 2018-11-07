import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

/*---------------------------------------------------------------------------------------------------------*/
@Injectable({
  providedIn: 'root'
})
/*---------------------------------------------------------------------------------------------------------*/
export class ServiceService {
  private url: string = 'http://34.213.106.173/api';

  constructor(private http: HttpClient) { }
/*------------------------------------------------------------------------------------------------------------------------------------*/
  public getData(name) {                       //service function for getting the data
    return this.http.get(this.url + "/" + name);
  }
/*------------------------------------------------------------------------------------------------------------------------------------*/
  public postData(name, body) {                 //service function for posting the data
    return this.http.post(this.url + "/" + name, body);
  }
/*------------------------------------------------------------------------------------------------------------------------------------*/

  encode(data) {
    const formBody = [];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

/*------------------------------------------------------------------------------------------------------------------------------------*/
 

public updateCard(name, body){        //Post function for updating the card.
  
  var token=localStorage.getItem('token');
  
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  };
  return this.http.post(this.url + "/" + name, body,httpheaders);
}
/*----------------------------------------------------------------------------------------------------------------------------------------------- */
public logoutService(name,token){
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  };
  return this.http.post(this.url + "/" + name,{},httpheaders);
}
 /*--------------------------------------------------------------------------------------------------------------------*/

 httpAddImage(nexturl,body,token){
 
  var httpheaders={
    headers:new HttpHeaders({
     
     'Authorization':token
    })
  };
  return this.http.post(this.url+"/"+nexturl,body,httpheaders)
}
}

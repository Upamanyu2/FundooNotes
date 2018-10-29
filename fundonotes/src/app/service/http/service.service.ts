import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
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
  public posttoken(name, body, token) {          //service function for authorisation and posting of token in case of resetting password
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    console.log('bodydata-->', body);
    console.log('headers', httpheaders);
    return this.http.post(this.url + "/" + name, this.encode(body), httpheaders)
  }
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
  public addNotes(name, body, token) {            //Service function posting whatever notes added
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    console.log('bodydata-->', body);
    console.log('headers-->', httpheaders);
    return this.http.post(this.url + "/" + name, this.encode(body), httpheaders);
  }


/*------------------------------------------------------------------------------------------------------------------------------------*/
public getDeleteNotes(name,token){    //Get service for getting the note list after deletion
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    })
  };
  console.log(httpheaders);
  
  return this.http.get(this.url + "/" + name,httpheaders);
}
/*------------------------------------------------------------------------------------------------------------------------------------*/
public postDeleteColorNotes(name, body, token){  //Service file pr posting delete function and the color hash codes of notes
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  };

  return this.http.post(this.url + "/" + name, body, httpheaders);
}
/*------------------------------------------------------------------------------------------------------------------------------------*/
public postArchiveNotes(name, body, token){  //Service file pr posting delete function and the color hash codes of notes
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  };

  return this.http.post(this.url + "/" + name, body, httpheaders);
}


/*------------------------------------------------------------------------------------------------------------------------------------*/
public getArchiveNotes(name,token){    //Get service for getting the note list after deletion
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    })
  };
  console.log(httpheaders);
  
  return this.http.get(this.url + "/" + name,httpheaders);
}
/*----------------------------------------------------------------------------------------------------------------------------------------------- */
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
public labelPostService(name,body,token){
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  };
  return this.http.post(this.url + "/" + name,body,httpheaders);
}
 /*--------------------------------------------------------------------------------------------------------------------*/
public labelGetService(name,token){
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  };
  return this.http.get(this.url + "/" + name,httpheaders);
}
/*--------------------------------------------------------------------------------------------------------------------*/
public labelDeleteService(name){
  
  return this.http.delete(this.url+"/"+name);
}
/*----------------------------------------------------------------------------------------------------- */

}

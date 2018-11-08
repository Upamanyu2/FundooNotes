import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment'
/*---------------------------------------------------------------------------------------------------------*/
@Injectable({
  providedIn: 'root'
})
/*---------------------------------------------------------------------------------------------------------*/
export class NotesServiceService {
  private url = environment.baseUrl;
  constructor(private http: HttpClient) { }
/*---------------------------------------------------------------------------------------------------------------------------- */
encode(data) {
  const formBody = [];
  for (const property in data) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
}

/*---------------------------------------------------------------------------------------------------------------------------- */
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
/*---------------------------------------------------------------------------------------------------------------------------- */
  public getNotes(name,token){    //Get service for getting the note list after deletion
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      })
    };
    console.log(httpheaders);
    
    return this.http.get(this.url + "/" + name,httpheaders);
  }

/*---------------------------------------------------------------------------------------------------------------------------- */

  public postNotes(name, body, token){  //Service file pr posting delete function and the color hash codes of notes
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
  
    return this.http.post(this.url + "/" + name, body, httpheaders);
  }


/*---------------------------------------------------------------------------------------------------------------------------- */
public getNoteJson(name,token){
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    })
  };
  return this.http.get(this.url + "/" + name,httpheaders);
}
}
/*---------------------------------------------------------------------------------------------------------------------------- */

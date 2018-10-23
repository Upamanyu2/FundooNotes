import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

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
  public addNotes(name, body, token) {            //service function posting whatever notes added
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
public getNotes(name,token){
  var httpheaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    })
  };
  console.log(httpheaders);
  
  return this.http.get(this.url + "/" + name,httpheaders);
}

}
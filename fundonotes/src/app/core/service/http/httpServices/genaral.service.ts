import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenaralService {
  private url=environment.baseUrl;
  
  
  constructor(private http: HttpClient) { }



  encode(data) {
    const formBody = [];
    for (const property in data) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
 /*---------------------------------------------------------------------------------- */

  
  public getService(name){
    return this.http.get(this.url + "/" + name);
  }
  public postService(name,body){
    return this.http.post(this.url+"/"+name, body);

  }
  public getServiceWithToken(name){
    let token =localStorage.getItem("token")

    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': token
      })
    };
    return this.http.get(this.url + "/" + name,httpheaders);
  }
  /*---------------------------------------------------------------------------------- */
  public getServiceJson(name){
    let token =localStorage.getItem("token")
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': token
      })
    };
    return this.http.get(this.url + "/" + name,httpheaders);
  }
  /*---------------------------------------------------------------------------------- */
  public deleteService (name){
    return this.http.delete(this.url+"/"+name);
  }
  /*---------------------------------------------------------------------------------- */


  public postWithoutBodyService(name){
    let token =localStorage.getItem("token")
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': token
      })
    };
    return this.http.post(this.url+"/"+name,{},httpheaders)
  }
  /*---------------------------------------------------------------------------------- */

  public postServiceEncoded(name,body){
    let token =localStorage.getItem("token")
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': token
      })
    };
    return this.http.post(this.url + "/" + name, this.encode(body), httpheaders);
  }

  /*---------------------------------------------------------------------------------- */

  public postServiceJson(name,body){
    let token =localStorage.getItem("token");
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': token
      })
    };
   
    return this.http.post(this.url + "/" + name, body, httpheaders);

  }
 


  public postServiceJsonWithToken(name,body,token){
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': token
      })
    };
    return this.http.post(this.url + "/" + name, body, httpheaders);

  }

  /*---------------------------------------------------------------------------------- */

  public postWithoutContentTypeService(name,body){
    let token =localStorage.getItem("token")

    var httpheaders={
      headers:new HttpHeaders({
       
      //  'Authorization':token
      })
    };

    return this.http.post(this.url + "/" + name, body, httpheaders);

  }

}

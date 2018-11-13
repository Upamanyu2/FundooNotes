import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReminderServiceService {
  private url=environment.baseUrl;
  constructor(private http: HttpClient) { }
  httpAddReminder(nexturl,token,body){
    console.log(token);
    var httpOptions={
      headers:new HttpHeaders({
       
       'Authorization':token
      })
    };
    return this.http.post(this.url+"/"+nexturl,body,httpOptions)
  }
  
 public httpGetReminder(nexturl,token){
    console.log(token);
    var httpOptions={
      headers:new HttpHeaders({
       
       'Authorization':token
      })
    };
    return this.http.get(this.url+"/"+nexturl,httpOptions)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url : string = 'http://34.213.106.173/api';

  constructor(private http : HttpClient) { }
  public getData(name){
    return this.http.get(this.url+"/"+name);
  }
  public postData(name,body){
    return this.http.post(this.url+"'/"+name,body);
  } 
}

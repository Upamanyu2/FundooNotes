import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment'
/*---------------------------------------------------------------------------------------------------------*/
@Injectable({
  providedIn: 'root'  
})
/*---------------------------------------------------------------------------------------------------------*/
export class LabelServiceService {
  private url=environment.baseUrl;

  constructor(private http: HttpClient) { }

/*---------------------------------------------------------------------------------------------------------*/
  public labelDeleteService(name){
  
    return this.http.delete(this.url+"/"+name);
  }
/*---------------------------------------------------------------------------------------------------------*/

  public addLabelToNotes(name,token){
    var httpheaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.http.post(this.url+"/"+name,{},httpheaders)
  }
/*---------------------------------------------------------------------------------------------------------*/
}

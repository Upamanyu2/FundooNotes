import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from './employee';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class PasswordShowHideService {
  private _url : string = 'src/assets/employees.JSON';
  constructor(private http : HttpClient) { }
  
  getEmployees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this._url);
  }

  
}

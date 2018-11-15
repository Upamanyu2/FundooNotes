import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerServiceService {

  constructor() { }

static log(msg: string): void {

  console.log(msg);
  
  }

  static data(obj={}): void {

    console.log(obj);
    
    }
  
  
  static error(msg: string, obj = {}): void {
  
  console.error(msg, obj);
  
  }
  
    
}

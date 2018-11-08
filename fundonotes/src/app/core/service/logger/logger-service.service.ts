import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerServiceService {

  constructor() { }

static log(msg: string): void {

  console.log(msg);
  
  }
  
  
  static error(msg: string, obj = {}): void {
  
  console.error(msg, obj);
  
  }
  
    
}

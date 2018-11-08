import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  private viewSource = new BehaviorSubject(false);
  currentView = this.viewSource.asObservable();


  constructor() { }
  
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeView(message:boolean){
    this.viewSource.next(message)
  }
}

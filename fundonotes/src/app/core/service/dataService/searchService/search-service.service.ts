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

  private viewSource1 = new BehaviorSubject(false);
  currentView1 = this.viewSource1.asObservable();

  private viewSource2 = new BehaviorSubject(false);
  currentView2 = this.viewSource2.asObservable();


  constructor() { }
  
  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeView(message:boolean){
    this.viewSource.next(message)
  }
  changeView1(message:boolean){
    this.viewSource1.next(message)
  }
  changeView2(message:boolean){
    this.viewSource2.next(message)
  }
}

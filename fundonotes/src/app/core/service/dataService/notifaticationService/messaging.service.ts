import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { LoggerServiceService } from '../../logger/logger-service.service'
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  messaging; 
  currentMessage = new BehaviorSubject(null)


  constructor() {
    firebase.initializeApp({
      'messagingSenderId': '263147610417'
    });
    
    this.messaging= firebase.messaging()
   }

  getPermission() {
    this.messaging.requestPermission()
    .then(() => {
      LoggerServiceService.log('Notification permission granted.');
      return this.messaging.getToken()
    })
    .then(pushToken => {
      localStorage.setItem("pushToken",pushToken)
      LoggerServiceService.data(pushToken)
      
    })
    .catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
  }


  receiveMessage() {
    this.messaging.onMessage((payload) => {
     console.log("Message received. ", payload);
     this.currentMessage.next(payload)
   });

 }
}

import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css'],
  // animations: [
  //   trigger('changeState',[
  //     state('state1',style({
  //       backgroundColor: 'bisque',
  //       transform: 'scale(1)'
  //     })),
  //     state('state2',style({
  //       backgroundColor: 'rgb(255, 255, 152)',
  //       transform: 'scale(1)'
  //     })),
  //     transition('*=>state1',animate('300ms')),
  //     transition('*=>state2',animate('2000ms')),
  //   ])
  // ]
})
export class SignupComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

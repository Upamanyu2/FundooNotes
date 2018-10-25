import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {

  
  constructor(
    
  ) { }
  @Output() refreshClicked =new EventEmitter<any>();
  @Input() notesListArray;
  ngOnInit() { }
  refresh(event){
    this.refreshClicked.emit(true);
  }
  
 
}

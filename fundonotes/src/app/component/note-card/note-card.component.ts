import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material';
import { EditComponent } from '../edit/edit.component'
/*-------------------------------------------------------------------------------------------------------------------------------------- */

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
/*-------------------------------------------------------------------------------------------------------------------------------------- */
export class NoteCardComponent implements OnInit {

  
  constructor(
    public dialog: MatDialog 
  ) { }

  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  @Output() refreshClicked =new EventEmitter<any>();//Output decorator and event emitter for color change archive and delete operation.
  @Output() updateCard =new EventEmitter<any>(); //Output decorator and event emitter for updated card array.
  @Input() notesListArray;
  @Input() searchData;
  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  ngOnInit() {

   }
 /*-------------------------------------------------------------------------------------------------------------------------------------- */
  openDialog(data): void {         // Function taking the data of the dialogue box
    const dialogRef = this.dialog.open(EditComponent, {
      width: '700px',
      data: {"title":data.title,"description":data.description,"id":data.id,"color":data.color}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     this.updateCard.emit(true);    //Updated card emitting here

    });
  }
 /*-------------------------------------------------------------------------------------------------------------------------------------- */

  refresh(event){                //Refresh function for the emitted event(delete, archive and color changing of the card)
    this.refreshClicked.emit(event);   //emitting to the parent component.
    this.updateCard.emit(event); //To make the parent known about the model box openDialog function has successfully occured.

  }
  /*-------------------------------------------------------------------------------------------------------------------------------------- */
 
}

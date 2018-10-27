import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;
/*-------------------------------------------------------------------------------------------------------------------------------------- */
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
/*-------------------------------------------------------------------------------------------------------------------------------------- */
export class ThemeComponent implements OnInit {
  private token=localStorage.getItem("token");
  constructor(private _service : ServiceService) { }
/*-------------------------------------------------------------------------------------------------------------------------------------- */
  @Input() Noteid:any;     //Input decorator used to catch the whole array of the notes from the note-card component
  @Output() ColorClicked = new EventEmitter<any>();
  @Output() ColorChanged = new EventEmitter<any>();  //Output decorator with event emitter is used to emit the color hash codes and note id to the parent component.
/*-------------------------------------------------------------------------------------------------------------------------------------- */
  ngOnInit() {
  }
/*-------------------------------------------------------------------------------------------------------------------------------------- */
  setcolor(str){   //Function to take the hash codes as input while clicking any color in the color pallete
    // console.log(this.Noteid.id);
   this.ColorChanged.emit(str)
   if(this.Noteid!=null)
   {
    let noteId=[]
    noteId.push(this.Noteid.id);
    this._service.postDeleteColorNotes("notes/changesColorNotes",{
      "color": str,
     "noteIdList":noteId
    },
    this.token)
    .subscribe(
      data=>{
      console.log(data);
      this.ColorClicked.emit(true);
      },
      error=>{
     console.log(error);
     
      }
    )
   }
    
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------------- */
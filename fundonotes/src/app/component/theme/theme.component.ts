import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  private token=localStorage.getItem("token");
  constructor(private _service : ServiceService) { }
  @Input() Noteid:any;
  @Output() ColorClicked = new EventEmitter<any>();
  ngOnInit() {
  }
  setcolor(str){
    console.log(this.Noteid.id);

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

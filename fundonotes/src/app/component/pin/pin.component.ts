import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';
import { SearchServiceService } from '../../core/service/dataService/searchService/search-service.service'//Importing the search service file


@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  private newPin;
  public pinClick
  @Input() Noteid: any;
  @Output() pinClicked = new EventEmitter<any>();
  constructor(private service: NotesServiceService,
              private service1: SearchServiceService) { }

  ngOnInit() {
  
  }
  
  pinned() {
    if (this.Noteid != undefined) {
       console.log(this.pinClick)
      if ((this.Noteid.isPined == true || this.Noteid.isPined == undefined)) {
        this.newPin = false;
        
      }
      if ((this.Noteid.isPined == false || this.Noteid.isPined == undefined)) {
        this.newPin = true;
       
      }
    }
    let noteid = []
    noteid.push(this.Noteid.id)
    let body = {
      "isPined": this.newPin,
      "noteIdList": noteid
    }
    this.service.postPin(body).subscribe(result => {
      this.pinClicked.emit(true);
    },
      error => {

      })

  }
  

}

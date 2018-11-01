import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../../service/http/service.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
/*-------------------------------------------------------------------------------------------------------------------------------------*/
export class MoreComponent implements OnInit {
  private token = localStorage.getItem("token");
  public labelList = [];
  public searchLabel;
  constructor(
    private _service: ServiceService,

  ) { }
  /*-------------------------------------------------------------------------------------------------------------------------------------*/

  @Input()
  Noteid: any;
  @Output() DeleteClicked = new EventEmitter<any>(); // Event emitter for emitting the deleted arrray while it is getting posted.
  @Output() LabelObj=new EventEmitter<any>();
  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {
  //   if( this.Noteid!=undefined ){
  //     for (let j = 0; j < this.Noteid['noteLabels'].length; j++) {
  //        this.labelList.push(this.Noteid['noteLabels'][j])
          
  //   }
  // }
    // this.getLabel();
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------*/

  deleteNotes() {   //Delete post function.
    

    let noteId = []
    noteId.push(this.Noteid.id);
    if(this.Noteid!=undefined && this.Noteid.noteLabels!=undefined){
      this._service.postDeleteColorNotes("notes/trashNotes", {
        "isDeleted": true,
        "noteIdList": noteId
      },
        this.token)
        .subscribe(
          data => {
            console.log(data);
            this.DeleteClicked.emit(true);
          },
          error => {
            console.log(error);
  
          }
        )
    }
    
  }


  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  getLabel() {        //Function for getting all the labels

    this._service.labelGetService("noteLabels/getNoteLabelList", this.token)
      .subscribe((data) => {
        // console.log(data);
        this.labelList = [];
        for (var i = 0; i < data["data"].details.length; i++) {
          if (data["data"].details[i].isDeleted == false) {
            this.labelList.push(data["data"].details[i]);
          }
        if(this.Noteid!==undefined){
          for (let i = 0; i < this.labelList.length; i++) {
            this.labelList[i].isChecked = false;
            for (let j = 0; j < this.Noteid['noteLabels'].length; j++) {
              if (this.labelList[i]['id'] == this.Noteid['noteLabels'][j].id) {
                this.labelList[i].isChecked = true;
                
              }

            }
          }
        }
          
        }
      },
        error => {
          console.log(error);

        })
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  addNotesToLabelPost(id) {
    let noteId = this.Noteid.id;

    this._service.addLabelToNotes("notes/" + noteId + "/addLabelToNotes/" + id + "/add", this.token)
      .subscribe(data => {
        console.log(data);
        this.DeleteClicked.emit(true);
      },
        error => {
          console.log(error);

        })
  }

  /*-------------------------------------------------------------------------------------------------------------------------------------*/

  deleteNotesfromLabelPost(id) {
    let noteId = this.Noteid.id;

    this._service.addLabelToNotes("notes/" + noteId + "/addLabelToNotes/" + id + "/remove", this.token)
      .subscribe(data => {
        console.log(data);
        this.DeleteClicked.emit(true);
      },
        error => {
          console.log(error);

        })
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------*/
  check(label, id) {
  //  if( label.isChecked==undefined || label.isChecked==false){
  //   this.LabelObj.emit(label);
  //  }
  //  console.log(label.isChecked)  
    
   this.LabelObj.emit({labelObject:label, status:label.isChecked}); 
    if ( this.Noteid!=null && label.isChecked == true) {
      this.deleteNotesfromLabelPost(id);
      
    }
    else if ( this.Noteid!=null && label.isChecked == false)
      this.addNotesToLabelPost(id);
  }
  
}  
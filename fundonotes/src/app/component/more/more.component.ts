import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;
// import {ViewChild, ElementRef} from '@angular/core';
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
/*-------------------------------------------------------------------------------------------------------------------------------------*/
export class MoreComponent implements OnInit {
  private token=localStorage.getItem("token");
  public labelList=[];
  
  constructor(
    private _service : ServiceService,
    
    ) { }
    // @ViewChild('check') labelInputRef: ElementRef;
/*-------------------------------------------------------------------------------------------------------------------------------------*/

@Input() 
Noteid:any;
@Output() DeleteClicked = new EventEmitter<any>(); // Event emitter for emitting the deleted arrray while it is getting posted.
/*-------------------------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {
   this.getLabel();
  }
/*-------------------------------------------------------------------------------------------------------------------------------------*/

  deleteNotes(){   //Delete post function.
    console.log(this.Noteid.id);

    let noteId=[]
    noteId.push(this.Noteid.id);
    this._service.postDeleteColorNotes("notes/trashNotes",{
     "isDeleted":true,
     "noteIdList":noteId
    },
    this.token)
    .subscribe(
      data=>{
      console.log(data);
      this.DeleteClicked.emit(true);
      },
      error=>{
     console.log(error);
     
      }
    )
  }


/*-------------------------------------------------------------------------------------------------------------------------------------*/
getLabel(){        //Function for getting all the labels
  
  this._service.labelGetService("noteLabels/getNoteLabelList",this.token)
  .subscribe((data)=>{
console.log(data);
this.labelList=[];
for(var i=0;i<data["data"].details.length;i++){
  if(data["data"].details[i].isDeleted == false){
    this.labelList.push(data["data"].details[i]);
    }
    
  for(let i=0;i<this.labelList.length;i++){
    for(let j=0;j<this.Noteid.noteLabels.length;j++){
      if(this.labelList[i]['id']==this.Noteid.noteLabels[j].id){
        this.labelList[i].isChecked=true;
        console.log(this.labelList[i]['isChecked']);
      }
    }
  }   
}
  },
  error=>{
console.log(error);

  })
}   

addNotesToLabelPost(id){
  let noteId=this.Noteid.id;
  
  this._service.addLabelToNotes("notes/"+noteId+"/addLabelToNotes/"+id+"/add",this.token)
  .subscribe(data=>{
    console.log(data);
  },
  error=>{
    console.log(error);
    
  }) 
}

}  
import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;

/*----------------------------------------------------------------------------------------------------------------------------- */
@Component({
  selector: 'app-add-notes-more',
  templateUrl: './add-notes-more.component.html',
  styleUrls: ['./add-notes-more.component.css']
})

/*----------------------------------------------------------------------------------------------------------------------------- */
export class AddNotesMoreComponent implements OnInit {
  private token=localStorage.getItem("token");
  public labelList=[];
  constructor(
    private _service : ServiceService
  ) { }

  ngOnInit() {
    
  }
@Input() 
Noteid:any;
 @Output() LabelId=new EventEmitter<any>();
  /*----------------------------------------------------------------------------------------------------------------------------- */
  getLabel(){        //Function for getting all the labels
    this._service.labelGetService("noteLabels/getNoteLabelList",this.token)
    .subscribe((data)=>{
  console.log(data);
  this.labelList=[];
  for(var i=0;i<data["data"].details.length;i++){
    if(data["data"].details[i].isDeleted == false){
      this.labelList.push(data["data"].details[i]);
      }
  }
  
    },
    error=>{
  console.log(error);
  
    })
  }
/*----------------------------------------------------------------------------------------------------------------------------- */   
labelId(id){
this.LabelId.emit(id);
console.log(id);
}

}

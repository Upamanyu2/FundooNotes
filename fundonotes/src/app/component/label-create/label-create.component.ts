import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import {ViewChild, ElementRef} from '@angular/core';
import { ServiceService } from '../../service/http/service.service' ;//Http service file is imported.
import { log } from 'util';

/*----------------------------------------------------------------------------------------------------- */
@Component({
  selector: 'app-label-create',
  templateUrl: './label-create.component.html',
  styleUrls: ['./label-create.component.css'],
  providers:[]
})
/*----------------------------------------------------------------------------------------------------- */
export class LabelCreateComponent implements OnInit {
public show=true;
public editId: any;
public label:boolean =false;
public userId=localStorage.getItem("UserId");
private token=localStorage.getItem("token");
public labelList=[];
  constructor(  
   public  dialogRef: MatDialogRef<NavigationBarComponent>,
   private _service : ServiceService, //Service file reference is made.
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    @ViewChild('label') labelInputRef: ElementRef;
    @ViewChild('labeledit') labelEditInputRef: ElementRef;
  ngOnInit() {
    this.getLabel();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  toggle(){
    this.show=!this.show;
  }
  

/*----------------------------------------------------------------------------------------------------- */
  postLabel(){
    let label=this.labelInputRef.nativeElement.value; 
      if(label=="" || label==null){
          return;
      }
    this._service.labelPostService("noteLabels",{
      "userId":this.userId,
      "label":label,
      "isDeleted":false
    },this.token)
    .subscribe(
      data=>{
        console.log(data); 
        
      },
      error=>{
        console.log(error)
      }
    ) 
  }
/*----------------------------------------------------------------------------------------------------- */
 getLabel(){
  
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
/*----------------------------------------------------------------------------------------------------- */
 deleteLabel(id){
   this._service.labelDeleteService("noteLabels/"+id+"/deleteNoteLabel")
   .subscribe(
     data=>{
       console.log(data);
       this.getLabel();
     },
     error=>{
       console.log(error);
       
     }
   )
 }
/*----------------------------------------------------------------------------------------------------- */
updateLabel(id){
 
 let editLabel=this.labelEditInputRef.nativeElement.value; 
  this._service.labelPostService("noteLabels/"+id+"/updateNoteLabel",{
   "label":editLabel
  },this.token)
  .subscribe(
    data=>{
   console.log(data);
   this.getLabel();
   
    },
    error=>{
   console.log(error);
  
    }

  ) 
}
/*----------------------------------------------------------------------------------------------------- */    
editLabel(id,value){
this.label=value;
console.log(value);
this.editId=id;
console.log(this.editId);
}
}

import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import {ViewChild, ElementRef} from '@angular/core';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';
import { LabelServiceService } from '../../core/service/http/label/label-service.service';



/*----------------------------------------------------------------------------------------------------- */
@Component({
  selector: 'app-label-create',
  templateUrl: './label-create.component.html',
  styleUrls: ['./label-create.component.scss'],
  providers:[]
})
/*----------------------------------------------------------------------------------------------------- */
export class LabelCreateComponent implements OnInit {
public show=true;
public editId: any;
// public label:boolean =false;
public userId=localStorage.getItem("UserId");
private token=localStorage.getItem("token");
public labelList=[];

/*----------------------------------------------------------------------------------------------------- */
  constructor(  
   public  dialogRef: MatDialogRef<NavigationBarComponent>,
   private _service : NotesServiceService, //Service file reference is made.
   private _service1: LabelServiceService,
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
  postLabel(){           //Function for posting all the labels
    let label=this.labelInputRef.nativeElement.value; 
      if(label=="" || label==null){
          return;
      }
    this._service.postNotes("noteLabels",{
      "userId":this.userId,
      "label":label,
      "isDeleted":false
    },this.token)
    .subscribe(
      data=>{
        
       
      },
      error=>{
       
      }
    ) 
  }
/*----------------------------------------------------------------------------------------------------- */
 getLabel(){        //Function for getting all the labels
  
      this._service.getNoteJson("noteLabels/getNoteLabelList",this.token)
      .subscribe((data)=>{
   
    this.labelList=[];
    for(var i=0;i<data["data"].details.length;i++){
      if(data["data"].details[i].isDeleted == false){
        this.labelList.push(data["data"].details[i]);
        }
           
    }
    
    
      },
      error=>{
  

      })
 }
/*----------------------------------------------------------------------------------------------------- */
 deleteLabel(id){            //Function for deleting all the labels
   this._service1.labelDeleteService("noteLabels/"+id+"/deleteNoteLabel")
   .subscribe(
     data=>{
       
       this.getLabel();
       
     },
     error=>{
      
       
     }
   )
 }
/*----------------------------------------------------------------------------------------------------- */
updateLabel(id){
 
 let editLabel=this.labelEditInputRef.nativeElement.value; 
  this._service.postNotes("noteLabels/"+id+"/updateNoteLabel",{
   "label":editLabel
  },this.token)
  .subscribe(
    data=>{
 
   this.getLabel();
   
   
    },
    error=>{
  
  
    }

  ) 
}
/*----------------------------------------------------------------------------------------------------- */    
editLabel(id){
this.editId=id;

}

}

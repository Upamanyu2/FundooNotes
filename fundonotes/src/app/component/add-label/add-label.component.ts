import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { LabelCreateComponent } from '../label-create/label-create.component';
import { ServiceService } from '../../service/http/service.service' ;
import {Router} from '@angular/router';
@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.css']
})
export class AddLabelComponent implements OnInit {
  public labelList=[];
  private token=localStorage.getItem("token");
  constructor(
    public dialog: MatDialog,
    private _service : ServiceService,
    public router:Router) { this.getLabel(); }
   
  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LabelCreateComponent, {
      width: '250px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getLabel();
    });
  }



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
  labelsClicked(labels){
  let labelName=labels.label;
  this.router.navigate(['home/label/'+labelName]);
  }
  
  
  
}

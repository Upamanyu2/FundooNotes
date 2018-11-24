import { Component, OnInit, Inject, Output,EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CollaboratorService } from "../../core/service/http/collaborator/collaborator.service";
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'; //Importing all the dialogue box requirements
/*----------------------------------------------------------------------------------------------- */
@Component({
  selector: 'app-collaborator-get',
  templateUrl: './collaborator-get.component.html',
  styleUrls: ['./collaborator-get.component.scss']
})
/*----------------------------------------------------------------------------------------------- */
export class CollaboratorGetComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private body;
  userArray;
  receiverArray = [];
  receiverArray1=[]
  showSave=false;
  @Output()collaboratorArray=new EventEmitter<any>();
  /*----------------------------------------------------------------------------------------------- */
  constructor(private service: CollaboratorService,
    public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    for (let i = 0; i < this.data['collaborators'].length; i++) {
      this.receiverArray.push(this.data['collaborators'][i]);
    }
  }
  /*----------------------------------------------------------------------------------------------- */
  img = environment.baseUrl1 + localStorage.getItem("imageUrl");
  email = localStorage.getItem("userName");
  firstName = localStorage.getItem("FirstName")
  lastName = localStorage.getItem("LastName")
  searchUsers(searchValue) {
    this.body = {
      "searchWord": searchValue
    }
    if (searchValue != "") {
      this.service.searchUserCollabService(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this.userArray = [];
          this.userArray = (result['data'].details);
        },
          error => {

          })
    }
    else {
      return
    }

  }


  saveUsers(users){
    this.showSave=true;
    this.body = {
      "firstName": users.firstName,
      "lastName": users.lastName,
      "email": users.email,
      "userId": users.userId
    }
    this.receiverArray1.push(this.body);
   
  }
 
  


  addUsers() {
    this.receiverArray1=[]
    this.showSave=false;
    console.log(this.data.id)
    this.service.addUserCollabService(this.body, this.data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(this.body);
        this.receiverArray.push(this.body);
        this.collaboratorArray.emit(this.receiverArray)
      }, error => {

      })
  }



  removeUsers(users){
  console.log(users);
  this.service.removeCollabService(this.data.id,users.userId)
  .pipe(takeUntil(this.destroy$))
  .subscribe(result=>{
  for(let i=0; i<this.receiverArray.length;i++){
    if(users.userId==this.receiverArray[i].userId){
      this.receiverArray.splice(i,1);
    }
  }
  this.collaboratorArray.emit(this.receiverArray)
  },
  error=>{

  });


  }


  close(){
    this.dialogRef.close();
  }
  /*----------------------------------------------------------------------------------------------- */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

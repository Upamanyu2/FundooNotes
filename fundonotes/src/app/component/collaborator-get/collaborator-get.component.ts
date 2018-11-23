import { Component, OnInit, Inject } from '@angular/core';
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
  /*----------------------------------------------------------------------------------------------- */
  constructor(private service: CollaboratorService,
    public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data['collaborators'])
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

  addUsers(users) {
    console.log(this.data.id)
    this.body = {
      "firstName": users.firstName,
      "lastName": users.lastName,
      "email": users.email,
      "userId": users.userId
    }
    this.service.addUserCollabService(this.body, this.data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(this.body);
        this.receiverArray.push(this.body);
      }, error => {

      })
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

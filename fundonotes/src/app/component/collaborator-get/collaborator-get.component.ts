import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CollaboratorService } from "../../core/service/http/collaborator/collaborator.service";
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
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
  img;
  email;
  firstName;
  lastName;
  private body;
  userArray;
  /*----------------------------------------------------------------------------------------------- */
  constructor(private service: CollaboratorService,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { }

  ngOnInit() {
    this.img = environment.baseUrl1 + localStorage.getItem("imageUrl");
    this.email = localStorage.getItem("userName");
    this.firstName = localStorage.getItem("FirstName")
    this.lastName = localStorage.getItem("LastName")
  }
  /*----------------------------------------------------------------------------------------------- */
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

      }, error => {

      })
  }
  /*----------------------------------------------------------------------------------------------- */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

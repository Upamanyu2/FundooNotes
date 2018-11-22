import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-collaborator-get',
  templateUrl: './collaborator-get.component.html',
  styleUrls: ['./collaborator-get.component.scss']
})
export class CollaboratorGetComponent implements OnInit {
  img
  email
  firstName
  lastName
  constructor() { }

  ngOnInit() {
    this.img=environment.baseUrl1+localStorage.getItem("imageUrl");
    this.email=localStorage.getItem("userName");
    this.firstName=localStorage.getItem("FirstName")
    this.lastName=localStorage.getItem("LastName")
  }

}

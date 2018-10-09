import { Component, OnInit } from '@angular/core';
import { PasswordShowHideService } from '../password-show-hide.service'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'  ,
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public employees = [];
  constructor(private _employeeService: PasswordShowHideService) { }

  ngOnInit() {
    this._employeeService.getEmployees()
    .subscribe(data =>this.employees = data);
  }

}

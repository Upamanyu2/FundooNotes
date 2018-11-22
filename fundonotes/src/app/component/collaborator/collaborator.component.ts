import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';//Importing the matdialog
import { CollaboratorGetComponent } from "../collaborator-get/collaborator-get.component"

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  @Input() Delete
  ngOnInit() {
  }
  openDialog1(): void {
    const dialogRef = this.dialog.open(CollaboratorGetComponent, {
      width: '700px',
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }
}

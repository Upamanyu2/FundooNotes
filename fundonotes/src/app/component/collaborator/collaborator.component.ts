import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  constructor() { }
  @Input() Delete
  ngOnInit() {
  }

}

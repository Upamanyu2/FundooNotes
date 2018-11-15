import { Component, OnInit } from '@angular/core'; //Importing all the modules for injecting dependencies
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing the service file
import { ActivatedRoute, Params } from '@angular/router';//Importing the activated route and params
/*-------------------------------------------------------------------------------------------- */
@Component({   //Injecting the component dependencies
  selector: 'app-get-labels-on-click',
  templateUrl: './get-labels-on-click.component.html',
  styleUrls: ['./get-labels-on-click.component.scss']
})
/*-------------------------------------------------------------------------------------------- */
export class GetLabelsOnClickComponent implements OnInit { //Exported class

  constructor(         //Constructor for making all the instances
    private _service: NotesServiceService,
    private route: ActivatedRoute
  ) { }
  /*-------------------------------------------------------------------------------------------- */
  public notes = []
  public label;
  private token = localStorage.getItem("token");
  /*-------------------------------------------------------------------------------------------- */
  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.label = params['params'];
        this.getCard(this.label)
      })
  }
  /*-------------------------------------------------------------------------------------------- */
  getCard(label) {      //Function for getting all the cards using the label name
    this._service.postNotes("notes/getNotesListByLabel/" + label, {}, this.token)
      .subscribe(data => {
        this.notes = []
        for (let i = data['data'].data.length - 1; i >= 0; i--) {
          this.notes.push(data['data'].data[i]);
        }
      },
        error => {
          
        })
  }

  /*-------------------------------------------------------------------------------------------- */
  refresh(event) {  //Function for handling all the event handlers
    if (event == true) {
      this.getCard(this.label)
    }


  }
}

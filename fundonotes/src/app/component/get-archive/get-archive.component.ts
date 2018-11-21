import { Component, OnInit } from '@angular/core';  //Importing for injecting all the dependencies.
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service'; //Importing the service file for using the get archive api.
import { Note } from '../../core/model/notes/note';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
/*------------------------------------------------------------------------------------------------------------------------ */
@Component({         //Injection of component dependencies
  selector: 'app-get-archive',
  templateUrl: './get-archive.component.html',
  styleUrls: ['./get-archive.component.scss']
})
/*------------------------------------------------------------------------------------------------------------------------ */
export class GetArchiveComponent implements OnInit {  //Exporting all the functionalities to use it in the while the initilisation of the page.
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private notes : Note[]=[];
  constructor(private _service: NotesServiceService) { }
  /*------------------------------------------------------------------------------------------------------------------------ */
  ngOnInit() {   //Initialisation function to called while the page is reloaded.
    this.getArchive();
  }
  /*------------------------------------------------------------------------------------------------------------------------ */
  getArchive() {  //Function for calling the get api.

    this._service.getArchiveNotes()
    .pipe(takeUntil(this.destroy$))  
    .subscribe(
        data => {
          this.notes = []
          let myData : Note[]=data['data']['data']
          for (var i = myData.length - 1; i >= 0; i--) {
            if (myData[i].isArchived == true && myData[i].isDeleted == false) {
              this.notes.push(myData[i]);
              
            }
          }
        },
        error => {
        
        }
      )
  }
  /*------------------------------------------------------------------------------------------------------------------------ */
  refresh(event)  {    //Function for handling all the event emitters catched
    if (event == true) {
     
      this.getArchive();
    }
    if(event.status==true){
      this.getArchive();
    }
  }

  /*------------------------------------------------------------------------------------------------------------------------ */
 ngOnDestroy(){
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
 }

}

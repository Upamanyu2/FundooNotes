import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';
import { SearchServiceService } from '../../core/service/dataService/searchService/search-service.service'
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
/*------------------------------------------------------------------------------------------- */
@Component({      //Injected dependency for component
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
/*------------------------------------------------------------------------------------------- */
export class SearchBarComponent implements OnInit { //Exported class
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public notes = [];
  public searched;
  constructor(private _service: NotesServiceService, public search: SearchServiceService) { }
  /*------------------------------------------------------------------------------------------- */
  ngOnInit() { //Injected dependency for reloading of page
    this.getNotes();
    this.search.currentMessage
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => this.searched = message)
  }
  /*------------------------------------------------------------------------------------------- */

  getNotes() {  //Function for getting all the notes
    this._service.getNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.notes = [];

          for (var i = data['data'].data.length - 1; i >= 0; i--) {
            if (data['data'].data[i].isDeleted == false && data['data'].data[i].isArchived == false) {
              this.notes.push(data['data'].data[i]);

            }


          }

        },
        error => {


        });
  }
  /*------------------------------------------------------------------------------------------- */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

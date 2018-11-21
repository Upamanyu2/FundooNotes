import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

/*-------------------------------------------------------------------------------------------------------------------------------------- */
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
/*-------------------------------------------------------------------------------------------------------------------------------------- */
export class ThemeComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private _service: NotesServiceService) { }
  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  @Input() Noteid: any;     //Input decorator used to catch the whole array of the notes from the note-card component
  @Input() Delete: any;
  @Output() ColorClicked = new EventEmitter<any>();
  @Output() ColorChanged = new EventEmitter<any>();  //Output decorator with event emitter is used to emit the color hash codes and note id to the parent component.
  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  ngOnInit() {
  }
  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  setcolor(str) {   //Function to take the hash codes as input while clicking any color in the color pallete

    this.ColorChanged.emit(str)
    if (this.Noteid != null) {
      let noteId = []
      noteId.push(this.Noteid.id);
      this._service.postColorNotes({
        "color": str,
        "noteIdList": noteId
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {

            this.ColorClicked.emit(true);
          },
          error => {


          }
        )
    }

  }

  /*-------------------------------------------------------------------------------------------------------------------------------------- */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
/*-------------------------------------------------------------------------------------------------------------------------------------- */
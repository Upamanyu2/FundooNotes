import { Component, OnInit } from '@angular/core'; //Importing all functions for dependency injection
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceService } from '../../core/service/http/user/service.service'; //Importing the service file
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing the notes service file
import { Router } from '@angular/router';//Importing the  router file
import { SearchServiceService } from '../../core/service/dataService/searchService/search-service.service'//Importing the search service file
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material';
import { ProfilePhotoComponent } from '../profile-photo/profile-photo.component'
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
/*-------------------------------------------------------------------------------------------------- */
@Component({   //Injecting component dependency
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NavigationBarComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private labelList = [];
  imageChangedEvent: any = '';
  title: any;
  /*--------------------------------------------------------------------------------------------------------------------*/
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  public firstname = [];
  public userName = []
  public message: String;
  /*--------------------------------------------------------------------------------------------------------------------*/
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _service: ServiceService,
    private _service1: NotesServiceService,
    private router: Router,
    private search: SearchServiceService,
    private dialog: MatDialog
  ) { }

  /*--------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {
    this.firstname.push(localStorage.getItem('FirstName'));
    this.getLabel();
    this.title = "Fundoo";
    this.search.currentMessage
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => this.message = message) //Subcribing the search message
    this.userName.push(localStorage.getItem("userName"));
  }
  /*--------------------------------------------------------------------------------------------------------------------*/
  getLabel() {        //Function for getting all the labels

    this._service1.getNoteJson()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {

        this.labelList = [];
        for (var i = 0; i < data["data"].details.length; i++) {
          if (data["data"].details[i].isDeleted == false) {
            this.labelList.push(data["data"].details[i]);
          }

        }


      },
        error => {


        })
  }
  /*--------------------------------------------------------------------------------------------------------------------*/

  selectedFile = null;
  public image2 = localStorage.getItem('imageUrl');
  img = environment.baseUrl1 + this.image2;
  onFileSelected(event: any): void {
    this.openDialog(event);

  }

  /*--------------------------------------------------------------------------------------------------------------------*/
  public pic;
  openDialog(data): void {       //Function for the dialog box
    const dialogRef = this.dialog.open(ProfilePhotoComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.search.currentView1
          .pipe(takeUntil(this.destroy$))
          .subscribe(message => this.pic = message)
        if (this.pic == true) {
          this.image2 = localStorage.getItem('imageUrl');
          this.img = environment.baseUrl1 + this.image2;
        }

      });
  }


  /*--------------------------------------------------------------------------------------------------------------------*/
  public logout() {  //Funtion to call the logout service function.

    this._service.logoutService()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {          //On success

          localStorage.removeItem("UserId"); //clearing all local storage
          localStorage.removeItem("imageUrl");
          localStorage.removeItem("userName");
          localStorage.removeItem("token");
          localStorage.removeItem("FirstName")
          this.router.navigate(['login']); //redirecting to login page
        },
        error => {               //On failure

        }
      )

  }


  /*--------------------------------------------------------------------------------------------------------------------*/

  onKeydown(event) {  //Functiion for catching all the values from the search bar

    this.search.changeMessage(event.target.value);
  }
  refresh(event) {    //Function for handling the emitted event

  }
  /*--------------------------------------------------------------------------------------------------------------------*/
  grid = 0;
  viewList() {    //Function for toggling to list view 
    this.grid = 1;
    this.search.changeView(true);
  }
  viewGrid() {    //Function for toggling to list view 
    this.grid = 0;
    this.search.changeView(false);
  }
  changeTitle(heading) {
    this.title = heading;
  }
  label(event) {
    this.title = event;
  }
  refreshIcon() {
    location.reload();

  }
  /*--------------------------------------------------------------------------------------------------------------------*/
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

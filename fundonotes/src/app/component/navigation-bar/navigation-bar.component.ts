import { Component, OnInit } from '@angular/core'; //Importing all functions for dependency injection
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceService } from '../../core/service/http/user/service.service'; //Importing the service file
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';//Importing the notes service file
import { Router } from '@angular/router';//Importing the  router file
import { SearchServiceService } from '../../core/service/searchService/search-service.service'//Importing the search service file



@Component({   //Injecting component dependency
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationBarComponent implements OnInit {
  public labelList = [];
  /*--------------------------------------------------------------------------------------------------------------------*/
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  private token = localStorage.getItem("token");
  public firstname=[];
  
  public message: String;
  /*--------------------------------------------------------------------------------------------------------------------*/
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _service: ServiceService,
    private _service1: NotesServiceService,
    public router: Router,
    public search: SearchServiceService
  ) { }

  /*--------------------------------------------------------------------------------------------------------------------*/
  ngOnInit() {
    this.firstname.push(localStorage.getItem('FirstName'));
    this.getLabel();
    this.search.currentMessage.subscribe(message => this.message = message) //Subcribing the search message
  }
  /*--------------------------------------------------------------------------------------------------------------------*/
  getLabel() {        //Function for getting all the labels

    this._service1.getNoteJson("noteLabels/getNoteLabelList", this.token)
      .subscribe((data) => {
        console.log(data);
        this.labelList = [];
        for (var i = 0; i < data["data"].details.length; i++) {
          if (data["data"].details[i].isDeleted == false) {
            this.labelList.push(data["data"].details[i]);
          }

        }


      },
        error => {
          console.log(error);

        })
  }

  /*--------------------------------------------------------------------------------------------------------------------*/
  public logout() {  //Funtion to call the logout service function.
    console.log(this.token);
    this._service.logoutService("user/logout", this.token)
      .subscribe(
        data => {          //On success
          console.log(data);
          localStorage.clear(); //clearing all local storage
          this.router.navigate(['login']); //redirecting to login page
        },
        error => {               //On failure
          console.log(error);
        }
      )

  }
  /*--------------------------------------------------------------------------------------------------------------------*/

  ProfilePath=null;
  selectedFile = null;
  onFileSelected(event){
 this.selectedFile=event.path[0].files[0];
 console.log(event.target.value);
 this.ProfilePath=event.target.value;
 console.log(this.selectedFile.name);
  }
  image={};
  public image2=localStorage.getItem('imageUrl');
  img="http://34.213.106.173/"+this.image2;
  onUpload(){
   var token=localStorage.getItem('token');
 
   const uploadData = new FormData();
   uploadData.append('file', this.selectedFile, this.selectedFile.name);
    this._service.httpAddImage('user/uploadProfileImage',uploadData,token).subscribe(res=>{
     
    },error=>{
      
      
    })
 
  }



  
  /*--------------------------------------------------------------------------------------------------------------------*/

  onKeydown(event) {  //Functiion for catching all the values from the search bar
    console.log(event.target.value);
    this.search.changeMessage(event.target.value);
  }
  refresh(event) {    //Function for handling the emitted event
    console.log(event)
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
  /*--------------------------------------------------------------------------------------------------------------------*/
}

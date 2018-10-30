import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { ServiceService } from '../../service/http/service.service' ;
import {Router} from '@angular/router';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationBarComponent implements OnInit {
  public labelList=[];
/*--------------------------------------------------------------------------------------------------------------------*/ 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  private token=localStorage.getItem("token");
  public firstname=localStorage.getItem('FirstName')
  
/*--------------------------------------------------------------------------------------------------------------------*/
  constructor(
    private breakpointObserver: BreakpointObserver,
    private _service : ServiceService,
    public router:Router,
    
    ) { }
/*--------------------------------------------------------------------------------------------------------------------*/
    ngOnInit() {
      this.getLabel();
    }
/*--------------------------------------------------------------------------------------------------------------------*/
getLabel(){        //Function for getting all the labels
  
  this._service.labelGetService("noteLabels/getNoteLabelList",this.token)
  .subscribe((data)=>{
console.log(data);
this.labelList=[];
for(var i=0;i<data["data"].details.length;i++){
  if(data["data"].details[i].isDeleted == false){
    this.labelList.push(data["data"].details[i]);
    }
       
}


  },
  error=>{
console.log(error);

  })
}    
  
  /*--------------------------------------------------------------------------------------------------------------------*/
  public logout(){  //Funtion to call the logout service function.
    console.log(this.token);
    this._service.logoutService("user/logout",this.token)
    .subscribe( 
      data=>{          //On success
      console.log(data);
      localStorage.clear(); //clearing all local storage
     this.router.navigate(['login']); //redirecting to login page
    },
    error=>{               //On failure
      console.log(error); 
    }
    )
    
  }
 /*--------------------------------------------------------------------------------------------------------------------*/ 



}

import { Injectable } from '@angular/core';
import { LoggerServiceService } from '../../logger/logger-service.service'
import {
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable()//{(providedIn: 'root')}

export class InterceptService  implements HttpInterceptor {

	constructor() { }

	
  	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    
	    request = request.clone({
	      setHeaders: {
	        Authorization: `${localStorage.getItem('token')}`
	      }
	    });
	   
	  
 

	    return next.handle(request)
	    .pipe(
	        tap(event => {
	          if (event instanceof HttpResponse) {
	             
	          // LoggerServiceService.log("Successful")
	          }
	        }, error => {
						// LoggerServiceService.log("Some error has occured")

	        })
	      )

    };
  
 
}


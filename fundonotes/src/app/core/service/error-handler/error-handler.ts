
import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class ErrorsHandler implements ErrorHandler {
    constructor(private snackBar: MatSnackBar) { }


    handleError(error: Error) {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
            
            if (!navigator.onLine) {
                window.location.href = "/internet-lost";
            }
            
            else {
                if (error.status == 500) {
                    this.snackBar.open("Internal server Error", "Please connect service provider", {
                        duration: 2000
                    });
                }
                else if (error.status == 400)
                    this.snackBar.open("Bad request", "Please connect service provider", {
                        duration: 2000
                    });
                else if (error.status == 401) {
                    window.location.href="/login"
                }
                

            }
        }
        else {
            this.snackBar.open("Client error", "Please try again  " + error, {
                duration: 2000
            });
        }

        // alert('It happens: ' + error);

    }
}
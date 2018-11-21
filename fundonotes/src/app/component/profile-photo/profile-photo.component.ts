import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { ServiceService } from '../../core/service/http/user/service.service';
import { environment } from '../../../environments/environment';
import { SearchServiceService } from '../../core/service/dataService/searchService/search-service.service'
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
/*-----------------------------------------------------------------------------------*/
@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss']
})
/*-----------------------------------------------------------------------------------*/

export class ProfilePhotoComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public croppedImage: any = '';
  imageChangedEvent: any = '';
  constructor(
    public dialogRef: MatDialogRef<NavigationBarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: ServiceService,
    private service: SearchServiceService
  ) { }
  /*-----------------------------------------------------------------------------------*/
  ngOnInit() {

  }
  /*-----------------------------------------------------------------------------------*/
  imageCropped(event: any) {
    this.croppedImage = event.file;
  }
  /*-----------------------------------------------------------------------------------*/
  public image2 = localStorage.getItem('imageUrl');
  img = environment.baseUrl1 + this.image2;
  onUpload() {
    
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this._service.httpAddImage(uploadData)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => {
      localStorage.setItem("imageUrl", res['status'].imageUrl);
      this.dialogRef.close()
      this.service.changeView1(true);
    }, error => {


    })

  }
  /*-----------------------------------------------------------------------------------*/
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

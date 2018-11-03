import { Component, OnInit,Input } from '@angular/core';
import { ServiceService } from '../../service/http/service.service';
import { ActivatedRoute,Params } from '@angular/router';
@Component({
  selector: 'app-get-labels-on-click',
  templateUrl: './get-labels-on-click.component.html',
  styleUrls: ['./get-labels-on-click.component.css']
})
export class GetLabelsOnClickComponent implements OnInit {

  constructor(
    private _service: ServiceService,
    private route:ActivatedRoute
  ) { }
 
  public notes=[]
  public label;
  private token=localStorage.getItem("token");
  ngOnInit() {
    
    this.route.params.subscribe(
      (params:Params)=>{
        this.label=params['params'];
        this.getCard(this.label)
      })
  }
  
 getCard(label){
   this._service.labelPostService("notes/getNotesListByLabel/"+label,{},this.token)
   .subscribe(data=>{
     this.notes=[]
     for(let i=data['data'].data.length-1;i>=0;i--){
       this.notes.push(data['data'].data[i]);
     }
   },
   error=>{
     console.log(error);
   })
 }


 refresh(event){
   if(event==true){
    this.getCard(this.label)
   }
  
   
 }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotesServiceService } from '../../core/service/http/notes/notes-service.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss']
})
export class QuestionAnswersComponent implements OnInit {
  @ViewChild('replyText') public replyTextRef: ElementRef;
  @ViewChild('replyText1') public replyTextRef1: ElementRef;

  constructor(private route: ActivatedRoute,
    private service: NotesServiceService,
    private router: Router) {

  }
  private destroy$: Subject<boolean> = new Subject<boolean>();
  userId=localStorage.getItem("Userid")
  noteId;
  color;
  body = {};
  title;
  checklist = [];
  description;
  question;
  firstNameUser;
  lastNameUser;
  firstNameUser1;
  lastNameUser1;
  img;
  date;
  parentId;
  questionAnswerId;
  rate = 0;
  hasAsked: boolean = false;
  replyMessage: boolean = false;
  likeClick: boolean;
  count = 0;
  count1=0;
  likeMessageId;
  replfirstStageArray = [];
  questionAnswersArray=[];
  img1;
  firstLike;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.noteId = params['noteId']
    });
    this.getNotes();
    

  }

  getNotes() {
  
   console.log( this.replfirstStageArray);
   
    this.service.getNotesQA(this.noteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(result);
        this.replfirstStageArray=[];
        this.questionAnswersArray=[];
        this.title = result['data']['data'][0].title;
        this.description = result['data']['data'][0].description;
        if (result['data']['data'][0].questionAndAnswerNotes[0] != undefined) {
          for(let b=0;b<result['data']['data'][0].questionAndAnswerNotes.length;b++){
            this.questionAnswersArray.push(result['data']['data'][0].questionAndAnswerNotes[b]);
          }
          this.question = result['data']['data'][0].questionAndAnswerNotes[0].message;
          this.firstNameUser = result['data']['data'][0].questionAndAnswerNotes[0].user.firstName;
          this.lastNameUser = result['data']['data'][0].questionAndAnswerNotes[0].user.lastName;
          this.img = environment.baseUrl1 + result['data']['data'][0].questionAndAnswerNotes[0].user.imageUrl;
          this.date = result['data']['data'][0].questionAndAnswerNotes[0].user.modifiedDate;
          this.questionAnswerId = result['data']['data'][0].questionAndAnswerNotes[0].id;
          this.firstLike=result['data']['data'][0].questionAndAnswerNotes[0].like
/*-------------------------------------------------------------------------------------------------------- */
    //Reply first stage for loop
          this.parentId = result['data']['data'][0].questionAndAnswerNotes[0].id;
          for (let k = 0; k < result['data']['data'][0].questionAndAnswerNotes.length; k++) {
            if (this.parentId == result['data']['data'][0].questionAndAnswerNotes[k].parentId) {
              this.img1 = environment.baseUrl1;
              this.firstNameUser1 = result['data']['data'][0].questionAndAnswerNotes[k].user.firstName;
              this.lastNameUser1 = result['data']['data'][0].questionAndAnswerNotes[k].user.lastName
              this.replfirstStageArray.push(result['data']['data'][0].questionAndAnswerNotes[k]);
            }

          }
/*-------------------------------------------------------------------------------------------------------- */

     //Like count for loop
          if (result['data']['data'][0].questionAndAnswerNotes[0].like != undefined) {
            this.count = 0;
            for (let i = 0; i < result['data']['data'][0].questionAndAnswerNotes[0].like.length; i++) {
              if (result['data']['data'][0].questionAndAnswerNotes[0].like[i].userId ==
                localStorage.getItem("UserId")) {
                this.likeClick = result['data']['data'][0].questionAndAnswerNotes[0].like[i].like
                console.log(this.likeClick);
              }
              if (result['data']['data'][0].questionAndAnswerNotes[0].like[i].like == true) {
                this.count++;
              }
            }
          }


        for(let l=0;l<result['data']['data'][0].questionAndAnswerNotes.length;l++){
         
            if(result['data']['data'][0].questionAndAnswerNotes[l].parentId==this.parentId
                && (result['data']['data'][0].questionAndAnswerNotes[l].id!=
                result['data']['data'][0].questionAndAnswerNotes[0].id)){
              if(result['data']['data'][0].questionAndAnswerNotes[l].like != undefined){
                // this.likeMessageId=result['data']['data'][0].questionAndAnswerNotes[l].id;
                for(let n=0; n<result['data']['data'][0].questionAndAnswerNotes[l].like.length;n++){
                  if(result['data']['data'][0].questionAndAnswerNotes[l].like[n].like==true){
                  
                     this.count1++;
                  }
                }
              }
            }
        }
          
/*-------------------------------------------------------------------------------------------------------- */
        //Rate calculation for loop
          if (result['data']['data'][0].questionAndAnswerNotes[0].rate != undefined) {
            this.rate = 0
            for (let j = 0; j < result['data']['data'][0].questionAndAnswerNotes[0].rate.length; j++) {
              this.rate = (this.rate + result['data']['data'][0].questionAndAnswerNotes[0].rate[j].rate) / (j + 1)
            }

          }
        }

        
/*-------------------------------------------------------------------------------------------------------- */

    //Printing checklist for loop
        for (let i = 0; i < result['data']['data'][0].noteCheckLists.length; i++) {
          if (result['data']['data'][0].noteCheckLists[i].isDeleted == false) {
            this.checklist.push(result['data']['data'][0].noteCheckLists[i]);
          }

        }

/*-------------------------------------------------------------------------------------------------------- */              
      }, error => {
        console.log(error)
      })

  }
/*-------------------------------------------------------------------------------------------------------- */              
  askQuestion(questionAsked) {
    this.hasAsked = true;
    this.body = {
      "message": questionAsked,
      "notesId": this.noteId
    }
    this.service.postNotesQA(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(result);
        this.question = result['data']['details'].message;
      })
  }
/*-------------------------------------------------------------------------------------------------------- */              
  body1 = {};

  like() {
    this.count = 0
    this.count1=0;
    this.likeClick = !this.likeClick;
 
    if (this.likeClick == true) {
      this.body1 = {
        "like": true
      }
    }
    if (this.likeClick == false) {
      this.body1 = {
        "like": false
      }
    }
    this.service.postLike(this.body1, this.questionAnswerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.checklist = [];
        console.log(result);
        this.getNotes();

      });

  }




  public likeClick1:boolean;
  public body4={};
  likeFirstStage(QaId1){
    this.count1=0;
    this.count=0;
    this.likeClick1=!this.likeClick1;
    if (this.likeClick1 == true) {
      this.body4 = {
        "like": true
      }
    }
    if (this.likeClick1 == false) {
      this.body4 = {
        "like": false
      }
    }

    this.service.postLike(this.body4,QaId1)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.checklist = [];
        console.log(result);
        this.getNotes();

      });

  }

/*-------------------------------------------------------------------------------------------------------- */              

  body2;
  rating(event) {
    console.log("My rating", event);
    this.body2 = {
      "rate": event
    }
    this.service.postRateQA(this.body2, this.questionAnswerId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.checklist = [];
        console.log(result);
        this.getNotes();
      })

  }
/*-------------------------------------------------------------------------------------------------------- */              


  reply() {
    this.replyMessage = !this.replyMessage;
  }

  body3 = {};
  replyGiven() {
    console.log(this.replfirstStageArray);
    this.replyMessage = false;
    console.log(this.replyTextRef.nativeElement.innerText);
    this.body3 = { "message": this.replyTextRef.nativeElement.innerHTML }
    this.service.reply(this.body3, this.parentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.replfirstStageArray = [];
        this.checklist = [];
        this.getNotes();
      })
  }
  replyMessage1:boolean=false;
  replyId1;
  reply1(replyId){
    console.log(replyId)
    this.replyId1=replyId;
    this.replyMessage1=!this.replyMessage1;
  }
  body6;
  replyArray2ndStage=[];
  replyGiven1(replyId2ndStage){
    this.replyArray2ndStage=[]; 
    this.replyMessage1 = false;
    console.log(this.replyTextRef1.nativeElement.innerText);
    this.body6 = { "message": this.replyTextRef1.nativeElement.innerHTML }
    this.service.reply(this.body6,replyId2ndStage)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.checklist = [];
        this.getNotes();
      })
      this.replyArray2ndStage=[];
    for(let i=0;i<this.questionAnswersArray.length;i++){
      if(replyId2ndStage==this.questionAnswersArray[i].parentId){
        this.replyArray2ndStage.push(this.questionAnswersArray[i]);
      }
    }
  }
  reply2ndStage(replyId2ndStage){
  this.replyArray2ndStage=[];
    console.log(replyId2ndStage)
    for(let i=0;i<this.questionAnswersArray.length;i++){
      
      if(replyId2ndStage.id==this.questionAnswersArray[i].parentId){
        
        this.replyArray2ndStage.push(this.questionAnswersArray[i]);
      }
    }
    return true;
  
  }
/*-------------------------------------------------------------------------------------------------------- */              

  likeCount(like){
     this.count1=0;
     for(let i=0;i<like.length;i++){
       if(like[i].like==true)
       this.count1=this.count1+1;
     }
     return true;
  }



  body5={};
  rating1(event,replyId){
    console.log(event);
    this.body5 = {
      "rate": event
    }
    this.service.postRateQA(this.body5, replyId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.checklist = [];
        console.log(result);
        this.getNotes();
      })

  }


  rateAverage1=0;
  rate1=0;
  rateAverage(rateArray){
  this.rateAverage1=0
  this.rate1=0
  
  
  for(let i=0;i<rateArray.length;i++){
   
    

       this.rate1=(this.rateAverage1+rateArray[i].rate)/(i+1);
   
  }
  
 return true;
  }

/*-------------------------------------------------------------------------------------------------------- */              
  returnBack() {
    this.router.navigate(['home/notes'])
  }
/*-------------------------------------------------------------------------------------------------------- */              

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute,
    private service: NotesServiceService,
    private router: Router) { }
  private destroy$: Subject<boolean> = new Subject<boolean>();
  noteId;
  color;
  body = {};
  title;
  checklist = [];
  description;
  question;
  firstNameUser;
  lastNameUser;
  img;
  date;
  questionAnswerId;
  rate = 0;
  hasAsked: boolean = false;
  likeClick: boolean;
  count = 0;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.noteId = params['noteId']
    });
    this.getNotes();

  }
  getNotes() {
    this.service.getNotesQA(this.noteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        console.log(result);
        console.log(result['data']['data'][0].noteCheckLists);
        this.title = result['data']['data'][0].title;
        this.description = result['data']['data'][0].description;
        if (result['data']['data'][0].questionAndAnswerNotes[0] != undefined) {
          this.question = result['data']['data'][0].questionAndAnswerNotes[0].message;
          this.firstNameUser = result['data']['data'][0].questionAndAnswerNotes[0].user.firstName;
          this.lastNameUser = result['data']['data'][0].questionAndAnswerNotes[0].user.lastName;
          this.img = environment.baseUrl1 + result['data']['data'][0].questionAndAnswerNotes[0].user.imageUrl;
          this.date = result['data']['data'][0].questionAndAnswerNotes[0].user.modifiedDate;
          this.questionAnswerId = result['data']['data'][0].questionAndAnswerNotes[0].id;



          if (result['data']['data'][0].questionAndAnswerNotes[0].like != undefined) {
           this.count=0;
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
          if (result['data']['data'][0].questionAndAnswerNotes[0].rate != undefined) {
            this.rate=0
            for(let j=0;j<result['data']['data'][0].questionAndAnswerNotes[0].rate.length;j++){
            this.rate=(this.rate + result['data']['data'][0].questionAndAnswerNotes[0].rate[j].rate)/(j+1)
            }

          }
        }



        for (let i = 0; i < result['data']['data'][0].noteCheckLists.length; i++) {
          if (result['data']['data'][0].noteCheckLists[i].isDeleted == false) {
            this.checklist.push(result['data']['data'][0].noteCheckLists[i]);
          }

        }

        // this.color = result['data']['data'][0].color
        // this.checklist=result['data']['data'][0].noteCheckLists;
      }, error => {
        console.log(error)
      })

  }

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

  body1 = {};

  like() {
    this.count = 0
    this.likeClick = !this.likeClick;
    console.log(this.likeClick);
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

      })

  }
  body2;
  rating(event) {
    console.log("My rating",event);
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



  returnBack() {
    this.router.navigate(['home/notes'])
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

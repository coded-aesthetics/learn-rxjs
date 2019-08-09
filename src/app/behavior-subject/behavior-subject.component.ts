import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { take, tap, share, withLatestFrom, delayWhen, map } from 'rxjs/operators';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject, Subscription, ConnectableObservable, interval, of, AsyncSubject, Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-behavior-subject',
  templateUrl: './behavior-subject.component.html',
  styleUrls: ['./behavior-subject.component.css']
})
export class BehaviorSubjectComponent implements OnInit {
  @ViewChild('marble', {static: true})
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', {static: true})
  marble2: MarbleDiagramComponent;

  intervalId: any;

  subjectSource: Subject<any>;
  subject: BehaviorSubject<any>;
  observable: Observable<any>;
  observableSource: Observable<any>;
  observableToGo: Observable<any>;
  subscription: Subscription;

  constructor() { }

  startSubject() {
    this.subject = new BehaviorSubject(9001);
    let ctr = 0;

    this.observableSource = this.subject.asObservable();

    this.intervalId = setInterval(() => {
      this.subject.next(ctr++);
    }, 2000);


    this.marble.restart();
    this.marble2.restart();

  }

  resetObservableToGo() {
    this.observableToGo = this.subject.asObservable();
  }

  ngOnInit() {
    const obs = fromEvent(document, 'click').pipe(
      tap(x => {
        this.resetObservableToGo();
      })
    );

    this.subscription = obs.subscribe(x => x);
    this.startSubject();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}

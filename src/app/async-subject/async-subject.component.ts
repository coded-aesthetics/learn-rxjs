import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { take, tap, share, withLatestFrom, delayWhen, map } from 'rxjs/operators';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject, Subscription, ConnectableObservable, interval, of, AsyncSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-async-subject',
  templateUrl: './async-subject.component.html',
  styleUrls: ['./async-subject.component.css']
})
export class AsyncSubjectComponent implements OnInit, OnDestroy {
  @ViewChild('marble', {static: true})
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', {static: true})
  marble2: MarbleDiagramComponent;

  intervalId: any;

  subjectSource: Subject<any>;
  subject: AsyncSubject<any>;
  observable: Observable<any>;
  observableSource: Observable<any>;
  subscription: Subscription;

  constructor() { }

  startSubject() {
    this.subject = new AsyncSubject();
    this.subjectSource = new Subject();
    let ctr = 0;

    this.observable = this.subject.asObservable().pipe(share());
    this.observableSource = this.subjectSource.asObservable().pipe(share());

    this.subjectSource.next(ctr++);

    this.intervalId = setInterval(() => {
      this.subjectSource.next(ctr++);
    }, 1000);


    this.marble.restart();
    this.marble2.restart();

    this.observableSource.subscribe(x => {
      this.subject.next(x);
    }, console.error, () => {
      this.subject.complete();
      setTimeout(() => {
        this.marble.stop();
        this.marble2.stop();
      }, 1000);
    });
  }

  endSubject() {
    clearInterval(this.intervalId);
    this.subjectSource.complete();
    this.subject = undefined;
    this.subjectSource = undefined;
  }

  ngOnInit() {
    const obs = fromEvent(document, 'click').pipe(
      tap(x => {
        this.subject ? this.endSubject() : this.startSubject();
      })
    );

    this.subscription = obs.subscribe(x => x);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}

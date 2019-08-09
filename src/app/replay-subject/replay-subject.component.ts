import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { mergeMap, take, tap, share, publish, withLatestFrom, delayWhen, combineLatest, map } from 'rxjs/operators';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { ReplaySubject, Subscription, ConnectableObservable, interval, of } from 'rxjs';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.css']
})
export class ReplaySubjectComponent implements OnInit, OnDestroy {
  @ViewChild('marble', {static: true})
  marble: MarbleDiagramComponent;

  intervalId: any;

  observable: Observable<any>;
  subscription: Subscription;

  observable2: Observable<any>;
  subscription2: Subscription;

  constructor() { }

  ngOnInit() {
    const replaySubject = new ReplaySubject();
    let ctr = 0;

    const source$ = replaySubject.asObservable().pipe(share());

    replaySubject.next(ctr++);

    this.intervalId = setInterval(() => {
      replaySubject.next(ctr++);
    }, 1000);
    const obs = fromEvent(document, 'click').pipe(
      tap(x => {
        this.observable = replaySubject.asObservable();
        this.observable2 = replaySubject.asObservable().pipe(withLatestFrom(replaySubject), delayWhen(
          ([replayedVal, lastRealVal]: [number, number], index) => {
            return interval((index < lastRealVal ? replayedVal : 0) * 40).pipe(take(1));
          }
        ), map(x => x[0]));
      })
    );

    this.subscription = obs.subscribe(x => x);

    this.marble.setObservable(source$);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}

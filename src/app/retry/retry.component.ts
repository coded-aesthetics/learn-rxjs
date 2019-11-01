import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter, scan, single, take, share, retry } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { Subscription, timer, Subject, fromEvent } from 'rxjs';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.css']
})
export class RetryComponent implements OnInit {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', { static: true })
  marble2: MarbleDiagramComponent;
  @ViewChild('marble3', { static: true })
  marble3: MarbleDiagramComponent;
  @ViewChild('marble4', { static: true })
  marble4: MarbleDiagramComponent;

  public observable: Observable<any>;

  public observables: Observable<any>[] = [];

  constructor() {}

  ngOnInit() {
    this.restart();
    fromEvent(document, 'click').subscribe(() => {
      this.restart();
    });
  }

  restart() {
    this.observables = [];
    const obs4 = new Observable((observer) => {
      const subject = new Subject();
      this.observables.unshift(subject.asObservable());
      let count = 0;
      const iv = setInterval(() => {
      const value = Math.round(Math.random() * 10);
      if (value % 3 === 0) {
        clearInterval(iv);
        observer.next(value);
        subject.next(value);
        subject.error(new Error());
        observer.error();
      } else {
        if (count++ === 3) {
          clearInterval(iv);
          observer.complete();
          subject.complete();
        } else {
          observer.next(value);
          subject.next(value);
        }
      }
    }, 400);
    });
    this.observable = pipe(retry(5))(obs4);

    this.marble3.setObservable(this.observable);
  }
}

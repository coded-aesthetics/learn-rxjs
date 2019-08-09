import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { mergeMap, take, concatMap, scan } from 'rxjs/operators';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.css']
})
export class ConcatMapComponent implements OnInit {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;

  queuedObservablesCount = 0;
  finishedObservablesCount = 0;
  startedObservablesCount = 0;

  observables: Observable<any>[] = [];

  constructor() { }

  removeObs (obs: Observable<any>) {
    this.observables = this.observables.filter(x => x !== obs);
    ++this.finishedObservablesCount;
    this.queuedObservablesCount = Math.max(0, this.startedObservablesCount - this.finishedObservablesCount - 1);
  }

  ngOnInit() {
    const click$ = fromEvent(document, 'click');
    const clickCount$ = click$.pipe(scan((acc, cur) => acc + 1, 0));
    clickCount$.subscribe(x => {
      this.startedObservablesCount = (x as number);
      this.queuedObservablesCount = Math.max(0, this.startedObservablesCount - this.finishedObservablesCount - 1);
    });
    const obs = click$.pipe(
      concatMap(x => {
        const obs = pipe(take(Math.round(Math.random() * 8)))(timer(0, Math.random() * 1000 + 500));
        this.observables.push(obs);
        obs.subscribe(x => x, console.error, () => {
          this.removeObs(obs);
        });
        return obs;
      })
    );

    this.marble.setObservable(obs);
  }

}

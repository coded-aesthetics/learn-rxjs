import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { mergeMap, take, share, tap, publish } from 'rxjs/operators';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-hot-vs-cold',
  templateUrl: './hot-vs-cold.component.html',
  styleUrls: ['./hot-vs-cold.component.css']
})
export class HotVsColdComponent implements OnInit {

  observables: Observable<any>[] = [];

  constructor() { }

  removeObs (obs: Observable<any>) {
    setTimeout(() => {
      this.observables = this.observables.filter(x => x !== obs);
    }, 3000);
  }

  ngOnInit() {
    const obs = timer(0, 1000);
    const obsLukewarm = obs.pipe(share());
    const obsHot = (obs.pipe(share(), publish()) as ConnectableObservable<any>);
    obsHot.connect();

    fromEvent(document, 'click').subscribe(() => {
      const cold10 = obs.pipe(take(10));
      this.observables.push(cold10);
      cold10.subscribe(x => x, console.error, () => {
        this.removeObs(cold10);
      });
      const lukewarm10 = obsLukewarm.pipe(take(10));
      this.observables.push(lukewarm10);
      lukewarm10.subscribe(x => x, console.error, () => {
        this.removeObs(lukewarm10);
      });
      const hot10 = obsHot.pipe(take(10));
      this.observables.push(hot10);
      hot10.subscribe(x => x, console.error, () => {
        this.removeObs(hot10);
      });
    });
  }

}

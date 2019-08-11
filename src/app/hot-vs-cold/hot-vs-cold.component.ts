import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { mergeMap, take, share, tap, publish } from 'rxjs/operators';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { ConnectableObservable } from 'rxjs';
import { addColorOp } from '../common/util/addColor';
import { primaryColor, highlightColor, secondaryColor } from '../common/colors';
import { getRandomColor } from '../common/util/randomColor';

@Component({
  selector: 'app-hot-vs-cold',
  templateUrl: './hot-vs-cold.component.html',
  styleUrls: ['./hot-vs-cold.component.css']
})
export class HotVsColdComponent implements OnInit {

  observables$: {type: string, observable: Observable<any>, completed: boolean, color: string}[] = [];
  get observables() {
    return this.observables$.map(x => x.observable);
  }

  get coldIsRunning () {
    return this.observables$.filter(x => x.type === 'cold' && !x.completed).length > 0;
  };

  get lukeIsRunning () {
    return this.observables$.filter(x => x.type === 'lukewarm' && !x.completed).length > 0;
  };

  get runningLukeColor () {
    const obses = this.observables$.filter(x => x.type === 'lukewarm' && !x.completed);
    return obses.length > 0 ? obses[0].color : undefined;
  };

  constructor() { }

  removeObs (obs: Observable<any>) {
    this.observables$ = this.observables$.map(x => ({...x, completed: x.observable === obs ? true : x.completed}));
    setTimeout(() => {
      this.observables$ = this.observables$.filter(x => x.observable !== obs);
    }, 3000);
  }

  ngOnInit() {
    const obs = timer(0, 1000);
    const obsLukewarm = obs.pipe(share());
    const obsHot = (obs.pipe(share(), publish()) as ConnectableObservable<any>);
    obsHot.connect();

    fromEvent(document, 'click').subscribe(() => {
      const coldColor = getRandomColor();
      const cold10 = obs.pipe(take(10), addColorOp(coldColor));
      this.observables$.push({type: 'cold', observable: cold10, completed: false, color: coldColor});
      cold10.subscribe(x => x, console.error, () => {
        this.removeObs(cold10);
      });
      const lukeColor = this.runningLukeColor || getRandomColor();
      const lukewarm10 = obsLukewarm.pipe(take(10), addColorOp(lukeColor));
      this.observables$.push({type: 'lukewarm', observable: lukewarm10, completed: false, color: lukeColor});
      lukewarm10.subscribe(x => x, console.error, () => {
        this.removeObs(lukewarm10);
      });
      const hot10 = obsHot.pipe(take(10), addColorOp(primaryColor));
      this.observables$.push({type: 'hot', observable: hot10, completed: false, color: secondaryColor});
      hot10.subscribe(x => x, console.error, () => {
        this.removeObs(hot10);
      });
    });
  }

}

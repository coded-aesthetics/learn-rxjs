import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { mergeMap, take, delayWhen, withLatestFrom, map, startWith } from 'rxjs/operators';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-delay-when',
  templateUrl: './delay-when.component.html',
  styleUrls: ['./delay-when.component.css']
})
export class DelayWhenComponent implements OnInit {
  @ViewChild('marble')
  marble: MarbleDiagramComponent;
  @ViewChild('marble2')
  marble2: MarbleDiagramComponent;

  observables: Observable<any>[] = [];

  constructor() { }

  removeObs (obs: Observable<any>) {
    this.observables = this.observables.filter(x => x !== obs);
  }

  ngOnInit() {
    const source$ = timer(0, 1000);
    const obs = source$.pipe(withLatestFrom(fromEvent(document, 'mousemove').pipe(startWith(0)))).pipe(
      delayWhen(([num, evt]) => {
        console.log((evt as any).clientX);
        const obs = pipe(map(() => num), take(1))(interval((evt as any).clientX));
        this.observables.unshift(obs);
        obs.subscribe(x => x, console.error, () => {
          setTimeout(() => {
            this.removeObs(obs);
          }, 5000);
        });
        return obs;
      })
    );

    this.marble.setObservable(source$);
    this.marble2.setObservable(pipe(map(([num]) => num))(obs));
  }

}

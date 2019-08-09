import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, withLatestFrom, scan, exhaustMap, take, combineAll, startWith, tap, first } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { from } from 'rxjs/observable/from';
import { interval } from 'rxjs/observable/interval';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { of } from 'rxjs/observable/of';
import { zip } from 'rxjs/observable/zip';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-combine-all',
  templateUrl: './combine-all.component.html',
  styleUrls: ['./combine-all.component.css']
})
export class CombineAllComponent implements OnInit {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  public observable: Observable<any>;
  @ViewChild('marble2', { static: true })
  marble2: MarbleDiagramComponent;
  @ViewChild('marble3', { static: true })
  marble3: MarbleDiagramComponent;
  @ViewChild('marble4', { static: true })
  marble4: MarbleDiagramComponent;
  @ViewChild('marble5', { static: true })
  marble5: MarbleDiagramComponent;
  @ViewChild('marble6', { static: true })
  marble6: MarbleDiagramComponent;
  @ViewChild('marble7', { static: true })
  marble7: MarbleDiagramComponent;
  @ViewChild('marble8', { static: true })
  marble8: MarbleDiagramComponent;
  @ViewChild('marble9', { static: true })
  marble9: MarbleDiagramComponent;

  constructor() { }

  ngOnInit() {
    const clicks = fromEvent(document, 'click');
    let clickCount = pipe(startWith(0), scan((acc) => acc + 1, 0))(clicks);
    const obs1 = timer(2000 * Math.random(), 2000 * Math.random()).pipe(take(5));
    const obs2 = timer(2000 * Math.random(), 2000 * Math.random()).pipe(take(5));
    const obs3 = timer(2000 * Math.random(), 2000 * Math.random()).pipe(take(5));
    const obs4 = timer(2000 * Math.random(), 2000 * Math.random()).pipe(take(5));
    const obses = of(obs1, obs2, obs3, obs4);
    const startReplay = (ob) => {
      this.marble4.setObservable(ob, true);
      this.marble5.setObservable(obs1);
      this.marble6.setObservable(obs2);
      this.marble7.setObservable(obs3);
      this.marble8.setObservable(obs4);
    };
    const higherOrder = pipe(
      tap(console.log),
      tap(([cc, ev, ob]) => {
        cc === 1 ? this.marble.setObservable(ob, true) : cc === 2 ? this.marble2.setObservable(ob, true) :
        cc === 3 ? this.marble3.setObservable(ob, true) : cc === 4 ? startReplay(ob) : '';
      }),
      map(([cc, ev, ob]) =>
        ob
      ),
      take(4)
    )(zip(clickCount, clicks, obses));
    const result = higherOrder.pipe(
      combineAll()
    );
    this.marble9.setObservable(result, true);
    result.subscribe(x => x, console.error, () => {
      this.marble5.stop();
      this.marble6.stop();
      this.marble7.stop();
      this.marble8.stop();
    });
  }

}

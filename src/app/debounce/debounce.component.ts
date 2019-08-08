import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, filter, debounceTime, tap, share, scan, withLatestFrom } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { reduce } from 'rxjs/operator/reduce';

@Component({
  selector: 'app-debounce',
  templateUrl: './debounce.component.html',
  styleUrls: ['./debounce.component.css']
})
export class DebounceComponent implements OnInit {
  @ViewChild('marble')
  marble: MarbleDiagramComponent;
  @ViewChild('marble2')
  marble2: MarbleDiagramComponent;

  public observable: Observable<any>;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const click$ = fromEvent(document, 'click');
    const clickCount$ = click$.pipe(scan((acc, val) => acc + 1, 0))
    const obs3 = pipe(map(x => (x[1] as number)))(
      fromEvent(document, 'click').pipe(withLatestFrom(clickCount$))
    );
    const sharedExample = obs3.pipe(share());
    sharedExample.subscribe(x => this.marble2.addMarble(x));
    this.observable = pipe(debounceTime(500), tap(x => this.marble.addMarble(x)))(sharedExample);
  }

}

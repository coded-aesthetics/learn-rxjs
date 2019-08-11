import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, filter, debounceTime, tap, share, scan, withLatestFrom, bufferCount } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { reduce } from 'rxjs/operator/reduce';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buffer-count',
  templateUrl: './buffer-count.component.html',
  styleUrls: ['./buffer-count.component.css']
})
export class BufferCountComponent implements OnInit {

  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', { static: true })
  marble2: MarbleDiagramComponent;
  @ViewChild('marble3', { static: true })
  marble3: MarbleDiagramComponent;

  public observable: Observable<any>;

  constructor() {}

  ngOnInit() {
    const click$ = fromEvent(document, 'click');
    const clickCount$ = click$.pipe(scan((acc) => acc + 1, 0));
    const obs3 = pipe(map(x => (x[1] as number)))(
      fromEvent(document, 'click').pipe(withLatestFrom(clickCount$))
    );
    const sharedExample = obs3.pipe(share());
    this.marble2.setObservable(sharedExample);
    this.observable = pipe(bufferCount(4, 3))(sharedExample);
    this.marble.setObservable(this.observable);
    const obs = pipe(bufferCount(2, 5))(sharedExample);
    this.marble3.setObservable(obs);
  }


}

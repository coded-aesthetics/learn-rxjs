import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter, scan, single, take, ignoreElements, materialize } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-materialize',
  templateUrl: './materialize.component.html',
  styleUrls: ['./materialize.component.css']
})
export class MaterializeComponent implements OnInit {
@ViewChild('marble', { static: true })
marble: MarbleDiagramComponent;
@ViewChild('marble2', { static: true })
marble2: MarbleDiagramComponent;
@ViewChild('marble3', { static: true })
marble3: MarbleDiagramComponent;
@ViewChild('marble4', { static: true })
marble4: MarbleDiagramComponent;

public observable: Observable<any>;

constructor() {}

ngOnInit() {
  const startTime = Date.now();
  const obs3 =
    timer(0, 400).pipe(take(10))
  ;
  this.marble2.setObservable(obs3);
  this.observable = pipe(ignoreElements(), materialize(), map(x => JSON.stringify(x)))(obs3);

  this.marble.setObservable(this.observable);
  const obs5 = pipe(filter(x => x === 2), materialize(), map(x => JSON.stringify(x)))(obs3);

  this.marble3.setObservable(obs5);
  const obs2 = pipe(single(x => x > 3 && x <= 5), materialize(), map(x => JSON.stringify(x)))(obs3);

  this.marble4.setObservable(obs2);

  obs3.subscribe(x => x, console.error, () => {
    setTimeout(() => {
      this.marble4.stop();
      this.marble3.stop();
      this.marble2.stop();
      this.marble.stop();
    }, 500);
  });
}
}

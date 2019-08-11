import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter, scan, single, take } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
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
    this.observable = pipe(single(x => x === 5))(obs3);

    this.marble.setObservable(this.observable);

    const obs = pipe(single(x => x === 10))(obs3);

    this.marble3.setObservable(obs);

    const obs2 = pipe(single(x => x > 3 && x <= 5))(obs3);

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

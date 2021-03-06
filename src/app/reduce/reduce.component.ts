import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter, scan, reduce, take } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reduce',
  templateUrl: './reduce.component.html',
  styleUrls: ['./reduce.component.css']
})
export class ReduceComponent implements OnInit, OnDestroy {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', { static: true })
  marble2: MarbleDiagramComponent;

  public observable: Observable<any>;
  public subscription: Subscription;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const obs3 = pipe(take(10))(
      interval(333)) as Observable<number>
    ;
    obs3.subscribe(x => this.marble2.addMarble(x), console.error, () => {
      this.marble2.stop();
      this.marble2.complete();
    });
    this.observable = pipe(reduce((acc: number, cur: number) => acc + cur, 0), tap(x => this.marble.addMarble(x)))(obs3);
    this.subscription = this.observable.subscribe(x => x, console.error, () => {
      this.marble.stop();
      this.marble.complete();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

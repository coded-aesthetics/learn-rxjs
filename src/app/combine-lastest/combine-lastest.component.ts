import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { pipe } from 'rxjs/util/pipe';
import { map, tap } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { zip } from 'rxjs/observable/zip';
import { Observable } from 'rxjs/Observable';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-combine-lastest',
  templateUrl: './combine-lastest.component.html',
  styleUrls: ['./combine-lastest.component.css']
})
export class CombineLastestComponent implements OnInit, OnDestroy {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', { static: true })
  marble2: MarbleDiagramComponent;
  @ViewChild('marble3', { static: true })
  marble3: MarbleDiagramComponent;
  public observable: Observable<any>;
  public subscription: Subscription;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const obs3 = pipe(map(x => (x as number).toString(36)))(
      interval(456)
    );
    obs3.subscribe(x => this.marble2.addMarble(x));
    const obs4 = pipe(map(x => (x as number).toString(36)))(interval(1100));
    obs4.subscribe(x => this.marble.addMarble(x));
    this.observable = pipe(tap(x => this.marble3.addMarble(x)))(combineLatest([obs3, obs4]));
    this.subscription = this.observable.subscribe(x => x);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

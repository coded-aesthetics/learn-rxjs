import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', { static: true })
  marble2: MarbleDiagramComponent;

  public observable: Observable<any>;
  public subscription: Subscription;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const obs3 =
      interval(333)
    ;
    obs3.subscribe(x => this.marble2.addMarble(x));
    this.observable = pipe(filter((x: number) => !(x % 2 === 0 || x % 3 === 0)), tap(x => this.marble.addMarble(x)))(obs3);
    this.subscription = this.observable.subscribe(x => x);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

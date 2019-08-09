import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter, scan } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit, OnDestroy {
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
    this.observable = pipe(scan((acc: number, cur: number) => acc + cur, 0), tap(x => this.marble.addMarble(x)))(obs3);
    this.subscription = this.observable.subscribe(x => x);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

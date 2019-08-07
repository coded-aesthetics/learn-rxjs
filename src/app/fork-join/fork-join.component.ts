import { Component, OnInit, ViewChild } from '@angular/core';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, take } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { zip } from 'rxjs/observable/zip';
import { Observable } from 'rxjs/Observable';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { timer } from 'rxjs/observable/timer';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { from } from 'rxjs/observable/from';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.css']
})
export class ForkJoinComponent implements OnInit {
  @ViewChild('marble')
  marble: MarbleDiagramComponent;
  @ViewChild('marble2')
  marble2: MarbleDiagramComponent;
  @ViewChild('marble3')
  marble3: MarbleDiagramComponent;
  @ViewChild('marble4')
  marble4: MarbleDiagramComponent;
  public observable: Observable<any>;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const obs1 = pipe(take(4))(interval(500));
    const obs2 = from(Promise.resolve(8));
    const obs3 = timer(3000);
    this.observable = forkJoin(
      obs1,
      obs2,
      obs3
    );
    obs1.subscribe(x => this.marble2.addMarble(x), console.error, () => {
      this.marble2.complete();
    });
    obs2.subscribe(x => this.marble.addMarble(x), console.error, () => {
      this.marble.complete();
    });
    obs3.subscribe(x => this.marble3.addMarble(x), console.error, () => {
      this.marble3.complete();
    });
    this.observable.subscribe(x => this.marble4.addMarble(x), console.error, () => {
      this.marble4.complete();
      this.marble4.stop();
      this.marble3.stop();
      this.marble2.stop();
      this.marble.stop();
    })
  }

}

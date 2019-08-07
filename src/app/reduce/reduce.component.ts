import { Component, OnInit, ViewChild } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter, scan, reduce, take } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-reduce',
  templateUrl: './reduce.component.html',
  styleUrls: ['./reduce.component.css']
})
export class ReduceComponent implements OnInit {
  @ViewChild('marble')
  marble: MarbleDiagramComponent;
  @ViewChild('marble2')
  marble2: MarbleDiagramComponent;

  public observable: Observable<any>;

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
    this.observable = pipe(reduce((acc, cur) => acc + cur, 0), tap(x => this.marble.addMarble(x)))(obs3);
    this.observable.subscribe(x => x, console.error, () => {
      this.marble.stop();
      this.marble.complete();
    });
  }
}

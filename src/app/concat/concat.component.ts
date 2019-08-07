import { Component, OnInit, ViewChild } from '@angular/core';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, take } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { zip } from 'rxjs/observable/zip';
import { Observable } from 'rxjs/Observable';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { concat } from 'rxjs/observable/concat';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.css']
})
export class ConcatComponent implements OnInit {
  @ViewChild('marble')
  marble: MarbleDiagramComponent;
  @ViewChild('marble2')
  marble2: MarbleDiagramComponent;
  @ViewChild('marble3')
  marble3: MarbleDiagramComponent;
  public observable: Observable<any>;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const obs3 = pipe(take(7), map(x => (x as number).toString(36)))(
      interval(333)
    );
    obs3.subscribe(x => this.marble2.addMarble(x), console.error, () => {
      this.marble2.complete();
    });
    const obs4 = pipe(take(7), map(x => ((x as number) + 10).toString(36)))(interval(330));
    obs4.subscribe(x => this.marble.addMarble(x), console.error, () => {
      this.marble.complete();
    });
    this.observable = pipe(tap(x => this.marble3.addMarble(x)))(concat(obs3, obs4));
    this.observable.subscribe(x => x, console.error, () => {
      this.marble3.complete();
      this.marble.stop();
      this.marble2.stop();
      this.marble3.stop();
    })
  }

}

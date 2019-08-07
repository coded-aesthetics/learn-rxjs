import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, throttleTime, tap } from 'rxjs/operators';
import { pipe } from 'rxjs/util/pipe';
import { interval } from 'rxjs/observable/interval';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';

@Component({
  selector: 'app-throttle',
  templateUrl: './throttle.component.html',
  styleUrls: ['./throttle.component.css']
})
export class ThrottleComponent implements OnInit {
  @ViewChild('marble')
  marble: MarbleDiagramComponent;
  @ViewChild('marble2')
  marble2: MarbleDiagramComponent;

  public observable: Observable<any>;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const obs3 = pipe(map(x => (x as number).toString(36)))(
      interval(333)
    );
    obs3.subscribe(x => this.marble2.addMarble(x));
    this.observable = pipe(throttleTime(1000), tap(x => this.marble.addMarble(x)))(obs3);
  }
}

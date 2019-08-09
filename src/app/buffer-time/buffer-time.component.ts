import { Component, OnInit, ViewChild } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { map, throttleTime, tap, bufferTime, filter, share } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { pipe } from 'rxjs/util/pipe';

@Component({
  selector: 'app-buffer-time',
  templateUrl: './buffer-time.component.html',
  styleUrls: ['./buffer-time.component.css']
})
export class BufferTimeComponent implements OnInit {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', { static: true })
  marble2: MarbleDiagramComponent;

  public observable: Observable<any>;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const obs3 = pipe(filter(() => Math.random() < 0.1), map(x => (x as number).toString(36)))(
      interval(100)
    );
    const sharedExample = obs3.pipe(share());
    sharedExample.subscribe(x => this.marble2.addMarble(x));
    this.observable = pipe(bufferTime(1000), map(x => JSON.stringify(x).split('"').join('')),
      tap(x => this.marble.addMarble(x)))(sharedExample);
  }
}

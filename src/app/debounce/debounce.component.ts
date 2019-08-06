import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, filter, debounceTime, tap, share } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';

@Component({
  selector: 'app-debounce',
  templateUrl: './debounce.component.html',
  styleUrls: ['./debounce.component.css']
})
export class DebounceComponent implements OnInit {
  @ViewChild('marble')
  marble: MarbleDiagramComponent;
  @ViewChild('marble2')
  marble2: MarbleDiagramComponent;

  public observable: Observable<any>;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const obs3 = pipe(filter(() => Math.random() < 0.2), map(x => x.toString(36)))(
      interval(100)
    );
    const sharedExample = obs3.pipe(share());
    sharedExample.subscribe(x => this.marble2.addMarble(x));
    this.observable = pipe(debounceTime(500), tap(x => this.marble.addMarble(x)))(sharedExample);
  }

}

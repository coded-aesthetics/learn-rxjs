import { Component, OnInit, ViewChild } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter, elementAt, take, share, distinct } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-distinct',
  templateUrl: './distinct.component.html',
  styleUrls: ['./distinct.component.css']
})
export class DistinctComponent implements OnInit {
  @ViewChild('marble')
  marble: MarbleDiagramComponent;
  @ViewChild('marble2')
  marble2: MarbleDiagramComponent;

  constructor() {}

  ngOnInit() {
    const obs3 =
      interval(333).pipe(map(() => Math.ceil(Math.random() * 20)), share());
    this.marble2.setObservable(obs3, true);
    this.marble.setObservable(pipe(distinct())(obs3), true);
  }
}

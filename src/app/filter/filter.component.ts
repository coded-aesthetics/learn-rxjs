import { Component, OnInit, ViewChild } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @ViewChild('marble')
  marble: MarbleDiagramComponent;
  @ViewChild('marble2')
  marble2: MarbleDiagramComponent;

  public observable: Observable<any>;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const obs3 =
      interval(333)
    ;
    obs3.subscribe(x => this.marble2.addMarble(x));
    this.observable = pipe(filter((x: number) => !(x % 2 === 0 || x % 3 === 0)), tap(x => this.marble.addMarble(x)))(obs3);
  }
}

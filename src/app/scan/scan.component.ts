import { Component, OnInit, ViewChild } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter, scan } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {
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
    this.observable = pipe(scan((acc, cur) => acc + cur, 0), tap(x => this.marble.addMarble(x)))(obs3);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, take } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { zip } from 'rxjs/observable/zip';
import { Observable } from 'rxjs/Observable';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { range } from 'rxjs';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css']
})
export class ZipComponent implements OnInit {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', { static: true })
  marble2: MarbleDiagramComponent;
  @ViewChild('marble3', { static: true })
  marble3: MarbleDiagramComponent;
  @ViewChild('marble4', { static: true })
  marble4: MarbleDiagramComponent;

  public observable: Observable<any>;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const obs3 = pipe(take(10), map(x => (x as number).toString(36)))(
      interval(678)
    );
    this.marble2.setObservable(obs3, true);
    const obs4 = pipe(map(x => (x as number).toString(36)))(interval(1100));
    const obs5 = range(10).pipe(map(x => (x + 10).toString(36)));
    this.marble.setObservable(obs4);
    this.marble4.setObservable(obs5);
    this.observable = zip(obs3, obs4, obs5);
    this.marble3.setObservable(this.observable);
  }

}

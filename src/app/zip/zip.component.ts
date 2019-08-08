import { Component, OnInit, ViewChild } from '@angular/core';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, take } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { zip } from 'rxjs/observable/zip';
import { Observable } from 'rxjs/Observable';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';

@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css']
})
export class ZipComponent implements OnInit {
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
    const obs3 = pipe(take(10), map(x => (x as number).toString(36)))(
      interval(678)
    );
    this.marble2.setObservable(obs3, true);
    const obs4 = pipe(map(x => (x as number).toString(36)))(interval(1100));
    this.marble.setObservable(obs4);
    this.observable = zip(obs3, obs4);
    this.marble3.setObservable(this.observable);
  }

}

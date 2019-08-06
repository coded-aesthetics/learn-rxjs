import { Component, OnInit, ViewChild } from '@angular/core';
import { pipe } from 'rxjs/util/pipe';
import { map, tap } from 'rxjs/operators';
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
    const obs3 = pipe(map(x => x.toString(36)))(
      interval(333)
    );
    obs3.subscribe(x => this.marble2.addMarble(x));
    const obs4 = pipe(map(x => x.toString(36)))(interval(1100));
    obs4.subscribe(x => this.marble.addMarble(x));
    this.observable = pipe(tap(x => this.marble3.addMarble(x)))(zip(obs3, obs4);
  }

}

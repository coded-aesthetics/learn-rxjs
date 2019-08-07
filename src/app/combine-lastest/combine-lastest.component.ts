import { Component, OnInit, ViewChild } from '@angular/core';
import { pipe } from 'rxjs/util/pipe';
import { map, tap } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { zip } from 'rxjs/observable/zip';
import { Observable } from 'rxjs/Observable';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-combine-lastest',
  templateUrl: './combine-lastest.component.html',
  styleUrls: ['./combine-lastest.component.css']
})
export class CombineLastestComponent implements OnInit {
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
      interval(456)
    );
    obs3.subscribe(x => this.marble2.addMarble(x));
    const obs4 = pipe(map(x => x.toString(36)))(interval(1100));
    obs4.subscribe(x => this.marble.addMarble(x));
    this.observable = pipe(tap(x => this.marble3.addMarble(x)))(combineLatest(obs3, obs4));
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { mergeMap, take } from 'rxjs/operators';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.css']
})
export class MergeMapComponent implements OnInit {
  @ViewChild('marble')
  marble: MarbleDiagramComponent;

  observables: Observable<any>[] = [];

  constructor() { }

  removeObs (obs: Observable<any>) {
    this.observables = this.observables.filter(x => x !== obs);
  }

  ngOnInit() {
    const obs = fromEvent(document, 'click').pipe(
      mergeMap(x => {
        const obs = pipe(take(Math.round(Math.random() * 10)))(timer(0, Math.random() * 1000 + 1000));
        this.observables.push(obs);
        obs.subscribe(x => x, console.error, () => {
          this.removeObs(obs);
        });
        return obs;
      })
    );

    this.marble.setObservable(obs);
  }

}

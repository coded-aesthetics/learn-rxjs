import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { mergeMap, take } from 'rxjs/operators';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { getRandomColor } from '../common/util/randomColor';
import { addColorOpThunk, addColorOp } from '../common/util/addColor';
import { primaryColor, highlightColor, secondaryColor } from '../common/colors';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.css']
})
export class MergeMapComponent implements OnInit {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;

  observables$: {color: string, observable: Observable<any>}[] = [];
  get observables() {
    return this.observables$.map(x => x.observable);
  }
  colors = [primaryColor, highlightColor, secondaryColor];

  constructor() { }

  removeObs (obs: Observable<any>) {
    this.observables$ = this.observables$.filter(x => x.observable !== obs);
  }

  ngOnInit() {
    const obs = fromEvent(document, 'click').pipe(
      mergeMap(x => {
        const freeColors = this.colors.filter(x => !(this.observables$.map(y => y.color).includes(x)) );
        const color = freeColors.length > 0 ? freeColors[0] : getRandomColor();
        const obs = pipe(take(Math.round(Math.random() * 10)), addColorOp(color))(timer(0, Math.random() * 1000 + 1000));
        this.observables$.push({color, observable: obs});
        obs.subscribe(x => x, console.error, () => {
          this.removeObs(obs);
        });
        return obs;
      })
    );

    this.marble.setObservable(obs);
  }

}

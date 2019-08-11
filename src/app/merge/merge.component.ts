import { Component, OnInit, ViewChild } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { merge } from 'rxjs/observable/merge';
import { highlightColor } from '../common/colors';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit {

  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', { static: true })
  marble2: MarbleDiagramComponent;
  @ViewChild('marble3', { static: true })
  marble3: MarbleDiagramComponent;
  public observable: Observable<any>;
  constructor() {}

  ngOnInit() {
    const obs3 = pipe(map(x => (x as number).toString(36)))(
      interval(678)
    );
    this.marble2.setObservable(obs3);
    const obs4 = pipe(map(x => ({msg: (x as number).toString(36), color: highlightColor})))(interval(1100));
    this.marble.setObservable(obs4);
    const obs = merge(obs3, obs4);
    this.marble3.setObservable(obs);
  }
}

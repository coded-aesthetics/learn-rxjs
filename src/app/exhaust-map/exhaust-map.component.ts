import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, withLatestFrom, scan, exhaustMap, take } from 'rxjs/operators';
import { pipe, timer } from 'rxjs';
import { from } from 'rxjs/observable/from';
import { interval } from 'rxjs/observable/interval';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';

@Component({
  selector: 'app-exhaust-map',
  templateUrl: './exhaust-map.component.html',
  styleUrls: ['./exhaust-map.component.css']
})
export class ExhaustMapComponent implements OnInit {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  public observable: Observable<any>;

  constructor() { }

  ngOnInit() {
    const clicks = fromEvent(document, 'click');
    let clickCount = pipe(scan((acc) => acc + 1, 0))(clicks);
    const result = clicks.pipe(withLatestFrom(clickCount), exhaustMap(([ev, ct]) => pipe(map(() => ct), take(4))(timer(0, 300))));
    this.marble.setObservable(result);
  }

}

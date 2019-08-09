import { Component, OnInit, ViewChild } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter, elementAt, take } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-element-at',
  templateUrl: './element-at.component.html',
  styleUrls: ['./element-at.component.css']
})
export class ElementAtComponent implements OnInit {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', { static: true })
  marble2: MarbleDiagramComponent;

  constructor() {}

  ngOnInit() {
    const obs3 =
      interval(333).pipe(take(7))
    ;
    this.marble2.setObservable(obs3, true);
    this.marble.setObservable(pipe(elementAt(3))(obs3));
    obs3.subscribe(x => x, console.error, () => {
      this.marble.stop();
    });
  }
}

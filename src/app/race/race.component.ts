import { Component, OnInit, ViewChild } from '@angular/core';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, take } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { zip } from 'rxjs/observable/zip';
import { Observable } from 'rxjs/Observable';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { race } from 'rxjs';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {
  @ViewChild('marble', { static: true })
  marble: MarbleDiagramComponent;
  @ViewChild('marble2', { static: true })
  marble2: MarbleDiagramComponent;
  @ViewChild('marble3', { static: true })
  marble3: MarbleDiagramComponent;
  @ViewChild('marble4', { static: true })
  marble4: MarbleDiagramComponent;

  constructor() {}

  ngOnInit() {
    const obs1 = interval(Math.random() * 5000);
    const obs2 = interval(Math.random() * 5000);
    const obs3 = interval(Math.random() * 5000);
    const obs4 = race(obs1, obs2, obs3);

    this.marble.setObservable(obs1);
    this.marble2.setObservable(obs2);
    this.marble3.setObservable(obs3);
    this.marble4.setObservable(obs4);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MarbleDiagramComponent } from '../marble-diagram/marble-diagram.component';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs/util/pipe';
import { map, tap, filter } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';
import { pairs } from 'rxjs/observable/pairs';

@Component({
  selector: 'app-pairs',
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.css']
})
export class PairsComponent implements OnInit {
  observableOutput = '';
  obj = {a: 2, b: 3, c:4};
  public observable: Observable<any>;

  constructor() {}

  ngOnInit() {
    const startTime = Date.now();
    const obs3 =
      interval(333)
    ;
    pairs(this.obj).subscribe(x => this.observableOutput += ' ' + JSON.stringify(x));
  }
}

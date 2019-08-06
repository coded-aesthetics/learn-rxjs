import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { from } from 'rxjs/observable/from';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.css'],
  providers:  [ ApiService ]
})
export class SwitchMapComponent implements OnInit {
  public observable: Observable<any>;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
    const getFromApiInc = (fn: (x: any) => Promise<any>) => pipe(map(x => (x as number) + 1), switchMap(x => from(fn(x))));

    const obs1 = pipe(map(x => (x as any).title))(getFromApiInc(this.apiService.getTodo)(interval(500)));
    const obs2 = pipe(map(x => (x as any).body))(getFromApiInc(this.apiService.getPost)(interval(500)));

    this.observable = pipe(withLatestFrom(obs2), map(x => x[0] + ' <---> ' + x[1]))(obs1);
  }

}

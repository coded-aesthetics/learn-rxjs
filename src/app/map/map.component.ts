import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  ngOnInit() {
    of(1, 2, 3, 4, 5)
      .pipe(map(x => x * 2))
      .subscribe(console.log);
  }
}

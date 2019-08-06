import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { map, tap } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-marble-diagram',
  templateUrl: './marble-diagram.component.html',
  styleUrls: ['./marble-diagram.component.css']
})
export class MarbleDiagramComponent implements OnInit {
  @ViewChild('canvas')
  canvas: any;

  ctx: CanvasRenderingContext2D;

  marbles: {xPos: number, text: string}[] = [];

  moveservable: Observable<number>;

  lastTime: number = Date.now();

  constructor() { }

  ngOnInit() {
    this.moveservable = interval(1);
    this.ctx = this.canvas.nativeElement.getContext('2d');
    pipe(map(x => Date.now() - this.lastTime), tap(() => this.lastTime = Date.now()))(this.moveservable).subscribe(this.redraw.bind(this));
  }

  addMarble(msg: any) {
    this.marbles.push({text: msg, xPos: 600});
  }

  redraw(offsetXDelta: number) {
    this.marbles = this.marbles.filter(x => x.xPos > -20).map(x => ({text: x.text, xPos: x.xPos - offsetXDelta / 8}));
    this.ctx.clearRect(0, 0, this.ctx.canvas.width + 20, this.ctx.canvas.height + 20);
    this.ctx.fillStyle = 'blue';
    this.ctx.strokeStyle = 'blue';
    this.ctx.beginPath();       // Start a new path
    this.ctx.moveTo(0, 35);
    this.ctx.lineTo(600, 35);
    this.ctx.stroke();
    this.marbles.forEach(x => {
      this.ctx.fillStyle = 'white';
      this.ctx.strokeStyle = 'blue';
      this.ctx.beginPath();       // Start a new path
      this.ctx.arc(x.xPos, 35, 20, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.font = '16px serif';
      const dim = this.ctx.measureText(x.text);
      this.ctx.fillStyle = 'blue';
      this.ctx.fillText(x.text, x.xPos - dim.width / 2, 35 + 5);
      this.lastTime
    });
  }
}

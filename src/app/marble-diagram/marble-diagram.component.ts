import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, pipe, Subscription } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import { map, tap } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-marble-diagram',
  templateUrl: './marble-diagram.component.html',
  styleUrls: ['./marble-diagram.component.css']
})
export class MarbleDiagramComponent implements OnInit, OnDestroy, OnChanges {
  @Input() observable: Observable<any>;

  @ViewChild('canvas', { static: true })
  canvas: any;

  ctx: CanvasRenderingContext2D;

  marbles: {xPos: number, text: string}[] = [];

  moveservable: Observable<number>;

  lastTime: number = Date.now();

  isStopped = false;

  completedXPos: number | undefined = undefined;
  startedXPos: number | undefined = undefined;

  sub: Subscription;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.observable.currentValue) {
      this.setObservable(changes.observable.currentValue);
    }
  }

  ngOnInit() {
    if (this.observable) {
      this.setObservable(this.observable);
    }
    this.moveservable = interval(1);
    this.ctx = this.canvas.nativeElement.getContext('2d');
    pipe(map(x => Date.now() - this.lastTime), tap(() => this.lastTime = Date.now()))(this.moveservable).subscribe(this.redraw.bind(this));
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  setObservable(obs: Observable<any>, stopOnComplete = false) {
    this.startedXPos = 600 - 20;
    this.completedXPos = undefined;
    this.marbles = [];
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = obs.subscribe(x => this.addMarble(x), console.error, stopOnComplete ? () => {this.complete(); this.stop(); } : this.complete.bind(this));
  }

  addMarble(msg: any) {
    this.marbles.push({text: msg, xPos: 600 - 20});
  }

  stop() {
    this.isStopped = true;
  }

  restart() {
    this.isStopped = false;
  }

  complete() {
    this.completedXPos = 600 - 20;
  }

  redraw(offsetXDelta: number) {
    this.marbles = this.isStopped ?
      this.marbles : this.marbles.filter(x => x.xPos > -20).map(x => ({text: x.text, xPos: x.xPos - offsetXDelta / 8}));
    this.completedXPos = this.isStopped ?
      this.completedXPos : this.completedXPos - offsetXDelta / 8;
    this.startedXPos = this.isStopped ?
      this.startedXPos : this.startedXPos - offsetXDelta / 8;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width + 20, this.ctx.canvas.height + 20);

    this.ctx.lineWidth = 3;
    this.ctx.fillStyle = 'blue';
    this.ctx.strokeStyle = 'blue';
    this.ctx.beginPath();       // Start a new path
    this.ctx.moveTo(0, 35);
    this.ctx.lineTo(600, 35);
    this.ctx.stroke();
    if (this.completedXPos !== undefined) {
      this.ctx.strokeStyle = 'red';
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();       // Start a new path
      this.ctx.moveTo(this.completedXPos, 0);
      this.ctx.lineTo(this.completedXPos, 70);
      this.ctx.stroke();
    }
    if (this.startedXPos !== undefined) {
      this.ctx.fillStyle = 'lightgreen';
      this.ctx.strokeStyle = 'lightgreen';
      this.ctx.lineWidth = 4;
      this.ctx.beginPath();       // Start a new path
      this.ctx.arc(this.startedXPos, 35, 12, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.beginPath();       // Start a new path
      this.ctx.moveTo(this.startedXPos, 0);
      this.ctx.lineTo(this.startedXPos, 70);
      this.ctx.stroke();
    }

    this.ctx.lineWidth = 2;
    this.marbles.forEach(x => {
      this.ctx.fillStyle = 'white';
      this.ctx.strokeStyle = 'blue';

      this.ctx.font = '18px Lora';
      const dim = this.ctx.measureText(x.text);
      this.ctx.beginPath(); // Start a new path
      this.ctx.arc(x.xPos, 35, 23, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      if (dim.width > 23) {
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'blue';
        this.ctx.clearRect(x.xPos - dim.width / 2, 35 - 10, dim.width, 20);
      }
      this.ctx.fillStyle = 'blue';
      this.ctx.fillText(x.text, x.xPos - dim.width / 2, 35 + 6);
    });
  }
}

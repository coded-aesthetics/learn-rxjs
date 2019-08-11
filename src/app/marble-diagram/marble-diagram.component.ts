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

  marbles: {xPos: number, text: string, color?: string}[] = [];

  moveservable: Observable<number>;

  lastTime: number = Date.now();

  isStopped = false;

  completedXPos: number | undefined = undefined;
  startedXPos: number | undefined = undefined;

  sub: Subscription;

  marbleRadius = 23;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
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
    this.startedXPos = 600 - this.marbleRadius;
    this.completedXPos = undefined;
    this.marbles = [];
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = obs.subscribe(x => this.addMarble(x), console.error, stopOnComplete ? () => {this.complete(); this.stop(); } : this.complete.bind(this));
  }

  addMarble(msg: any  | { msg: any, color: string }) {
    if (msg.constructor.name === 'Object' && (msg.msg !== undefined || msg.msg === null)) {
      const color = msg.color;
      this.marbles.push({text: msg.msg, xPos: 600 - this.marbleRadius, color});
    } else {
      this.marbles.push({text: msg, xPos: 600 - this.marbleRadius});
    }
  }

  stop() {
    this.isStopped = true;
  }

  restart() {
    this.isStopped = false;
  }

  complete() {
    this.completedXPos = 600 - this.marbleRadius;
  }

  redraw(offsetXDelta: number) {
    this.updatePositions(offsetXDelta);
    this.clearDiagram();
    this.drawMarbleLine();
    if (this.completedXPos !== undefined) {
      this.drawCompleted();
    }
    if (this.startedXPos !== undefined) {
      this.drawStart();
    }

    this.ctx.lineWidth = 2;
    this.marbles.forEach(x => {
      this.drawMarble(x);
    });
  }

  private updatePositions(offsetXDelta: number) {
    this.marbles = this.isStopped ?
      this.marbles : this.marbles.filter(x => x.xPos > -this.marbleRadius).map(x => ({...x, xPos: x.xPos - offsetXDelta / 8}));
    this.completedXPos = this.isStopped ?
      this.completedXPos : this.completedXPos - offsetXDelta / 8;
    this.startedXPos = this.isStopped ?
      this.startedXPos : this.startedXPos - offsetXDelta / 8;
  }

  private clearDiagram() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width + 20, this.ctx.canvas.height + 20);
  }

  private drawMarble(x) {
    const color = x.color || '#03192B';
    this.ctx.fillStyle = 'white';
    this.ctx.strokeStyle = color;

    this.ctx.font = '18px Lora';
    const dim = this.ctx.measureText(x.text);
    this.ctx.beginPath(); // Start a new path
    this.ctx.arc(x.xPos, 35, this.marbleRadius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    if (dim.width > this.marbleRadius) {
      this.ctx.fillStyle = 'white';
      this.ctx.strokeStyle = color;
      this.ctx.clearRect(x.xPos - dim.width / 2, 35 - 10, dim.width, 20);
    }
    this.ctx.fillStyle = color;
    this.ctx.fillText(x.text, x.xPos - dim.width / 2, 35 + 6);
  }

  private drawMarbleLine() {
    this.ctx.lineWidth = 3;
    this.ctx.fillStyle = '#03192B';
    this.ctx.strokeStyle = '#03192B';
    this.ctx.beginPath();       // Start a new path
    this.ctx.moveTo(0, 35);
    this.ctx.lineTo(600, 35);
    this.ctx.stroke();
  }

  private drawStart() {
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

  private drawCompleted() {
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();       // Start a new path
    this.ctx.moveTo(this.completedXPos, 0);
    this.ctx.lineTo(this.completedXPos, 70);
    this.ctx.stroke();
  }
}


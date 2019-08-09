import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { ThrottleComponent } from './throttle/throttle.component';
import { DebounceComponent } from './debounce/debounce.component';
import { ZipComponent } from './zip/zip.component';
import { MergeComponent } from './merge/merge.component';
import { BufferTimeComponent } from './buffer-time/buffer-time.component';
import { FilterComponent } from './filter/filter.component';
import { MapComponent } from './map/map.component';
import { ScanComponent } from './scan/scan.component';
import { ReduceComponent } from './reduce/reduce.component';
import { CombineLastestComponent } from './combine-lastest/combine-lastest.component';
import { DistinctUntilChangedComponent } from './distinct-until-changed/distinct-until-changed.component';
import { ConcatComponent } from './concat/concat.component';
import { PairsComponent } from './pairs/pairs.component';
import { FromEventComponent } from './from-event/from-event.component';
import { ForkJoinComponent } from './fork-join/fork-join.component';
import { ExhaustMapComponent } from './exhaust-map/exhaust-map.component';
import { CombineAllComponent } from './combine-all/combine-all.component';
import { MergeMapComponent } from './merge-map/merge-map.component';
import { HotVsColdComponent } from './hot-vs-cold/hot-vs-cold.component';
import { ConcatMapComponent } from './concat-map/concat-map.component';
import { DelayWhenComponent } from './delay-when/delay-when.component';
import { ElementAtComponent } from './element-at/element-at.component';
import { DistinctComponent } from './distinct/distinct.component';
import { ReplaySubjectComponent } from './replay-subject/replay-subject.component';
import { AsyncSubjectComponent } from './async-subject/async-subject.component';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';
import { RaceComponent } from './race/race.component';

const routes: Routes = [
  { path: 'switchMap', component: SwitchMapComponent },
  { path: 'throttle', component: ThrottleComponent },
  { path: 'debounce', component: DebounceComponent },
  { path: 'zip', component: ZipComponent },
  { path: 'merge', component: MergeComponent },
  { path: 'race', component: RaceComponent },
  { path: 'bufferTime', component: BufferTimeComponent },
  { path: 'map', component: MapComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'reduce', component: ReduceComponent },
  { path: 'elementAt', component: ElementAtComponent },
  { path: 'combineLatest', component: CombineLastestComponent },
  { path: 'distinctUntilChanged', component: DistinctUntilChangedComponent },
  { path: 'distinct', component: DistinctComponent },
  { path: 'concat', component: ConcatComponent },
  { path: 'pairs', component: PairsComponent },
  { path: 'fromEvent', component: FromEventComponent },
  { path: 'forkJoin', component: ForkJoinComponent },
  { path: 'combineAll', component: CombineAllComponent },
  { path: 'exhaustMap', component: ExhaustMapComponent },
  { path: 'mergeMap', component: MergeMapComponent },
  { path: 'hotVsCold', component: HotVsColdComponent },
  { path: 'concatMap', component: ConcatMapComponent },
  { path: 'delayWhen', component: DelayWhenComponent },
  { path: 'replaySubject', component: ReplaySubjectComponent },
  { path: 'asyncSubject', component: AsyncSubjectComponent },
  { path: 'behaviorSubject', component: BehaviorSubjectComponent },
  { path: 'filter', component: FilterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

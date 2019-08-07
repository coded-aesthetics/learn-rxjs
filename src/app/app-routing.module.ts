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

const routes: Routes = [
  { path: 'switchMap', component: SwitchMapComponent },
  { path: 'throttle', component: ThrottleComponent },
  { path: 'debounce', component: DebounceComponent },
  { path: 'zip', component: ZipComponent },
  { path: 'merge', component: MergeComponent },
  { path: 'bufferTime', component: BufferTimeComponent },
  { path: 'map', component: MapComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'reduce', component: ReduceComponent },
  { path: 'combineLatest', component: CombineLastestComponent },
  { path: 'distinctUntilChanged', component: DistinctUntilChangedComponent },
  { path: 'concat', component: ConcatComponent },
  { path: 'pairs', component: PairsComponent },
  { path: 'fromEvent', component: FromEventComponent },
  { path: 'forkJoin', component: ForkJoinComponent },
  { path: 'combineAll', component: CombineAllComponent },
  { path: 'exhaustMap', component: ExhaustMapComponent },
  { path: 'filter', component: FilterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

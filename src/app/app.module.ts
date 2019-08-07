import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { ThrottleComponent } from './throttle/throttle.component';
import { DebounceComponent } from './debounce/debounce.component';
import { ZipComponent } from './zip/zip.component';
import { MarbleDiagramComponent } from './marble-diagram/marble-diagram.component';
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


@NgModule({
  declarations: [
    AppComponent,
    SwitchMapComponent,
    ThrottleComponent,
    DebounceComponent,
    ZipComponent,
    MarbleDiagramComponent,
    MergeComponent,
    BufferTimeComponent,
    FilterComponent,
    MapComponent,
    ScanComponent,
    ReduceComponent,
    CombineLastestComponent,
    DistinctUntilChangedComponent,
    ConcatComponent,
    PairsComponent,
    FromEventComponent,
    ForkJoinComponent,
    ExhaustMapComponent,
    CombineAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

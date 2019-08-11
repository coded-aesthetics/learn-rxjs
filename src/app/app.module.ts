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
import { HeaderComponent } from './header/header.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { FooterComponent } from './footer/footer.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { BufferCountComponent } from './buffer-count/buffer-count.component';
import { SingleComponent } from './single/single.component';
import { IgnoreElementsComponent } from './ignore-elements/ignore-elements.component';


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
    HeaderComponent,
    ExhaustMapComponent,
    CombineAllComponent,
    MergeMapComponent,
    HotVsColdComponent,
    ConcatMapComponent,
    DelayWhenComponent,
    ElementAtComponent,
    DistinctComponent,
    ReplaySubjectComponent,
    AsyncSubjectComponent,
    BehaviorSubjectComponent,
    RaceComponent,
    PageHeaderComponent,
    FooterComponent,
    IntroductionComponent,
    BufferCountComponent,
    SingleComponent,
    IgnoreElementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

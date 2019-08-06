import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { ThrottleComponent } from './throttle/throttle.component';
import { DebounceComponent } from './debounce/debounce.component';
import { ZipComponent } from './zip/zip.component';
import { MarbleDiagramComponent } from './marble-diagram/marble-diagram.component';


@NgModule({
  declarations: [
    AppComponent,
    SwitchMapComponent,
    ThrottleComponent,
    DebounceComponent,
    ZipComponent,
    MarbleDiagramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

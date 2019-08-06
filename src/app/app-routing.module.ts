import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { ThrottleComponent } from './throttle/throttle.component';
import { DebounceComponent } from './debounce/debounce.component';
import { ZipComponent } from './zip/zip.component';

const routes: Routes = [
  { path: 'switchMap', component: SwitchMapComponent },
  { path: 'throttle', component: ThrottleComponent },
  { path: 'debounce', component: DebounceComponent },
  { path: 'zip', component: ZipComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

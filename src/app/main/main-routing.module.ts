import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestInterfaceComponent } from './test-interface/test-interface.component';
import { TestResultComponent } from './test-result/test-result.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'test', component: TestInterfaceComponent },
  { path: 'result', component: TestResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

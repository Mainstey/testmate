import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TestInterfaceComponent } from './test-interface/test-interface.component';
import { TestResultComponent } from './test-result/test-result.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';


@NgModule({
  declarations: [TestInterfaceComponent, TestResultComponent, WelcomePageComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }

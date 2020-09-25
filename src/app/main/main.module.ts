import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MainRoutingModule } from './main-routing.module';
import { TestInterfaceComponent } from './test-interface/test-interface.component';
import { TestResultComponent } from './test-result/test-result.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TestOverModalComponent } from './test-over-modal/test-over-modal.component';


@NgModule({
  declarations: [TestInterfaceComponent, TestResultComponent, WelcomePageComponent, TestOverModalComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    MainRoutingModule
  ],
  entryComponents: [TestOverModalComponent]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MainRoutingModule } from './main-routing.module';
import { TestInterfaceComponent } from './test-interface/test-interface.component';
import { TestResultComponent } from './test-result/test-result.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { TestOverModalComponent } from './test-over-modal/test-over-modal.component';
import { TestRemoteService } from './test-remote.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [TestInterfaceComponent, TestResultComponent, WelcomePageComponent, TestOverModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    MainRoutingModule
  ],
  providers: [TestRemoteService],
  entryComponents: [TestOverModalComponent]
})
export class MainModule { }

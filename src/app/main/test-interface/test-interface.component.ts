import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TestOverModalComponent } from '../test-over-modal/test-over-modal.component';
@Component({
  selector: 'app-test-interface',
  templateUrl: './test-interface.component.html',
  styleUrls: ['./test-interface.component.scss']
})
export class TestInterfaceComponent implements OnInit {
  public modalRef: BsModalRef;
  public isInstOpen: boolean;
  constructor(private modalService: BsModalService) { }

  public ngOnInit(): void {
    this.isInstOpen = JSON.parse(localStorage.getItem('isInstOpen'));
    console.log(this.isInstOpen);
  }

  public readInstructions(): void {
    this.isInstOpen = !this.isInstOpen;
    localStorage.setItem('isInstOpen', String(this.isInstOpen));
  }

  public openModal(): void {
    this.modalRef = this.modalService.show(TestOverModalComponent);
  }

}

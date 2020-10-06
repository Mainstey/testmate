import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DataSubjectService } from '../../core/data-subject.service';

@Component({
  selector: 'app-test-over-modal',
  templateUrl: './test-over-modal.component.html',
  styleUrls: ['./test-over-modal.component.scss']
})
export class TestOverModalComponent implements OnInit {
  public isModelTypeTimeOver: boolean = false;
  constructor(private dataSubject: DataSubjectService, private modalService: BsModalService) { }

  public ngOnInit(): void {

    this.dataSubject.on('isModalTypeOver').subscribe((response: any) => {
      this.isModelTypeTimeOver = response;
    });
  }

  public submitTest(): void {
    this.dataSubject.cast('submitTest', true);
    this.closeModal();
  }

  public closeModal(): void {
    this.modalService.hide();
  }

}

import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IOptions } from '../../data-interfaces/options.interface';
import { IQuestions } from '../../data-interfaces/questions.interface';
import { TestOverModalComponent } from '../test-over-modal/test-over-modal.component';
import { TestRemoteService } from '../test-remote.service';
import { Option } from '../../data-models/Option';
import { ThrowStmt } from '@angular/compiler';
import { ModalConfig } from '../../data-models/ModalConfig';

@Component({
  selector: 'app-test-interface',
  templateUrl: './test-interface.component.html',
  styleUrls: ['./test-interface.component.scss'],
})
export class TestInterfaceComponent implements OnInit {
  public modalRef: BsModalRef;
  public isInstOpen: boolean;
  public options: IOptions;
  public questions: IQuestions[];
  public questionNumber: number = 0;
  public disablePreviousButton: boolean = false;
  public disableNextButton: boolean = false;
  public modalConfig: ModalConfig;
  constructor(
    private modalService: BsModalService,
    private testRemoteService: TestRemoteService
  ) {}

  public ngOnInit(): void {
    this.isInstOpen = JSON.parse(localStorage.getItem('isInstOpen'));
    this.options = new Option();
    this.getQuestions();
  }

  private getQuestions(): void {
    this.testRemoteService.getQuestions().subscribe((response: any) => {
      if (response) {
        this.questions = response;
      }
    });
  }

  public showHideQuestions(index: number): void {
    if (index === this.questions.length) {
      this.openModal();
    }
    this.questionNumber = index;
  }

  public checkAndDisableButtons(): boolean {
    return this.questionNumber <= 0;
  }

  public readInstructions(): void {
    this.isInstOpen = !this.isInstOpen;
    localStorage.setItem('isInstOpen', String(this.isInstOpen));
  }

  public openModal(): void {
    this.modalConfig = new ModalConfig();
    this.modalRef = this.modalService.show(TestOverModalComponent, this.modalConfig);
  }
}

import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IOptions } from '../../data-interfaces/options.interface';
import { IQuestions } from '../../data-interfaces/questions.interface';
import { TestOverModalComponent } from '../test-over-modal/test-over-modal.component';
import { TestRemoteService } from '../test-remote.service';
import { Option } from '../../data-models/Option';
import { ModalConfig } from '../../data-models/ModalConfig';
import { DataSubjectService } from '../../core/data-subject.service';

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
  public hours: number = 2;
  public minutes: number = 60;
  public seconds: number = 60;
  public timeRemaining: string = '';
  public isModalTypeOver: boolean = false;
  private selectedOptions: any[] = [];
  constructor(
    private modalService: BsModalService,
    private testRemoteService: TestRemoteService,
    private dataSubject: DataSubjectService
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
        setInterval(() => this.showCLock(), 1000);
      }
    });
  }

  public selectOption(option: string, quesiton_id: string): void {
    console.log(option + quesiton_id);
  }

  public showHideQuestions(index: number): void {
    if (index === this.questions.length) {
      this.openModal();
    } else {
      this.questionNumber = index;
    }
  }

  public showCLock(): void {
    this.seconds --;
    if(this.seconds === 0) {
      this.minutes --;
      this.seconds = 59;
      if (this.minutes === 0) {
        this.hours --;
        this.minutes = 59;
        if (this.hours === 0) {
          clearInterval();
        }
      }
    }
    this.timeRemaining = this.hours + ':' + this.minutes + ':' + '0' + this.seconds;
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
    this.dataSubject.cast('isModalTypeOver', this.isModalTypeOver);
  }
}

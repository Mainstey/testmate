import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IOptions } from '../../data-interfaces/options.interface';
import { IQuestions } from '../../data-interfaces/questions.interface';
import { TestOverModalComponent } from '../test-over-modal/test-over-modal.component';
import { TestRemoteService } from '../test-remote.service';
import { Option } from '../../data-models/Option';
import { ModalConfig } from '../../data-models/ModalConfig';
import { DataSubjectService } from '../../core/data-subject.service';
import { ISelectedOptions } from '../../data-interfaces/selected_options.interface';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-test-interface',
  templateUrl: './test-interface.component.html',
  styleUrls: ['./test-interface.component.scss'],
})
export class TestInterfaceComponent implements OnInit, OnDestroy {
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
  public isOptionSelected: boolean = false;
  public questionStatus: any[] = [];
  public isOptionChecked: boolean = false;
  private isComponentChanged: boolean = true;
  private selectedOptions: any[] = [];

  constructor(
    private modalService: BsModalService,
    private testRemoteService: TestRemoteService,
    private dataSubject: DataSubjectService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.isInstOpen = JSON.parse(localStorage.getItem('isInstOpen')) || true;
    this.options = new Option();
    this.getQuestions();
    this.dataSubject
      .on('submitTest')
      .pipe(takeWhile(() => this.isComponentChanged))
      .subscribe((response: any) => {
        if (response) {
          this.submitTest();
        }
      });
  }

  private getQuestions(): void {
    this.testRemoteService
      .getQuestions()
      .pipe(takeWhile(() => this.isComponentChanged))
      .subscribe((response: any) => {
        if (response) {
          this.questions = response;
          this.questions.forEach((item: IQuestions) => {
            this.questionStatus.push({id: item.id, isSelected: false});
          })
          setInterval(() => this.showCLock(), 1000);
        }
      });
  }

  public selectOption($event: any, question_id: string): void {
    // find index for selected option
    const index = this.selectedOptions.findIndex(
      (option: ISelectedOptions) => option.question_id === question_id
    );
    // code for status change on option click
    this.questionStatus.forEach((item: any) => {
      if (item.id === question_id) {
        item.isSelected = true;
      }
    });
    // add and modify options selected and store it in array
    if (index === -1) {
      this.selectedOptions.push({ option: $event.target.value, question_id: question_id });
    } else {
      this.selectedOptions.splice(index, 1, {
        option: $event.target.value,
        question_id: question_id
      });
    }
  }

  public showHideQuestions(index: number): void {
    if (index === this.questions.length) {
      this.openModal();
    } else {
      this.questionNumber = index;
    }
  }

  public showCLock(): void {
    this.seconds--;
    if (this.seconds === 0) {
      this.minutes--;
      this.seconds = 59;
      if (this.minutes === 0) {
        this.hours--;
        this.minutes = 59;
        if (this.hours === 0) {
          clearInterval();
          this.isModalTypeOver = true;
          this.openModal();
        }
      }
    }
    this.timeRemaining =
      this.hours + ':' + this.minutes + ':' + '0' + this.seconds;
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
    this.modalRef = this.modalService.show(
      TestOverModalComponent,
      this.modalConfig
    );
    this.dataSubject.cast('isModalTypeOver', this.isModalTypeOver);
  }

  private submitTest(): void {
    this.testRemoteService
      .getResults(this.selectedOptions)
      .pipe(takeWhile(() => this.isComponentChanged))
      .subscribe((response: any) => {
        if (response && response.result) {
          localStorage.setItem('result', response.result);
          this.router.navigate(['result']);
        }
      });
  }

  public ngOnDestroy(): void {
    this.isComponentChanged = false;
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  public testResult: string = '';
  constructor() { }

  ngOnInit(): void {
    this.testResult = localStorage.getItem('result');
  }

}

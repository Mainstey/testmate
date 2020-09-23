import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-interface',
  templateUrl: './test-interface.component.html',
  styleUrls: ['./test-interface.component.scss']
})
export class TestInterfaceComponent implements OnInit {

  public isInstOpen: boolean;
  constructor() { }

  public ngOnInit(): void {
    this.isInstOpen = JSON.parse(localStorage.getItem('isInstOpen'));
    console.log(this.isInstOpen);
  }

  public readInstructions(): void {
    this.isInstOpen = !this.isInstOpen;
    localStorage.setItem('isInstOpen', String(this.isInstOpen));
  }

}

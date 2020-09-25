import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOverModalComponent } from './test-over-modal.component';

describe('TestOverModalComponent', () => {
  let component: TestOverModalComponent;
  let fixture: ComponentFixture<TestOverModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestOverModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOverModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

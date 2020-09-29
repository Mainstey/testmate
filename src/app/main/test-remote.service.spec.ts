import { TestBed } from '@angular/core/testing';

import { TestRemoteService } from './test-remote.service';

describe('TestRemoteService', () => {
  let service: TestRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

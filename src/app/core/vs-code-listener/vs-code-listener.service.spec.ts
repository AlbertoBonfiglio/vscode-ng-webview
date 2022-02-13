import { TestBed } from '@angular/core/testing';

import { VsCodeListenerService } from './vs-code-listener.service';

describe('VsCodeListenerService', () => {
  let service: VsCodeListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VsCodeListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

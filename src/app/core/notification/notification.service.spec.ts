import { TestBed } from '@angular/core/testing';
import { VsCodeListenerService } from 'src/app/core/vs-code-listener/vs-code-listener.service';

import { NotificationService } from './notification.service';

let service: NotificationService;
let vscodeSvcSpy: jasmine.SpyObj<VsCodeListenerService>;

describe('NotificationsService', () => {
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('VsCodeListenerService',
      ['warn', 'alert', 'info']);

    await TestBed.configureTestingModule({
      providers: [
        NotificationService,
        {provide: VsCodeListenerService, useValue: spy },
      ],
    });
    service = TestBed.inject(NotificationService);
    vscodeSvcSpy = TestBed.inject(
      VsCodeListenerService
    ) as jasmine.SpyObj<VsCodeListenerService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

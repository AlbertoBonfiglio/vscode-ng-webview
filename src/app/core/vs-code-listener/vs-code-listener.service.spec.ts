import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { VsCodeListenerService } from './vs-code-listener.service';

let store: MockStore;
let windowSpy: jasmine.SpyObj<Window>;
let service: VsCodeListenerService;
const initialState = { loggedIn: false };

describe('VsCodeListenerService', () => {
  const spy = jasmine.createSpyObj('Window', [
    'vsCodeApi.postMessage',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VsCodeListenerService,
        { provide: Window, useValue: spy },
        provideMockStore({ initialState }),
      ],
    });
    service = TestBed.inject(VsCodeListenerService);
    store = TestBed.inject(MockStore);
    windowSpy = TestBed.inject(
      Window
    ) as jasmine.SpyObj<Window>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

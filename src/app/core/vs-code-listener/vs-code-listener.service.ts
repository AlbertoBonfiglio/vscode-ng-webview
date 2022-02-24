import { Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Observable, fromEventPattern, takeUntil, filter, tap, map } from 'rxjs';
import { environment as env } from 'environments/environment';
import {
  IVsCodeMessage,
  SETTINGS_TRANSMIT_NEW,
  SETTINGS_LOAD,
} from 'ext-src/interfaces';
import { SettingsActions } from 'src/app/core/core.module';
import { AppState } from 'src/app/core/core.state';

const VSCODEAPI_NOT_FOUND = 'vsCodeApi not found on window object. Did you create the script in index.html?';

@Injectable({
  providedIn: 'root',
})
export class VsCodeListenerService implements OnDestroy {
  private windowRef: any;
  private _destroy$ = new Subject();
  public onMessage$: Observable<Event> = new Observable<Event>();

  constructor(
    private rendererFactory2: RendererFactory2,
    private window: Window,
    private store: Store<AppState>
  ) {
    this.windowRef = this.window; // so that we don't have to constantly cast it to any
    if (!env.production && !this.windowRef.vsCodeApi) {
      console.error(VSCODEAPI_NOT_FOUND);
      // throw new Error(VSCODEAPI_NOT_FOUND);
    }

    const renderer = this.rendererFactory2.createRenderer(null, null);
    this.createOnMessageObservable(renderer);
    this.initializeObservableStream();
  }

  public init(): Promise<void> {
    return new Promise<void>((resolve, reject) => resolve());
  }

  private initializeObservableStream(): void {
    this.onMessage$
      .pipe(
        map((event) => (event as any).data as IVsCodeMessage),
        // only react to incoming messages from the vs code extension
        filter((msg: IVsCodeMessage) =>
          msg ? msg.source === `${env.extension.prefix}-${env.appName}` : false
        ),
        tap((msg: IVsCodeMessage) => {
          switch (msg.type) {
            case SETTINGS_LOAD:
              this.store.dispatch(
                SettingsActions.loadStateFromVsCodeSuccess({
                  payload: msg.payload,
                })
              );
              break;

            case SETTINGS_TRANSMIT_NEW:
              this.store.dispatch(SettingsActions.receiveSettingValue(msg));
              break;

            default:
              // unknown message
              const unknownMessageWarning = {
                type: 'warn',
                payload: `🐛 got an unknown message`,
              } as IVsCodeMessage;
              this.postMessage(unknownMessageWarning);
              break;
          }
        })
      )
      .subscribe((msg: IVsCodeMessage) => {
        console.log('[NG APP] processed a message', msg);
      });
  }

  private createOnMessageObservable(renderer: Renderer2) {
    let removeOnMessageEventListener: () => void;
    const createOnMessageEventListener = (
      handler: (e: Event) => boolean | void
    ) => {
      removeOnMessageEventListener = renderer.listen(
        'window',
        'message',
        handler
      );
    };

    this.onMessage$ = fromEventPattern<Event>(
      createOnMessageEventListener,
      () => removeOnMessageEventListener()
    ).pipe(takeUntil(this._destroy$));
  }

  public postMessage(payload: IVsCodeMessage): void {
    if (this.windowRef.vsCodeApi) {
      payload.source = `NG-${env.appName}`;
      this.windowRef.vsCodeApi.postMessage(payload);
    } else {
      console.log('[NG APP] Attempting to send message to vsCode.', payload);
    }
  }

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}

import { Injectable, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject, Observable, fromEventPattern, takeUntil } from 'rxjs';
import { environment
 } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class VsCodeListenerService implements OnDestroy {
  private windowRef: any;
  private _destroy$ = new Subject();
  public onMessage$: Observable<Event> = new Observable<Event>();

  constructor(
    private rendererFactory2: RendererFactory2,
    private window: Window
  ) {
    this.windowRef = this.window; // so that we don't have to constantly cast it to any
    if (!environment.production && !this.windowRef.vsCodeApi) {
      console.error();
      ('vsCodeApi not found on window object. Did you create the script in index.html?')
    }
    const renderer = this.rendererFactory2.createRenderer(null, null);
    this.createOnMessageObservable(renderer);
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

  public postMessage(message: {}): void {
    this.windowRef.vsCodeApi.postMessage(message);
  }

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}

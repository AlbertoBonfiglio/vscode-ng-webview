import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { IVsCodeMessage } from "ext-src/interfaces";
import { tap, combineLatest } from "rxjs";
import { SettingsActions } from "src/app/core/core.module";
import { VsCodeListenerService } from "src/app/core/vs-code-listener/vs-code-listener.service";

@Injectable()
export class SettingsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly vsCode: VsCodeListenerService
  ) {}

  readonly loadStateFromVscode = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SettingsActions.loadStateFromVsCode),
        tap(() =>
          this.vsCode.postMessage({ type: 'loadSettings' } as IVsCodeMessage)
        )
      ),
    { dispatch: false }
  );

  readonly loadStateFromVscodeSuccess = createEffect(
    () =>
      combineLatest([
        /// loadstateFromVscode sends a message to the host which in return posts
        /// a message back to the app with the settings json object
        this.actions$.pipe(ofType(SettingsActions.loadStateFromVsCode)),
        this.actions$.pipe(ofType(SettingsActions.loadStateFromVsCodeSuccess)),
      ]).pipe(
        tap(() => {
          const msg = {
            type: 'info',
            payload: `Settings loaded`,
          } as IVsCodeMessage;
          this.vsCode.postMessage(msg);
        })
      ),
    { dispatch: false }
  );

  readonly changeLanguage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SettingsActions.changeLanguage),
        tap((value) =>{
          const message = {
            type: 'info',
            payload: `Selected Language: ${value}`,
          } as IVsCodeMessage;
          this.vsCode.postMessage(message);
        })
      ),
    { dispatch: false }
  );
}

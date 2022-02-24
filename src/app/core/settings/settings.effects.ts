import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { IVsCodeMessage, SETTINGS_LOAD } from "ext-src/interfaces";
import { tap, combineLatest, map } from "rxjs";
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
          this.vsCode.postMessage({ type: SETTINGS_LOAD } as IVsCodeMessage)
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
            payload: 'Settings loaded',
          } as IVsCodeMessage;
          this.vsCode.postMessage(msg);
        })
      ),
    { dispatch: false }
  );

  readonly receiveSettingValue = createEffect(() =>
    this.actions$.pipe(
      ofType(SettingsActions.receiveSettingValue),
      tap(() => console.log('receiveSettingValue')),
      map((action) => {
        const payload = {
          key: action.payload.key,
          value: action.payload.value,
        };
        return SettingsActions.changeSettingValueSuccess(payload);
      })
    )
  );

}

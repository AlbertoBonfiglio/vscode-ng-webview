import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { VSCMessages } from "ext-src/enums";
import { IVsCodeMessage } from "ext-src/interfaces";
import { combineLatest, map } from "rxjs";
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
        map(() =>
          this.vsCode.postMessage(
            { type: VSCMessages.loadSettings } as IVsCodeMessage
          ))
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
        map(() => {
          const msg = {
            type: VSCMessages.info,
            payload: 'Settings loaded',
          } as IVsCodeMessage;
          this.vsCode.postMessage(msg);
        })
      ),
    { dispatch: false }
  );

}

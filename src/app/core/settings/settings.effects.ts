import { Injectable } from "@angular/core";
import { createEffect, ofType, concatLatestFrom, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap, timer, map, mergeMap, tap } from "rxjs";
import { SettingsActions } from "src/app/core/core.module";
import { VsCodeListenerService } from "src/app/core/vs-code-listener/vs-code-listener.service";

@Injectable()
export class SettingsEffects {
  readonly changeLanguage = createEffect(
    () =>
      this.actions$.pipe(
        // Listen for multiplyBy.trigger
        ofType(SettingsActions.changeLanguage),
        // switchMap to a side-effect (timer)
        tap((value) => console.log(`Selected Language: ${value}`, value)),
        tap((value) =>
          this.vsCode.postMessage({
            type: 'alert',
            text: `Selected Language: ${value}`,
          })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly vsCode: VsCodeListenerService
  ) {}
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsActions } from 'src/app/core/core.module';
import { AppState } from 'src/app/core/core.state';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  public title = environment.appName;

  constructor(protected store: Store<AppState>) {
    console.clear;
  }

  buttonClick(): void {
    this.store.dispatch(SettingsActions.changeLanguage({payload: 'de'}));
  }

}

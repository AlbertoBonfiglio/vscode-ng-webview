import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment as env } from 'environments/environment';
import { SettingsSelectors } from 'src/app/core/core.module';
import { AppState } from 'src/app/core/core.state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  public title = env.appTitle;

  readonly settings$ = this.store.select(SettingsSelectors.selectSettingsState);

  constructor(protected store: Store<AppState>) {
  }

  buttonClick(): void {

  }

}

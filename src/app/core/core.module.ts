import {NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../../environments/environment';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Store, StoreModule } from '@ngrx/store';
import { AppState, metaReducers, reducers, selectRouterState } from 'src/app/core/core.state';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from 'src/app/core/router/custom-serializer';
import { NotificationService } from 'src/app/core/notification/notification.service';
import { VsCodeListenerService } from 'src/app/core/vs-code-listener/vs-code-listener.service';
import { SettingsActions, SettingsFeature } from 'src/app/core/settings/settings.slice';
import { EffectsModule } from '@ngrx/effects';
import { SettingsEffects } from 'src/app/core/settings/settings.effects';
import { RemoteDevToolsProxy } from 'src/app/core/redux-devtools/redux-devtools.proxy';


export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/`,
    '.json'
  );
}

export { AppState, selectRouterState, NotificationService,
SettingsActions };

// Register our remote devtools if we're on-device and not in a browser
/*
if (
  !(window as any).devToolsExtension &&
  !(window as any).__REDUX_DEVTOOLS_EXTENSION__
) {
  console.log(`Registering our remote devtools if we're on-device and not in a browser`);
  let remoteDevToolsProxy = new RemoteDevToolsProxy({
    connectTimeout: 300000, // extend for pauses during debugging
    ackTimeout: 120000, // extend for pauses during debugging
    secure: false, // dev only
  });

  // support both the legacy and new keys, for now
  (window as any).devToolsExtension = remoteDevToolsProxy;
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ = remoteDevToolsProxy;
}
*/

@NgModule({
  declarations: [],
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    FormsModule,

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(SettingsFeature),
    EffectsModule.forRoot([SettingsEffects]),
    /*
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: `${environment.appName} Starter`,
        }),
*/
    StoreDevtoolsModule.instrument({
      name: `${environment.appName} Starter`,
    }),
    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    // ng
    FormsModule,

    // 3rd party
    TranslateModule,
  ],
  providers: [
    { provide: Window, useValue: window },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    vsCode: VsCodeListenerService,
    private store: Store<AppState>
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
    if (!vsCode) {
      throw new Error('Error retrieveing vsCodeService');
    }
    store.dispatch(SettingsActions.loadStateFromVsCode());
  }
}


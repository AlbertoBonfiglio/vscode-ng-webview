import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoteDevToolsProxy } from 'src/app/core/redux-devtools/redux-devtools.proxy';
import { RemoteDevToolsConnectionProxy } from 'src/app/core/redux-devtools/redux-devtools.connection.proxy';
import { environment as env } from './../../../../environments/environment';

// Register our remote devtools if we're on-device and not
// in a browser or if we want to use the remotedev tools
if (
  (!(<any>window).devToolsExtension &&
  !(<any>window).__REDUX_DEVTOOLS_EXTENSION__) ||
  env.remotedev.useRemotedev
) {

  let remoteDevToolsProxy = new RemoteDevToolsProxy({
    connectTimeout: 300000, // extend for pauses during debugging
    ackTimeout: 120000, // extend for pauses during debugging
    secure: env.remotedev.useSecureRemotedev, // dev only
    instanceId: `${env.appName.toUpperCase()}-REDUX-DEV-TOOLS`,
  });

  // support both the legacy and new keys, for now
  (<any>window).devToolsExtension = remoteDevToolsProxy;
  (<any>window).__REDUX_DEVTOOLS_EXTENSION__ = remoteDevToolsProxy;
}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
})
export class RemoteReduxDevtoolsModule {}

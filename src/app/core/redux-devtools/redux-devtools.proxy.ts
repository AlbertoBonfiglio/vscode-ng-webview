import {
  ReduxDevtoolsExtension,
  ReduxDevtoolsExtensionConfig,
  ReduxDevtoolsExtensionConnection,
} from '@ngrx/store-devtools/src/extension';
import { RemoteDevToolsConnectionProxy } from 'src/app/core/redux-devtools/redux-devtools.connection.proxy';
import  {connect as connectToRemote}  from 'remotedev';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class RemoteDevToolsProxy implements ReduxDevtoolsExtension {
  remotedev: any = null;
  defaultOptions = {
    realtime: true,
    // Needs to match what you run `remotedev` command with and
    // what you setup in remote devtools local connection settings
    hostname: environment.remotedevAddress,
    port: environment.remotedevPort,
    autoReconnect: true,
    connectTimeout: 20000,
    ackTimeout: 10000,
    secure: environment.useSecureRemotedev,
    instanceId: `${environment.appName.toUpperCase()}-REDUX-DEV-TOOLS`,
  };

  constructor(options: Object) {
    this.defaultOptions = { ...this.defaultOptions, ...options };
  }

  connect(options: ReduxDevtoolsExtensionConfig): ReduxDevtoolsExtensionConnection {
    const connectOptions ={...this.defaultOptions, ...options};

    this.remotedev = connectToRemote(connectOptions);

    const connectionProxy = new RemoteDevToolsConnectionProxy(
      this.remotedev,
      connectOptions.instanceId
    );
    console.log(`[NG APP] Connected to remotedev
      ${environment.remotedevAddress}:${environment.remotedevPort}
      with instanceId: ${connectOptions.instanceId}`);
    return connectionProxy;
  }

  send(action: any, state: any): any {
    this.remotedev.send(action, state);
  }
}

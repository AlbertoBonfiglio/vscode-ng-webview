/// Work derived from https://gist.github.com/rob3c/c2c4dcc1116f94901ace179722c5f6d4

import {
  ReduxDevtoolsExtension,
  ReduxDevtoolsExtensionConfig,
  ReduxDevtoolsExtensionConnection,
} from '@ngrx/store-devtools/src/extension';
import { RemoteDevToolsConnectionProxy } from 'src/app/core/redux-devtools/redux-devtools.connection.proxy';
import  {connect as connectToRemote}  from 'remotedev';
import { Injectable } from '@angular/core';
import { environment as env } from 'environments/environment';

@Injectable()
export class RemoteDevToolsProxy implements ReduxDevtoolsExtension {
  remotedev: any = null;
  defaultOptions = {
    realtime: true,
    // Needs to match what you run `remotedev` command with and
    // what you setup in remote devtools local connection settings
    hostname: env.remotedev.remotedevAddress,
    port: env.remotedev.remotedevPort,
    autoReconnect: true,
    connectTimeout: 20000,
    ackTimeout: 10000,
    secure: env.remotedev.useSecureRemotedev,
    instanceId: `${env.appName.toUpperCase()}-REDUX-DEV-TOOLS`,
  };

  constructor(options: Object) {
    this.defaultOptions = { ...this.defaultOptions, ...options };
  }

  connect(
    options: ReduxDevtoolsExtensionConfig
  ): ReduxDevtoolsExtensionConnection {
    const connectOptions = { ...this.defaultOptions, ...options };

    this.remotedev = connectToRemote(connectOptions);

    const connectionProxy = new RemoteDevToolsConnectionProxy(
      this.remotedev,
      connectOptions.instanceId
    );
    return connectionProxy;
  }

  send(action: any, state: any): any {
    this.remotedev.send(action, state);
  }
}

import {
  ReduxDevtoolsExtension,
  ReduxDevtoolsExtensionConfig,
  ReduxDevtoolsExtensionConnection,
} from '@ngrx/store-devtools/src/extension';
import { RemoteDevToolsConnectionProxy } from 'src/app/core/redux-devtools/redux-devtools.connection.proxy';
import  {connect as connetToRemote}  from 'remotedev';


export class RemoteDevToolsProxy implements ReduxDevtoolsExtension {
  remotedev: any = null;
  defaultOptions = {
    realtime: true,
    // Needs to match what you run `remotedev` command with and
    // what you setup in remote devtools local connection settings
    hostname: 'localhost',
    port: 8765,
    autoReconnect: true,
    connectTimeout: 20000,
    ackTimeout: 10000,
    secure: true,
    instanceId: 'MYAPP-REDUX-DEV-TOOLS',
  };

  constructor(defaultOptions: Object) {
    this.defaultOptions = Object.assign(this.defaultOptions, defaultOptions);
  }

  connect(options: ReduxDevtoolsExtensionConfig): ReduxDevtoolsExtensionConnection {
    const connectOptions = Object.assign(this.defaultOptions, options);

    this.remotedev = connetToRemote(connectOptions);

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

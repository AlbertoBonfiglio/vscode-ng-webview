// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  appName: 'ng-webview',
  appTitle: 'Angular Webview Template',
  envName: 'DEV',
  production: false,
  i18nPrefix: '',
  messagePrefix: 'NG',
  extension: {
    viewType: 'angular',
    appPath: 'dist',
    extMediaFolder: 'js',
    extMediaScript: 'ext.js',
    prefix: 'VSC'
  },
  remotedev: {
    useRemotedev: true,
    remotedevAddress: 'localhost',
    remotedevPort: '8765',
    useSecureRemotedev: false,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

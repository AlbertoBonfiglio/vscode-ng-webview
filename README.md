# VSCode Webview Angular App Starter Template

This project contains starter template for a VSCode extension based on the `Angular 13`  framework.
It features:
* state management with NgRx, and NgrxSlices,
* Integration with remotedev to monitorn actions and store state while debugging in VS Code.  
* 2-way communication between VsCode and the Angular App via actions and effects,
* persistent storage of configuration data  

<div align="center">
<img src="https://via.placeholder.com/728x150/4b0081/23AD99/?text=VscodeNgWebview screenshot here" width="" alt="Screenshot" title="VSCode Webview Angular" />
</div>

Project was inspired by:
* [vscode-webview-react](https://github.com/rebornix/vscode-webview-react)
* [vscode-webview-angular](https://github.com/4gray/vscode-webview-angular)
* [VSCode Webview API](https://code.visualstudio.com/api/extension-guides/webview)

## Development

This project was generated with `Angular CLI`, so it can be be used for angular development by default.

The VS Code extension code is in the ext-src folder. The commands and configuration variables are in the `contributes` section of package.json


To test your extension in vscode context add the following to task.json:
```
{
      "name": "Launch Extension",
      "type": "extensionHost",
      "preLaunchTask": "npm: build-dev",
      "request": "launch",
      "runtimeExecutable": "${execPath}",
      "args": [
        "--extensionDevelopmentPath=${workspaceRoot}"
      ],
      "stopOnEntry": false,
      "sourceMaps": true,
      "outDir": "${workspaceRoot}/ext-src"
    }
```
and the following to the script section of package.json
```
"build-dev": "ng build --output-hashing none && tsc -p tsconfig.extension.json",
```

 To start debugging the extension either press F5 or select in menu "Debug" -> "Launch extension"). A new window will open in which you need to open command palette (Ctrl/Cmd + Shift + P) and select "NgWebView: Open" to start your extension. The extension has a couple of commands and settings that will trigger the NG App actions and effects. The extension also listens and reacts to messages sent by the NG App. 
 
## Packaging

To generate extension in `VSIX` format execute the package command:

```
yarn run package
```

Finally the generated VSIX file with VSCode extension should appear in the root folder of your project.


## Development server

The angular app can be developed and debugged as a regular app by either typing `npm start` or `ng serve` in the terminal or by selecting in menu "Debug" -> "Launch NG App". Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. When running the app directly there is no connection to the VSCode Api, therefore the app will not be able to receive or respond to VS Code messages. 

## Redux Developer Tools

The extension is configured to automatically attach to a running remote dev server to allow state and action inspection, and time debugging. Due to the app running inside a webview it is necessary to use the remote dev tools when testing or debugging the extension. 
When developing or debugging the Angular app the useRemotedev flag in environment.ts can be used to connect to either the remote tools or the tools running in the browser.

Before starting the app or extension it is necessary to run `npm run-script redux-devtools` to start the remotedev server. The remotedev    
server is started by default on localhost at port 8765. This can be changed by editing the `redux-devtools` script in package.json.
The values `remotedevAddress` and `remotedevPort`  in environment.ts must match the values in the 'redux-devtools' script.
The template runs the remotedev server without SSL encription. If SSL is configured on remotedev, the flag `useSecureRemotedev` should be set to true.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

To get more help on the development of VSCode extensions visit the [VSCode Extension API](https://code.visualstudio.com/api) page.


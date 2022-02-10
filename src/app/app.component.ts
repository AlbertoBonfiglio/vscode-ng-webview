import { AfterViewChecked, Component } from '@angular/core';
import { filter } from 'rxjs';
import { VsCodeListenerService } from 'src/app/services/vs-code-listener/vs-code-listener.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked {
  public title = 'vscode-ng-webview';

  constructor(private vsCode: VsCodeListenerService) {
    this.sunscribeToVsCodeEvents();
  }

  private sunscribeToVsCodeEvents(): void {
    this.vsCode.onMessage$
    .pipe()
    .subscribe((event: any) => {
      var msg: any = {};
      switch (event.data.type) {
        case 'logIn':
          msg = {
            command: 'alert',
            text: `🐛 got a ${event.data.type} message`,
          };
          break;
        case 'logOut':
          msg = {
            command: 'alert',
            text: `🐛 got a ${event.data.type} message`,
          };
          break;
        default:
          msg = {
            command: 'alert',
            text: `🐛 got an unknown message`,
          };
          break;
      }
      this.vsCode.postMessage(msg);

    });
  }

  ngAfterViewChecked(): void {
    this.vsCode.postMessage({
      command: 'alert',
      text: `🐛 ${this.title} is online `,
    });
  }
}

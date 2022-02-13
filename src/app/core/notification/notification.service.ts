import { Injectable } from '@angular/core';
import { VsCodeListenerService } from 'src/app/core/vs-code-listener/vs-code-listener.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private vsCodeApi: VsCodeListenerService) {}

  // todo add info, error, success, and default
  public warn(msg: string) {
    this.vsCodeApi.postMessage({
      command: 'alert',
      text: msg
    });
  }

}

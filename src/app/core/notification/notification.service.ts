import { Injectable } from '@angular/core';
import { VSCMessages } from 'ext-src/enums';
import { IVsCodeMessage } from 'ext-src/interfaces';
import { VsCodeListenerService } from 'src/app/core/vs-code-listener/vs-code-listener.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private vsCodeApi: VsCodeListenerService) {}

  public warn(msg: string): void {
    this.vsCodeApi.postMessage({
      type: VSCMessages.warning,
      payload: msg,
    } as IVsCodeMessage);
  }

  public alert(msg: string): void {
    this.vsCodeApi.postMessage({
      type: VSCMessages.alert,
      payload: msg,
    } as IVsCodeMessage
    );
  }

  public info(msg: string): void {
    this.vsCodeApi.postMessage({
      type: VSCMessages.info,
      payload: msg,
    } as IVsCodeMessage);
  }
}

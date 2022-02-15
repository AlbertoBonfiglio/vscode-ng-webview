import { Injectable } from '@angular/core';
import { IVsCodeMessage } from 'ext-src/interfaces';
import { VsCodeListenerService } from 'src/app/core/vs-code-listener/vs-code-listener.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private vsCodeApi: VsCodeListenerService) {}

  // todo add info, error, success, and default
  public warn(msg: string): void {
    this.vsCodeApi.postMessage({
      type: 'alert',
      payload: msg,
    } as IVsCodeMessage);
  }

  public alert(msg: string): void {
    this.vsCodeApi.postMessage({
      type: 'warn',
      payload: msg,
    } as IVsCodeMessage
    );
  }

  public info(msg: string): void {
    this.vsCodeApi.postMessage({
      type: 'info',
      payload: msg,
    } as IVsCodeMessage);
  }
}

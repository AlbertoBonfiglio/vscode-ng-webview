import { VSCMessages } from "./enums";

interface IVsCodeMessage extends Record<string, any> {
  type: VSCMessages;
  action: string;
  payload: any;
  source: string;
}

interface IVSCodeSettings extends Record<string, any> {
  theme: string;
  language: string;
  nightTheme: string;
  autoNightMode: boolean;
  stickyHeader: boolean;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
  hour: number;
}

export {
  IVSCodeSettings,
  IVsCodeMessage
};

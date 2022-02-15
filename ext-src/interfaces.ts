export interface IVsCodeMessage {
  type: string;
  action: string;
  payload: any;
  source: string;
}

export interface IVSCodeSettings {
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

const SETTINGS_CHANGE = 'settingchange';
const SETTINGS_LOAD = 'loadsettings';

interface IVsCodeMessage {
  type: string;
  action: string;
  payload: any;
  source: string;
}

interface IVSCodeSettings {
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

export {IVSCodeSettings, IVsCodeMessage, SETTINGS_CHANGE, SETTINGS_LOAD}

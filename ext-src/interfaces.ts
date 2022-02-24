const SETTINGS_CHANGE = 'settingchange';
const SETTINGS_LOAD = 'loadsettings';
const SETTINGS_TRANSMIT_NEW = 'receivesettingchange';

interface IVsCodeMessage extends Record<string, any> {
  type: string;
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
  IVsCodeMessage,
  SETTINGS_TRANSMIT_NEW,
  SETTINGS_CHANGE,
  SETTINGS_LOAD,
};

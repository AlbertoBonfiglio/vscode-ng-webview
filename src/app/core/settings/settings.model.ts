import { IVSCodeSettings } from 'ext-src/interfaces';
import { AppState } from '../core.module';

export const NIGHT_MODE_THEME = 'BLACK-THEME';

export type Language = 'en' | 'es';


export interface State extends AppState {
  settings: IVSCodeSettings;
}

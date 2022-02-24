import { IVsCodeMessage, IVSCodeSettings } from 'ext-src/interfaces';
import * as _ from 'lodash';
import { createSlice, PayloadAction } from 'ngrx-slice';
import { NIGHT_MODE_THEME } from 'src/app/core/settings/settings.model';

// Settings are used in the app but controlled edited in vscode
export const initialState: IVSCodeSettings = {
  language: 'en',
  theme: 'DEFAULT-THEME',
  autoNightMode: false,
  nightTheme: NIGHT_MODE_THEME,
  stickyHeader: true,
  pageAnimations: true,
  pageAnimationsDisabled: false,
  elementsAnimations: true,
  hour: 0,
};

export const {
  actions: SettingsActions,
  selectors: SettingsSelectors,
  ...SettingsFeature
} = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    loadStateFromVsCode: () => {},
    loadStateFromVsCodeSuccess: (
      state: IVSCodeSettings,
      action: PayloadAction<{ payload: IVSCodeSettings }>
    ) => {
      for (let [key, _] of Object.entries(state)) {
        state[key] = action.payload[key];
      }
    },

    receiveSettingValue: (
      state: IVSCodeSettings,
      action: PayloadAction<IVsCodeMessage>
    ) => {},

    changeSettingValueSuccess: (
      state: IVSCodeSettings,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state[action.key] = action.value;
    },
  },
  extraReducers: [],
});


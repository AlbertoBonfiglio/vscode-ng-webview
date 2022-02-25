import { IVSCodeSettings } from 'ext-src/interfaces';
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
      for (let [key, value] of Object.entries(state)) {
        state[key] = action.payload[key];
      }
    },

    changeSettingValue: (
      state: IVSCodeSettings,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      state[action.key] = action.value;
    },
  },
  extraReducers: [],
});


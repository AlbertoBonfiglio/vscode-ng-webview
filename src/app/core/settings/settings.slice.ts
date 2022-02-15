import { IVSCodeSettings } from 'ext-src/interfaces';
import { createSlice, PayloadAction } from 'ngrx-slice';
import { SettingsState, NIGHT_MODE_THEME } from 'src/app/core/settings/settings.model';

export const initialState: SettingsState = {
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
    loadStateFromVsCode: (state) => {},
    loadStateFromVsCodeSuccess: (state, action: PayloadAction<{payload: IVSCodeSettings}> ) => {
      console.log('[reducer loadStateFromVsCodeSuccess]: ', action, state);
      state = action. payload;
      console.log('[reducer loadStateFromVsCodeSuccess]: ', action, state);

    },
    changeLanguage: (state, action: PayloadAction<{payload: string}> ) => {
      state.language = action.payload;
    },
  },
  extraReducers: []
});


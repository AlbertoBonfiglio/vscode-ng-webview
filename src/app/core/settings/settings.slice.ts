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
    changeLanguage: (state, action: PayloadAction<{payload: string}> ) => {
      console.log('[reducer]: ', action);
      state.language = action.payload;
    },
  },
  extraReducers: []
});


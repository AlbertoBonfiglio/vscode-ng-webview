import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from '../core.state';

export function initStateFromVsCodeConfiguration(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return  (state, action) => {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      console.log('[ngWebApp] Initializing the state');
      return {
        ...newState,
        /// ...LocalStorageService.loadInitialState()
      };
    }
    return newState;
  };
}

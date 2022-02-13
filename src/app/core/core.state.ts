import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { initStateFromVsCodeConfiguration } from 'src/app/core/meta-reducers/initStateFromVsCodeConfiguration.metareducer';
import { RouterStateUrl } from 'src/app/core/router/router.state';
import { environment } from '../../environments/environment';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [
  initStateFromVsCodeConfiguration,
];

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

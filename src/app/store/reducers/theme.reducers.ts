import { createReducer, on } from '@ngrx/store';
import themes from '../../../assets/json/theme.json';
import { ITheme } from 'src/interfaces/theme';
import { ThemeSelected } from '../actions/theme.actions';

export interface IThemeState {
  currentTheme: ITheme;
}

export const State: IThemeState = {
  currentTheme: themes[0],
};

export const themeReducer = createReducer(
  State,
  on(ThemeSelected, (state, props) => ({
    ...state,
    currentTheme: props.payload,
  }))
);

export const currentTheme = (state: IThemeState) => state?.currentTheme;

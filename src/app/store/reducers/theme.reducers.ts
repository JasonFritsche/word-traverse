import { createReducer, on } from '@ngrx/store';
import themes from '../../../assets/json/theme.json';
import { ITheme } from 'src/interfaces/theme';
import { ThemeSelected } from '../actions/theme.actions';

const setInitTheme = (): ITheme => {
  if (window.localStorage.getItem('theme')) {
    const themeFromStorage = window.localStorage.getItem('theme');
    return JSON.parse(themeFromStorage as string) as ITheme
  }
  // set first index as default
  return themes[0]
}

export interface IThemeState {
  currentTheme: ITheme;
}

export const State: IThemeState = {
  currentTheme: setInitTheme()
};

const storeLocalTheme = (theme?: ITheme) => {
  window.localStorage.setItem('theme', JSON.stringify(theme));
}

export const themeReducer = createReducer(
  State,
  on(ThemeSelected, (state, props) => {
    storeLocalTheme(props.payload)

    return ({
      ...state,
      currentTheme: props.payload,
    })
  })
);

export const currentTheme = (state: IThemeState) => {
  storeLocalTheme(state?.currentTheme)
  return state?.currentTheme
}

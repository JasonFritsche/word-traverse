import { createAction, props } from '@ngrx/store';

import { ITheme } from 'src/interfaces/theme';

export const ThemeSelected = createAction(
  '[ThemeSelected] Theme Selected',
  props<{ payload: ITheme }>()
);

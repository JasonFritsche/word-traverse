import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeSelected } from 'src/app/store/actions/theme.actions';
import { IThemeState } from 'src/app/store/reducers/theme.reducers';
import themes from '../../../assets/json/theme.json';
import { ITheme } from '../../../interfaces/theme';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent implements OnInit {
  constructor(private store: Store<IThemeState>) {}
  themes: Array<ITheme> = themes;
  isOpenAbout: boolean = false;

  ngOnInit(): void {}

  selectTheme(theme: ITheme) {
    this.store.dispatch(ThemeSelected({ payload: theme }));
  }

  toggleAboutDialog(){
    this.isOpenAbout=!this.isOpenAbout;
  }

  onCodeIconClick() {
    console.log('clickeddd');
    window.open('https://github.com/JasonFritsche/word-traverse', '_blank');
  }
}

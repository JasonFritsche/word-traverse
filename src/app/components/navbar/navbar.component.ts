import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeSelected } from 'src/app/store/actions/theme.actions';
import { IThemeState } from 'src/app/store/reducers/theme.reducers';
import themes from '../../../assets/json/theme.json';
import { ITheme } from '../../../interfaces/theme';

@Component({
  selector: 'app-navbar',
  template: `
    <div class="navbar bg-primary">
      <p class="normal-case text-2xl text-primary-content">Word Traverse</p>
      <div class="flex-1"></div>

      <div class="dropdown dropdown-end flex flex-row">
        <div class="pr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 text-primary-content hover:cursor-pointer hover:text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            (click)="onCodeIconClick()"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            tabindex="0"
            class="h-7 w-7 text-primary-content hover:cursor-pointer hover:text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="dropdown-content menu shadow bg-accent rounded-box w-44"
        >
          <ng-container *ngFor="let theme of themes">
            <li class="bg-accent hover:bg-accent-focus">
              <a
                class="text-accent-content text-lg"
                (click)="selectTheme(theme)"
                >{{ theme.value }}</a
              >
            </li>
          </ng-container>
        </ul>
      </div>
    </div>
  `,
})
export class NavbarComponent implements OnInit {
  constructor(private store: Store<IThemeState>) {}
  themes: Array<ITheme> = themes;

  ngOnInit(): void {}

  selectTheme(theme: ITheme) {
    this.store.dispatch(ThemeSelected({ payload: theme }));
  }

  onCodeIconClick() {
    console.log('clickeddd');
    window.open('https://github.com/JasonFritsche/word-traverse', '_blank');
  }
}

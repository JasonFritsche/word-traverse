import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { WordSearchComponent } from '../app/components/search/word-search/word-search.component';
import { MockComponent } from 'ng-mocks';

describe('AppComponent', () => {
  const initialState = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        MockComponent(WordSearchComponent),
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'word-traverse'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Word Traverse');
  });
});

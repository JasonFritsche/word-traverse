// Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Third Part Libs
import { ToastrModule } from 'ngx-toastr';

// App Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WordSearchComponent } from './components/search/word-search/word-search.component';

// App Services
import { ErrorHandlingInterceptor } from './interceptors/error-handling.interceptor';

// Modules
import { DataVisualModule } from 'src/data-visual/data-visual.module';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { SearchResultComponent } from './components/search/search-result/search-result.component';
import { StoreModule } from '@ngrx/store';
import { wordSearchReducer } from './store/reducers/word-search.reducers';
import { themeReducer } from './store/reducers/theme.reducers';
import { EffectsModule } from '@ngrx/effects';
import { WordSearchEffects } from './store/effects/word-search.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WordSearchComponent,
    EmptyStateComponent,
    SearchResultComponent,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-full-width',
    }),
    DataVisualModule,
    StoreModule.forRoot({ wordSearch: wordSearchReducer, theme: themeReducer }),
    EffectsModule.forRoot([WordSearchEffects, ]),
    StoreDevtoolsModule.instrument({
      name: 'DevTools & Debugging in NgRx',
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

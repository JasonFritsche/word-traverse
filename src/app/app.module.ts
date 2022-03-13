// Angular Imports
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconRegistry, MatIconModule } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

// Third Part Libs
import { ToastrModule } from "ngx-toastr";

// App Components
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { WordSearchComponent } from "./components/word-search/word-search.component";

// App Services
import { ErrorHandlingInterceptor } from "./interceptors/error-handling.interceptor";

// Modules
import { MaterialModule } from "../material/material.module";
import { DataVisualModule } from "src/data-visual/data-visual.module";
import { EmptyStateComponent } from './components/empty-state/empty-state.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, WordSearchComponent, EmptyStateComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-full-width",
    }),
    DataVisualModule,
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
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl("./assets/mdi.svg"));
  }
}

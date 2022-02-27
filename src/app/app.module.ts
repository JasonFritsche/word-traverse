// Angular Imports
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconRegistry, MatIconModule } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

// Third Part Libs
import { HighchartsChartModule } from "highcharts-angular";
import { ToastrModule } from "ngx-toastr";

// App Components
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { WordSearchComponent } from "./word-search/word-search.component";
import { OpenCloseComponent } from "./open-close/open-close.component";

// App Services
import { ErrorHandlingInterceptor } from "./interceptors/error-handling.interceptor";

// Modules
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [AppComponent, NavbarComponent, WordSearchComponent, OpenCloseComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HighchartsChartModule,
    MatIconModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-full-width",
    }),
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

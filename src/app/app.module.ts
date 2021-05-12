import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptorService} from './services/auth/token-interceptor.service';
import {ErrorInterceptorService} from './services/auth/error-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './main-components/home/home.component';
import { NotFoundPageComponent } from './main-components/not-found-page/not-found-page.component';
import { ApplicationErrorComponent } from './main-components/application-error/application-error.component';
import { NotFoundResourceComponent } from './main-components/not-found-resource/not-found-resource.component';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './main-components/navigation/header/header.component';
import { SidenavListComponent } from './main-components/navigation/sidenav-list/sidenav-list.component';
import { TestComponent } from './main-components/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundPageComponent,
    ApplicationErrorComponent,
    NotFoundResourceComponent,
    HeaderComponent,
    SidenavListComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

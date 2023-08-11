import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { BooksComponent } from './components/books/books.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { EditQuoteComponent } from './components/edit-quote/edit-quote.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './helpers/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BooksComponent,
    AddBookComponent,
    EditBookComponent,
    QuotesComponent,
    NavbarComponent,
    HomeComponent,
    AddQuoteComponent,
    EditQuoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { QuotesComponent } from './components/quotes/quotes.component';
import { HomeComponent } from './components/home/home.component';
import { AddQuoteComponent } from './components/add-quote/add-quote.component';
import { EditQuoteComponent } from './components/edit-quote/edit-quote.component';

interface ExtendedRoute extends Route {
  protected?: boolean;
}
export const routes: ExtendedRoute[]  = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'books', component: BooksComponent, title: 'Books', protected: true },
  { path: 'books/add', component: AddBookComponent, title: 'Add Book', protected: true },
  { path: 'books/edit/:bookId', component: EditBookComponent, title: 'Edit Book', protected: true },
  { path: 'quotes', component: QuotesComponent, title: 'My Quotes', protected: true },
  { path: 'quotes/add', component: AddQuoteComponent, title: 'Add Quote', protected: true },
  { path: 'quotes/edit/:quoteId', component: EditQuoteComponent, title: 'Edit Quote', protected: true },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'login', component: LoginComponent, title: 'Sign In' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

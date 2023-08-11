import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  templateUrl: './add-book.component.html',
  styleUrls: ['add-book.component.css'],
})
export class AddBookComponent {
  book: Book = {
    title: '',
    author: '',
    description: '',
    publishedDate: '',
  };

  constructor(
    private bookService: BookService,
    public authService: AuthService,
    private router: Router
  ) {}

  addBook(): void {
    this.bookService.create(this.book).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: (e) => console.error(e),
    });
  }
}

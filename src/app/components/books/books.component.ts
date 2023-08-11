import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  templateUrl: './books.component.html',
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getBooks();
  }

  async getBooks(): Promise<void> {
    this.bookService.getAll().subscribe({
      next: (res) => {
        res.map((book) => {
          book.publishedDate = formatDate(
            book.publishedDate as Date,
            'mediumDate',
            'en-US'
          );
        });
        this.books = res;
      },
      error: (e) => console.error(e),
    });
  }

  async deleteBook(id: number): Promise<void> {
    this.bookService.delete(id).subscribe({
      next: () => {
        this.getBooks();
      },
      error: (e) => console.error(e),
    });
  }
}

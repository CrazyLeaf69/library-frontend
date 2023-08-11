import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  book: Book = {};

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const bookId = params['bookId'];
      this.getBook(bookId);
    });
  }

  async getBook(id: number): Promise<void> {
    this.bookService.get(id).subscribe({
      next: (book) => {
        book.publishedDate = formatDate(
          book.publishedDate as Date,
          'yyyy-MM-dd',
          'en-US'
        );
        this.book = book;
      },
      error: (e) => console.error(e),
    });
  }

  async editBook(): Promise<void> {
    this.bookService.update(this.book).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: (e) => console.error(e),
    });
  }

  async deleteBook(): Promise<void> {
    this.bookService.delete(this.book.id!).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: (e) => console.error(e),
    });
  }
}

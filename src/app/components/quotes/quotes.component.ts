import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quote } from 'src/app/models/quote.model';
import { AuthService } from 'src/app/services/auth.service';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
})
export class QuotesComponent implements OnInit {
  quotes: Quote[] = [];

  amountOfFavorites: number = 0;
  amountOfUserCreatedQuotes: number = 0;

  maxFavorites: number = 5;
  maxQuotes: number = 8;

  constructor(
    public authService: AuthService,
    private quoteService: QuoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getQuotes();
  }

  async getQuotes(): Promise<void> {
    this.quoteService.getAll().subscribe({
      next: (res) => {
        this.quotes.map((q) => (q.isFavorite = !!q.favoriteQuoteId));
        this.quotes = res.sort((a, b) =>
          b.favoriteQuoteId && !a.favoriteQuoteId ? 1 : -1
        );
        const userFavorites = this.quotes.filter((q) => !!q.favoriteQuoteId);
        this.amountOfFavorites = userFavorites.length;

        const userCreatedQuotes = this.quotes.filter(
          (q) => q.userId == this.authService.getJwtUser()?.Id
        );
        this.amountOfUserCreatedQuotes = userCreatedQuotes.length;
      },
      error: (e) => console.error(e),
    });
  }

  async deleteQuote(id: number): Promise<void> {
    this.quoteService.delete(id).subscribe({
      next: () => {
        this.getQuotes();
      },
      error: (e) => console.error(e),
    });
  }

  async favoriteQuote(quoteId: number): Promise<void> {
    const quote = this.quotes.find((q) => q.id === quoteId);
    if (!quote) return;
    quote.isFavorite = true;
    this.quoteService.favorite(quoteId).subscribe({
      next: () => {
        this.getQuotes();
      },
      error: (e) => console.error(e),
    });
  }

  async unfavoriteQuote(favoriteQuoteId: number): Promise<void> {
    const quote = this.quotes.find(
      (q) => q.favoriteQuoteId === favoriteQuoteId
    );
    if (!quote) return;
    quote.isFavorite = false;
    this.quoteService.unfavorite(favoriteQuoteId).subscribe({
      next: () => {
        this.getQuotes();
      },
      error: (e) => console.error(e),
    });
  }

  navigateAdd(): void {
    this.router.navigate(['/quotes/add']);
  }
}

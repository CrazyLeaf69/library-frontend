import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quote } from 'src/app/models/quote.model';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.css'],
})
export class EditQuoteComponent implements OnInit {
  quote: Quote = {};

  constructor(
    private quoteService: QuoteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const quoteId = params['quoteId'];
      this.getQuote(quoteId);
    });
  }

  async getQuote(id: number): Promise<void> {
    this.quoteService.get(id).subscribe({
      next: (quote) => {
        this.quote = quote;
      },
      error: (e) => console.error(e),
    });
  }

  async editQuote(): Promise<void> {
    this.quoteService.update(this.quote).subscribe({
      next: () => {
        this.router.navigate(['/quotes']);
      },
      error: (e) => console.error(e),
    });
  }

  async deleteQuote(): Promise<void> {
    this.quoteService.delete(this.quote.id!).subscribe({
      next: () => {
        this.router.navigate(['/quotes']);
      },
      error: (e) => console.error(e),
    });
  }
}

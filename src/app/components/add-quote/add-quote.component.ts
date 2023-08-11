import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Quote } from 'src/app/models/quote.model';
import { AuthService } from 'src/app/services/auth.service';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css'],
})
export class AddQuoteComponent {
  quote: Quote = {
    value: '',
    from: '',
  };

  constructor(
    private quoteService: QuoteService,
    public authService: AuthService,
    private router: Router
  ) {}

  addQuote(): void {
    this.quoteService.create(this.quote).subscribe({
      next: () => {
        this.router.navigate(['/quotes']);
      },
      error: (e) => console.error(e),
    });
  }
}

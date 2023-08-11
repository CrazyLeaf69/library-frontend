import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Quote } from '../models/quote.model';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}/quotes`;

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<Quote[]> {
    const userId = this.authService.getJwtUser()?.Id;
    return this.http.get<Quote[]>(`${baseUrl}?userId=${userId}`, {
      withCredentials: true,
    });
  }

  get(id: number): Observable<Quote> {
    return this.http.get<Quote>(`${baseUrl}/${id}`, { withCredentials: true });
  }

  create(data: Quote): Observable<any> {
    const userId = this.authService.getJwtUser()?.Id;
    data.userId = userId;
    return this.http.post(baseUrl, data, { withCredentials: true });
  }

  update(data: Quote): Observable<any> {
    return this.http.put(`${baseUrl}/${data.id}`, data, {
      withCredentials: true,
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, { withCredentials: true });
  }

  favorite(quoteId: number): Observable<any> {
    return this.http.post(
      `${baseUrl}/favorite`,
      { userId: this.authService.getJwtUser()?.Id, quoteId },
      { withCredentials: true }
    );
  }

  unfavorite(favoriteQuoteId: number): Observable<any> {
    return this.http.post(
      `${baseUrl}/unfavorite`,
      { favoriteQuoteId },
      { withCredentials: true }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

const baseUrl = `${environment.apiUrl}/books`;

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(baseUrl, { withCredentials: true });
  }

  get(id: number): Observable<Book> {
    return this.http.get<Book>(`${baseUrl}/${id}`, { withCredentials: true });
  }

  create(data: Book): Observable<any> {
    const userId = this.authService.getJwtUser()?.Id;
    data.addedBy = userId;
    return this.http.post(baseUrl, data, { withCredentials: true });
  }

  update(data: Book): Observable<any> {
    return this.http.put(`${baseUrl}/${data.id}`, data, {
      withCredentials: true,
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, { withCredentials: true });
  }
}

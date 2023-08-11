import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { Token } from '../types/token.interface';
import { ApiResponse } from '../models/api-response.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenStorage } from '../types/tokenStorage.enum';
import { routes } from '../app-routing.module';

const baseUrl = 'https://localhost:7285/auth';

type Session = User | null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Session = this.isLoggedIn() ? this.getJwtUser() : null;

  userChange: BehaviorSubject<Session> = new BehaviorSubject<Session>(
    this.user
  );

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.userChange.subscribe((value) => {
      this.user = value;
    });
  }

  userChanges(): Observable<Session> {
    return this.userChange.asObservable();
  }

  register(data: Pick<User, 'Username' | 'Password'>): Observable<ApiResponse> {
    return this.http.post(`${baseUrl}/register`, data);
  }

  login(data: Pick<User, 'Username' | 'Password'>): Observable<ApiResponse> {
    return this.http.post(`${baseUrl}/login`, data);
  }

  verify(): Observable<ApiResponse> {
    return this.http.get(`${baseUrl}/verify`, {
      withCredentials: true,
    });
  }

  checkRefresh(): any {
    // check if the access token is five minutes away from expiring or has expired
    const token = this.getToken(TokenStorage.AccessToken);
    if (!token) {
      return;
    }
    const tokenObj = this.readToken(token);
    const now = Date.now().valueOf() / 1000;
    if (tokenObj.exp - now < 60 * 5) {
      this.refetchAccessToken();
    }
  }

  refetchAccessToken(): void {
    const refreshToken = this.getToken(TokenStorage.RefreshToken);
    if (!refreshToken) {
      return;
    }
    this.http
      .post(`${baseUrl}/refresh`, { RefreshToken: `Bearer ${refreshToken}` })
      .subscribe({
        next: (res: ApiResponse) => {
          if (res.code === 200 && res.accessToken && res.refreshToken) {
            this.storeTokens(res.accessToken, res.refreshToken);
          } else if (res.code === 401) {
            this.logout();
            this.toastr.error('Your session has expired! Please log in again.');
            this.router.navigateByUrl('/login');
          } else {
            console.error(res);
            this.toastr.error('Something went wrong!');
          }
        },
        error: (e) => console.error(e),
      });
  }

  isLoggedIn(): boolean {
    const token = this.getToken(TokenStorage.AccessToken);
    if (!token) {
      return false;
    }
    const tokenObj = this.readToken(token);
    const now = Date.now().valueOf() / 1000;
    if (tokenObj.exp < now) {
      return false;
    }
    return true;
  }

  getJwtUser(): Omit<User, 'Password'> | null {
    const token = this.getToken(TokenStorage.AccessToken);
    if (!token) {
      return null;
    }
    const { Id, Username } = this.readToken(token);
    return { Id, Username };
  }

  public logout(skipNavigate?: boolean): void {
    this.userChange.next(null);
    this.removeTokens();
    if (skipNavigate) return;
    const protectedRoutes = routes.filter((r) => r.protected);
    const isProtectedRoute = protectedRoutes.some(
      (r) => `/${r.path}` === this.router.url
    );
    isProtectedRoute && this.router.navigateByUrl('/');
  }

  public storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(TokenStorage.AccessToken, accessToken);
    localStorage.setItem(TokenStorage.RefreshToken, refreshToken);
  }
  public removeTokens(): void {
    localStorage.removeItem(TokenStorage.AccessToken);
    localStorage.removeItem(TokenStorage.RefreshToken);
  }
  private getToken(token: TokenStorage): string | null {
    return localStorage.getItem(token);
  }

  private readToken(token: string): Token {
    const tokenPayload = token.split('.')[1];
    const decodedToken = window.atob(tokenPayload);
    return JSON.parse(decodedToken);
  }
}

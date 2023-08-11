import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { routes } from './app-routing.module';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  unauthorized = false;

  constructor(
    private authService: AuthService,
    private location: Location,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkUnauthorized();
      }
    });
  }

  ngOnInit(): void {
    this.verify();
    this.checkUnauthorized();
  }

  // the verify function checks with the server to see if the user is authorized
  // if the user is not authorized, the user is logged out
  verify(): void {
    this.authService.verify().subscribe({
      next: (res) => {
        if (res.code !== 200) {
          this.authService.logout(true);
        }
      },
      error: (e) => console.error(e),
    });
    this.authService.checkRefresh();
  }

  checkUnauthorized(): void {
    const loggedIn = this.authService.isLoggedIn();
    const protectedRoute = this.protectedRoute();
    this.unauthorized = !loggedIn && protectedRoute;
  }

  private protectedRoute(): boolean {
    const protectedRoutes = routes.filter((r) => r.protected);
    return protectedRoutes.some((r) => `/${r.path}` === this.location.path());
  }
}

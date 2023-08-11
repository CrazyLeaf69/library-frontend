import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  theme: string = this.themeService.getTheme();

  loggedIn = !!this.authService.user;
  username = this.authService.user?.Username || null;

  constructor(
    public authService: AuthService,
    private themeService: ThemeService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.themeService.themeChanges().subscribe((theme) => {
      if (theme.oldValue) {
        this.renderer.removeClass(document.body, theme.oldValue);
      }
      this.renderer.addClass(document.body, theme.newValue);
    });
    this.authService.userChanges().subscribe((value) => {
      this.loggedIn = !!value;
      this.username = value?.Username || null;
    });
  }

  toggleTheme() {
    if (this.theme === 'bootstrap') {
      this.theme = 'bootstrap-dark';
    } else {
      this.theme = 'bootstrap';
    }

    this.themeService.setTheme(this.theme);
  }

  logout(): void {
    this.loggedIn = false;
    this.authService.logout();
  }
}

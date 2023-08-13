import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/app/models/api-response.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = {
    Username: '',
    Password: '',
  };

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async submitForm(): Promise<void> {
    this.authService.verify().subscribe({
      next: (res) => {
        if (res.code === 200) {
          this.toastr.success('You are already logged in!');
          return;
        }
        this.authService.login(this.user).subscribe({
          next: (res: ApiResponse) => {
            this.loginResponseHandler(res);
          },
          error: (e) => {
            console.error(e);
            this.toastr.error('Something went wrong!');
          },
        });
      },
      error: (e) => {
        console.error(e);
        this.toastr.error('Something went wrong!');
      },
    });
  }

  private loginResponseHandler(res: ApiResponse): void {
    if (res.code === 200 && res.accessToken && res.refreshToken) {
      this.authService.storeTokens(res.accessToken, res.refreshToken);
      this.authService.userChange.next({
        Username: this.user.Username,
      });
      this.toastr.success('Successfully logged in!');
      this.router.navigate(['/']);
    } else if (res.code === 401 || res.code === 404) {
      this.errorMessage = 'Invalid username or password!';
    } else {
      console.error(res);
    }
  }
}

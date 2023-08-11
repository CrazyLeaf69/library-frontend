import { Component } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = {
    Username: '',
    Password: '',
  };

  response: ApiResponse = {};

  constructor(private authService: AuthService) {}

  submitForm(): void {
    this.authService.register(this.user).subscribe({
      next: (res) => {
        this.response = res;
      },
      error: (e) => console.error(e),
    });
  }
}

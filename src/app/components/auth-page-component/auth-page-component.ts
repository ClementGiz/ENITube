import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-page-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './auth-page-component.html',
  styleUrl: './auth-page-component.css',
})
export class AuthPageComponent implements OnInit {
  public user: User = { name: '', email: '', password: '' };
  private authService = inject(AuthService);
  public errorMessage = '';
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public isSignup = false;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.isSignup = data['isSignup'];
    });
  }

  public onSubmit() {
    if (!this.isSignup) {
      const result = this.authService.createUser(this.user);

      if (result.success) {
        alert(result.message);
        this.isSignup = true;
      } else {
        this.errorMessage = result.message;
      }
    } else {
      if (this.user.password != null) {
        const result = this.authService.loginUser(this.user.email, this.user.password);
        if (result.success) {
          sessionStorage.setItem('current_user', JSON.stringify(result.user));
          alert(`Bienvenue, ${result.user?.name} !`);
          this.router.navigate(['/search']);
        } else {
          this.errorMessage = "L'adresse email ou le mot de passe est incorrect.";
        }
      }
    }
  }
}

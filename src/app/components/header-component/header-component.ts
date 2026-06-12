import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  protected authService = inject(AuthService);
  public sidebarService = inject(SidebarService);
  private route = inject(Router);

  onLogout() {
    this.authService.logout();
    this.route.navigate(['/']);
  }
  onToggleSidebar() {
    this.sidebarService.toggle();
  }
}

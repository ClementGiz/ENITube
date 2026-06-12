import { Component, inject } from '@angular/core';
import { SidebarService } from '../../services/sidebar-service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterLink],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.css',
})
export class SidebarComponent {
  public sidebarService = inject(SidebarService);
  public authService = inject(AuthService);
}

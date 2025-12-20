import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  userId = '1'; // For now, use a fixed user ID

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard', isActive: false },
    { label: 'Transactions', icon: '💳', route: '/transactions', isActive: false },
    { label: 'Category Stats', icon: '📈', route: '/category-stats', isActive: false },
    { label: 'Reports', icon: '📋', route: '/reports', isActive: false },
    { label: 'Settings', icon: '⚙️', route: '/settings', isActive: false }
  ];

  constructor(private router: Router) {
    this.updateActiveState();
    this.router.events.subscribe(() => {
      this.updateActiveState();
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  private updateActiveState() {
    const currentRoute = this.router.url;
    this.menuItems.forEach(item => {
      item.isActive = currentRoute === item.route ||
        currentRoute.startsWith(item.route + '/');
    });
  }
}

// sidebar.component.ts
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
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: '📊', route: '/dashboard/:user_id', isActive: false },
    { label: 'Transactions', icon: '💳', route: '/transactions/:user_id', isActive: false },
    { label: 'Category Stats', icon: '📈', route: '/category-stats/:user_id', isActive: false },
    { label: 'Reports', icon: '📋', route: '/reports/:user_id', isActive: false },
    { label: 'Settings', icon: '⚙️', route: '/settings/:user_id', isActive: false }
  ];

  constructor(private router: Router) {
    this.updateActiveState();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  private updateActiveState() {
    const currentRoute = this.router.url;
    this.menuItems.forEach(item => {
      item.isActive = currentRoute === item.route;
    });
  }
}

// category-stats.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="category-stats-container">
      <h1>Category Statistics</h1>
      <p>Detailed statistics by category will be displayed here.</p>
    </div>
  `,
  styles: [`
    .category-stats-container {
      padding: 20px;
    }
  `]
})
export class CategoryStatsComponent { }

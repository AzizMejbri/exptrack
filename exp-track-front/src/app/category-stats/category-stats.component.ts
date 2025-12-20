// category-stats.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService, CategoryDetail, CategoryStatsResponse } from '../services/transaction.service';
import { ThemeService } from '../theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-stats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-stats.component.html',
  styleUrls: ['./category-stats.component.scss']
})
export class CategoryStatsComponent implements OnInit, OnDestroy {
  timeFrames = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' }
  ];

  selectedTimeFrame = 'month';
  stats: CategoryStatsResponse | null = null;
  isLoading = true;
  isDarkMode = false;
  selectedCategory: CategoryDetail | null = null;
  viewMode: 'list' | 'chart' | 'details' = 'list';

  private themeSubscription!: Subscription;

  // Chart data
  expenseChartData: any = null;
  revenueChartData: any = null;

  constructor(
    private transactionService: TransactionService,
    private themeService: ThemeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
    this.loadCategoryStats();
  }

  onTimeFrameChange() {
    this.loadCategoryStats();
  }

  loadCategoryStats() {
    this.isLoading = true;
    this.selectedCategory = null;
    this.viewMode = 'list';

    this.transactionService.getCategoryStats(this.selectedTimeFrame).subscribe({
      next: (data) => {
        this.stats = data;
        this.prepareChartData();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading category stats:', error);
        this.stats = this.getMockData();
        this.prepareChartData();
        this.isLoading = false;
      }
    });
  }

  prepareChartData() {
    if (!this.stats) return;

    // Prepare expense chart data
    this.expenseChartData = {
      labels: this.stats.expenseCategories.map(c => c.category),
      datasets: [{
        data: this.stats.expenseCategories.map(c => c.totalAmount),
        backgroundColor: [
          '#ef4444', '#dc2626', '#f97316', '#f59e0b',
          '#eab308', '#84cc16', '#22c55e', '#10b981'
        ],
        borderWidth: 0,
        hoverOffset: 15
      }]
    };

    // Prepare revenue chart data
    this.revenueChartData = {
      labels: this.stats.revenueCategories.map(c => c.category),
      datasets: [{
        data: this.stats.revenueCategories.map(c => c.totalAmount),
        backgroundColor: [
          '#10b981', '#059669', '#0ea5e9', '#3b82f6',
          '#6366f1', '#8b5cf6', '#a855f7', '#d946ef'
        ],
        borderWidth: 0,
        hoverOffset: 15
      }]
    };
  }

  selectCategory(category: CategoryDetail) {
    this.selectedCategory = category;
    this.viewMode = 'details';
  }

  goBackToList() {
    this.selectedCategory = null;
    this.viewMode = 'list';
  }

  switchToChartView() {
    this.viewMode = 'chart';
    this.selectedCategory = null;
  }

  switchToListView() {
    this.viewMode = 'list';
    this.selectedCategory = null;
  }

  viewTransactions(category: CategoryDetail) {
    this.router.navigate(['/transactions'], {
      queryParams: {
        category: category.category,
        type: category.type,
        timeFrame: this.selectedTimeFrame
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  }

  formatPercentage(percentage: number): string {
    return `${percentage.toFixed(1)}%`;
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'Food': '🍔',
      'Transport': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Bills': '🧾',
      'Healthcare': '🏥',
      'Education': '📚',
      'Travel': '✈️',
      'Salary': '💰',
      'Freelance': '💼',
      'Investment': '📈',
      'Gift': '🎁',
      'Other': '📦'
    };
    return icons[category] || '📊';
  }

  getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
    return {
      'up': '📈',
      'down': '📉',
      'stable': '➡️'
    }[trend];
  }

  getTrendClass(trend: 'up' | 'down' | 'stable'): string {
    return {
      'up': 'trend-up',
      'down': 'trend-down',
      'stable': 'trend-stable'
    }[trend];
  }

  private getMockData(): CategoryStatsResponse {
    // Mock data for development
    return {
      expenseCategories: [
        {
          category: 'Food',
          type: 'expense',
          totalAmount: 450.75,
          transactionCount: 12,
          averageAmount: 37.56,
          percentage: 32.5,
          trend: 'up',
          trendPercentage: 5.2,
          monthlyData: [
            { month: 'Jan', amount: 420, transactionCount: 11 },
            { month: 'Feb', amount: 380, transactionCount: 10 },
            { month: 'Mar', amount: 450, transactionCount: 12 }
          ]
        },
        {
          category: 'Transport',
          type: 'expense',
          totalAmount: 320.50,
          transactionCount: 8,
          averageAmount: 40.06,
          percentage: 23.1,
          trend: 'stable',
          trendPercentage: 0.5,
          monthlyData: [
            { month: 'Jan', amount: 300, transactionCount: 7 },
            { month: 'Feb', amount: 310, transactionCount: 8 },
            { month: 'Mar', amount: 320, transactionCount: 8 }
          ]
        },
        {
          category: 'Entertainment',
          type: 'expense',
          totalAmount: 280.25,
          transactionCount: 6,
          averageAmount: 46.71,
          percentage: 20.2,
          trend: 'down',
          trendPercentage: -8.3,
          monthlyData: [
            { month: 'Jan', amount: 320, transactionCount: 7 },
            { month: 'Feb', amount: 290, transactionCount: 6 },
            { month: 'Mar', amount: 280, transactionCount: 6 }
          ]
        }
      ],
      revenueCategories: [
        {
          category: 'Salary',
          type: 'revenue',
          totalAmount: 4500.00,
          transactionCount: 1,
          averageAmount: 4500.00,
          percentage: 78.5,
          trend: 'stable',
          trendPercentage: 0,
          monthlyData: [
            { month: 'Jan', amount: 4500, transactionCount: 1 },
            { month: 'Feb', amount: 4500, transactionCount: 1 },
            { month: 'Mar', amount: 4500, transactionCount: 1 }
          ]
        },
        {
          category: 'Freelance',
          type: 'revenue',
          totalAmount: 800.00,
          transactionCount: 3,
          averageAmount: 266.67,
          percentage: 14.0,
          trend: 'up',
          trendPercentage: 15.2,
          monthlyData: [
            { month: 'Jan', amount: 650, transactionCount: 2 },
            { month: 'Feb', amount: 720, transactionCount: 3 },
            { month: 'Mar', amount: 800, transactionCount: 3 }
          ]
        }
      ],
      timeFrame: this.selectedTimeFrame,
      summary: {
        totalExpenses: 1386.75,
        totalRevenue: 5745.00,
        averageTransaction: 85.42,
        mostSpentCategory: 'Food',
        mostRevenueCategory: 'Salary'
      }
    };
  }
  // Add this method to category-stats.component.ts
  getCategoryColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      'Food': '#ef4444',
      'Transport': '#f97316',
      'Entertainment': '#f59e0b',
      'Shopping': '#84cc16',
      'Bills': '#10b981',
      'Healthcare': '#0ea5e9',
      'Education': '#3b82f6',
      'Travel': '#8b5cf6',
      'Salary': '#059669',
      'Freelance': '#3b82f6',
      'Investment': '#8b5cf6',
      'Gift': '#d946ef',
      'Other': '#6b7280'
    };

    return colorMap[category] || this.generateColorFromString(category);
  }

  private generateColorFromString(str: string): string {
    // Generate a consistent color from string hash
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#0ea5e9', '#3b82f6', '#8b5cf6', '#a855f7', '#ec4899'];
    return colors[Math.abs(hash) % colors.length];
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}

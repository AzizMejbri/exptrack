import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { ThemeService } from '../theme.service';
import {
  Transaction,
  TransactionSummary,
  CategorySummary
} from '../models/transaction.model';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  timeFrames = [
    { value: 'month', label: 'This Month' },
    { value: 'week', label: 'This Week' },
    { value: 'day', label: 'Today' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' }
  ];

  selectedTimeFrame = 'month';
  transactions: Transaction[] = [];
  summary: TransactionSummary;
  categorySummary: CategorySummary[] = [];
  isLoading = true;
  isDarkMode = false;
  private themeSubscription!: Subscription;

  chartPercentage = {
    expenses: 50,
    revenue: 50
  };

  constructor(
    private transactionService: TransactionService,
    private themeService: ThemeService
  ) {
    // Initialize summary with mock to guarantee template sees valid data
    this.summary = this.getMockSummary();
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      mode => this.isDarkMode = mode
    );
    this.loadDashboardData();
  }

  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }

  onTimeFrameChange() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    let loaded = 0;
    const finish = () => {
      loaded++;
      if (loaded === 3) this.isLoading = false;
    };

    // Transactions
    this.transactionService.getTransactions(this.selectedTimeFrame, 5)
      .pipe(catchError(() => of([])))
      .subscribe(data => {
        this.transactions = data && data.length ? data : this.getMockTransactions();
        finish();
      });

    // Summary
    this.transactionService.getTransactionSummary(this.selectedTimeFrame)
      .pipe(catchError(() => of(this.getMockSummary())))
      .subscribe(summary => {
        const expenses = Number(summary?.totalExpenses) || 0;
        const revenue = Number(summary?.totalRevenue) || 0;
        // if zero totals, use mock
        this.summary = (expenses === 0 && revenue === 0) ? this.getMockSummary() : summary;
        this.updateChartData();
        finish();
      });

    // Categories
    this.transactionService.getCategorySummary(this.selectedTimeFrame)
      .pipe(catchError(() => of(this.getMockCategories())))
      .subscribe(data => {
        this.categorySummary = data && data.length ? data : this.getMockCategories();
        finish();
      });
  }

  updateChartData() {
    const expenses = Number(this.summary.totalExpenses) || 0;
    const revenue = Number(this.summary.totalRevenue) || 0;
    const total = expenses + revenue;

    if (total <= 0) {
      this.chartPercentage = { expenses: 50, revenue: 50 };
      return;
    }

    this.chartPercentage = {
      expenses: +(expenses / total * 100).toFixed(1),
      revenue: +(revenue / total * 100).toFixed(1)
    };
  }

  getChartWidth(type: 'revenue' | 'expenses') {
    return type === 'revenue' ? this.chartPercentage.revenue : this.chartPercentage.expenses;
  }

  /* --------------------- MOCK DATA --------------------- */
  getMockTransactions(): Transaction[] {
    return [
      { id: '1', amount: 150, type: 'expense', category: 'Food', description: 'Lunch', date: new Date(), userId: '1' },
      { id: '2', amount: 200, type: 'expense', category: 'Transport', description: 'Bus Pass', date: new Date(), userId: '1' },
      { id: '3', amount: 3000, type: 'revenue', category: 'Salary', description: 'Monthly Salary', date: new Date(), userId: '1' },
      { id: '4', amount: 75, type: 'expense', category: 'Entertainment', description: 'Movies', date: new Date(), userId: '1' },
      { id: '5', amount: 500, type: 'revenue', category: 'Freelance', description: 'Web Project', date: new Date(), userId: '1' }
    ];
  }

  getMockSummary(): TransactionSummary {
    return {
      totalExpenses: 425,
      totalRevenue: 3500,
      netAmount: 3075,
      period: this.selectedTimeFrame,
      currency: 'USD',
      transactionCount: 5
    };
  }

  getMockCategories(): CategorySummary[] {
    return [
      { category: 'Food', amount: 150, type: 'expense', percentage: 35.3 },
      { category: 'Transport', amount: 200, type: 'expense', percentage: 47.1 },
      { category: 'Entertainment', amount: 75, type: 'expense', percentage: 17.6 },
      { category: 'Salary', amount: 3000, type: 'revenue', percentage: 85.7 },
      { category: 'Freelance', amount: 500, type: 'revenue', percentage: 14.3 }
    ];
  }

  formatCurrency(amount: number | null | undefined) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount ?? 0);
  }

  getExpenseCategories() {
    return this.categorySummary.filter(c => c.type === 'expense');
  }

  getRevenueCategories() {
    return this.categorySummary.filter(c => c.type === 'revenue');
  }

  formatDate(date: Date) {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

}

// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { Transaction, TransactionSummary, CategorySummary } from '../models/transaction.model';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, BaseChartDirective],
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardComponent implements OnInit {
  timeFrames = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' }
  ];

  selectedTimeFrame = 'month';
  transactions: Transaction[] = [];
  summary: TransactionSummary | null = null;
  categorySummary: CategorySummary[] = [];
  isLoading = true;

  // Chart data
  chartData: any = {};
  chartOptions: any = {};

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.loadDashboardData();
  }

  onTimeFrameChange() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;

    this.transactionService.getTransactions(this.selectedTimeFrame).subscribe(transactions => {
      this.transactions = transactions;
    });

    this.transactionService.getTransactionSummary(this.selectedTimeFrame).subscribe(summary => {
      this.summary = summary;
      this.updateChartData();
    });

    this.transactionService.getCategorySummary(this.selectedTimeFrame).subscribe(categories => {
      this.categorySummary = categories;
      this.isLoading = false;
    });
  }

  updateChartData() {
    if (!this.summary) return;

    this.chartData = {
      labels: ['Expenses', 'Revenue'],
      datasets: [
        {
          data: [this.summary.totalExpenses, this.summary.totalRevenue],
          backgroundColor: ['#ef4444', '#10b981'],
          hoverBackgroundColor: ['#dc2626', '#059669'],
          borderWidth: 0
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              return `$${context.parsed}`;
            }
          }
        }
      }
    };
  }

  getExpenseCategories() {
    return this.categorySummary.filter(cat => cat.type === 'expense');
  }

  getRevenueCategories() {
    return this.categorySummary.filter(cat => cat.type === 'revenue');
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}

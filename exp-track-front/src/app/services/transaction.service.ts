// transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Transaction, TransactionSummary, CategorySummary } from '../models/transaction.model';

// Define interfaces for reports
export interface ReportData {
  type: 'expense' | 'revenue' | 'all';
  startDate: string;
  endDate: string;
  format: 'pdf' | 'csv' | 'json';
}

export interface ExpenseReport {
  category: string;
  totalAmount: number;
  transactionCount: number;
  averageAmount: number;
  percentage: number;
  monthlyBreakdown: MonthlyBreakdown[];
}

export interface MonthlyBreakdown {
  month: string;
  amount: number;
  percentage: number;
}

export interface IncomeStatement {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  grossMargin: number;
  categories: {
    revenue: CategoryBreakdown[];
    expenses: CategoryBreakdown[];
  };
}

export interface CategoryBreakdown {
  name: string;
  amount: number;
  percentage: number;
}

export interface TrendAnalysis {
  period: string;
  totalAmount: number;
  percentageChange: number;
  trend: 'up' | 'down' | 'stable';
  forecast?: number;
}

export interface CategoryDetail {
  category: string;
  type: 'expense' | 'revenue';
  totalAmount: number;
  transactionCount: number;
  averageAmount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  monthlyData?: MonthlyData[];
}

export interface MonthlyData {
  month: string;
  amount: number;
  transactionCount: number;
}

export interface CategoryStatsResponse {
  expenseCategories: CategoryDetail[];
  revenueCategories: CategoryDetail[];
  timeFrame: string;
  summary: {
    totalExpenses: number;
    totalRevenue: number;
    averageTransaction: number;
    mostSpentCategory: string;
    mostRevenueCategory: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = '/api/transactions';

  // Mock data
  private mockTransactions: Transaction[] = [
    { id: '1', amount: 150, type: 'expense', category: 'Food', description: 'Lunch at restaurant', date: new Date('2024-01-15'), userId: '1' },
    { id: '2', amount: 200, type: 'expense', category: 'Transport', description: 'Monthly bus pass', date: new Date('2024-01-10'), userId: '1' },
    { id: '3', amount: 3000, type: 'revenue', category: 'Salary', description: 'Monthly salary', date: new Date('2024-01-01'), userId: '1' },
    { id: '4', amount: 75, type: 'expense', category: 'Entertainment', description: 'Movie tickets', date: new Date('2024-01-20'), userId: '1' },
    { id: '5', amount: 500, type: 'revenue', category: 'Freelance', description: 'Web design project', date: new Date('2024-01-05'), userId: '1' },
    { id: '6', amount: 120, type: 'expense', category: 'Food', description: 'Groceries', date: new Date('2024-01-18'), userId: '1' },
    { id: '7', amount: 180, type: 'expense', category: 'Bills', description: 'Electricity bill', date: new Date('2024-01-12'), userId: '1' },
    { id: '8', amount: 350, type: 'revenue', category: 'Investment', description: 'Stock dividends', date: new Date('2024-01-25'), userId: '1' },
    { id: '9', amount: 90, type: 'expense', category: 'Shopping', description: 'New clothes', date: new Date('2024-01-22'), userId: '1' },
    { id: '10', amount: 2500, type: 'revenue', category: 'Salary', description: 'Monthly salary', date: new Date('2024-02-01'), userId: '1' },
    { id: '11', amount: 140, type: 'expense', category: 'Transport', description: 'Gas refill', date: new Date('2024-02-05'), userId: '1' },
    { id: '12', amount: 220, type: 'expense', category: 'Food', description: 'Restaurant dinner', date: new Date('2024-02-08'), userId: '1' },
    { id: '13', amount: 650, type: 'revenue', category: 'Freelance', description: 'App development', date: new Date('2024-02-10'), userId: '1' },
    { id: '14', amount: 110, type: 'expense', category: 'Healthcare', description: 'Pharmacy', date: new Date('2024-02-15'), userId: '1' },
    { id: '15', amount: 320, type: 'expense', category: 'Entertainment', description: 'Concert tickets', date: new Date('2024-02-20'), userId: '1' },
    { id: '16', amount: 2800, type: 'revenue', category: 'Salary', description: 'Monthly salary', date: new Date('2024-03-01'), userId: '1' },
    { id: '17', amount: 180, type: 'expense', category: 'Bills', description: 'Internet bill', date: new Date('2024-03-05'), userId: '1' },
    { id: '18', amount: 95, type: 'expense', category: 'Food', description: 'Takeout', date: new Date('2024-03-10'), userId: '1' },
    { id: '19', amount: 420, type: 'revenue', category: 'Investment', description: 'Bond interest', date: new Date('2024-03-15'), userId: '1' },
    { id: '20', amount: 160, type: 'expense', category: 'Transport', description: 'Taxi rides', date: new Date('2024-03-20'), userId: '1' },
    { id: '21', amount: 270, type: 'expense', category: 'Shopping', description: 'Electronics', date: new Date('2024-03-25'), userId: '1' },
    { id: '22', amount: 2900, type: 'revenue', category: 'Salary', description: 'Monthly salary', date: new Date('2024-04-01'), userId: '1' },
    { id: '23', amount: 130, type: 'expense', category: 'Healthcare', description: 'Doctor visit', date: new Date('2024-04-05'), userId: '1' },
    { id: '24', amount: 75, type: 'expense', category: 'Food', description: 'Coffee shops', date: new Date('2024-04-10'), userId: '1' },
    { id: '25', amount: 300, type: 'revenue', category: 'Freelance', description: 'Consulting', date: new Date('2024-04-15'), userId: '1' }
  ];

  private mockCategories: CategorySummary[] = [
    { category: 'Food', amount: 825, type: 'expense', percentage: 32.5 },
    { category: 'Transport', amount: 530, type: 'expense', percentage: 20.9 },
    { category: 'Entertainment', amount: 395, type: 'expense', percentage: 15.6 },
    { category: 'Bills', amount: 360, type: 'expense', percentage: 14.2 },
    { category: 'Shopping', amount: 360, type: 'expense', percentage: 14.2 },
    { category: 'Healthcare', amount: 240, type: 'expense', percentage: 9.5 },
    { category: 'Other', amount: 120, type: 'expense', percentage: 4.7 },
    { category: 'Salary', amount: 11200, type: 'revenue', percentage: 74.7 },
    { category: 'Freelance', amount: 1450, type: 'revenue', percentage: 9.7 },
    { category: 'Investment', amount: 1070, type: 'revenue', percentage: 7.1 },
    { category: 'Gift', amount: 750, type: 'revenue', percentage: 5.0 },
    { category: 'Other', amount: 530, type: 'revenue', percentage: 3.5 }
  ];

  constructor(private http: HttpClient) { }

  // Get transactions with filtering and pagination
  getTransactions(timeFrame: string, limit: number = 10, page: number = 1): Observable<Transaction[]> {
    // Filter by timeframe (simplified)
    const filtered = this.filterByTimeFrame(this.mockTransactions, timeFrame);
    // Simulate pagination
    const start = (page - 1) * limit;
    const end = start + limit;

    return of(filtered.slice(start, end)).pipe(delay(300));
  }

  // Get financial summary
  getTransactionSummary(timeFrame: string, startDate?: string, endDate?: string): Observable<TransactionSummary> {
    const filtered = this.filterByTimeFrame(this.mockTransactions, timeFrame);
    const expenses = filtered.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const revenue = filtered.filter(t => t.type === 'revenue').reduce((sum, t) => sum + t.amount, 0);

    const summary: TransactionSummary = {
      totalExpenses: expenses,
      totalRevenue: revenue,
      netAmount: revenue - expenses,
      period: timeFrame,
      currency: 'USD',
      transactionCount: filtered.length
    };

    return of(summary).pipe(delay(300));
  }

  // Get category breakdown
  getCategorySummary(timeFrame: string): Observable<CategorySummary[]> {
    const filtered = this.filterByTimeFrame(this.mockTransactions, timeFrame);

    // Calculate category totals
    const categories = new Map<string, { amount: number, type: 'expense' | 'revenue' }>();

    filtered.forEach(transaction => {
      const key = `${transaction.category}-${transaction.type}`;
      const current = categories.get(key) || { amount: 0, type: transaction.type };
      current.amount += transaction.amount;
      categories.set(key, current);
    });

    // Convert to CategorySummary array
    const totalExpenses = Array.from(categories.values())
      .filter(c => c.type === 'expense')
      .reduce((sum, c) => sum + c.amount, 0);

    const totalRevenue = Array.from(categories.values())
      .filter(c => c.type === 'revenue')
      .reduce((sum, c) => sum + c.amount, 0);

    const result: CategorySummary[] = [];

    categories.forEach((value, key) => {
      const [category, type] = key.split('-') as [string, 'expense' | 'revenue'];
      const total = type === 'expense' ? totalExpenses : totalRevenue;
      const percentage = total > 0 ? (value.amount / total) * 100 : 0;

      result.push({
        category,
        amount: value.amount,
        type,
        percentage: parseFloat(percentage.toFixed(1))
      });
    });

    return of(result).pipe(delay(300));
  }

  // Get detailed category statistics
  getCategoryStats(timeFrame: string): Observable<CategoryStatsResponse> {
    const mockResponse: CategoryStatsResponse = {
      expenseCategories: [
        {
          category: 'Food',
          type: 'expense',
          totalAmount: 825,
          transactionCount: 6,
          averageAmount: 137.5,
          percentage: 32.5,
          trend: 'up',
          trendPercentage: 5.2,
          monthlyData: [
            { month: 'Jan', amount: 270, transactionCount: 2 },
            { month: 'Feb', amount: 220, transactionCount: 1 },
            { month: 'Mar', amount: 95, transactionCount: 1 },
            { month: 'Apr', amount: 240, transactionCount: 2 }
          ]
        },
        {
          category: 'Transport',
          type: 'expense',
          totalAmount: 530,
          transactionCount: 4,
          averageAmount: 132.5,
          percentage: 20.9,
          trend: 'stable',
          trendPercentage: 0.5,
          monthlyData: [
            { month: 'Jan', amount: 200, transactionCount: 1 },
            { month: 'Feb', amount: 140, transactionCount: 1 },
            { month: 'Mar', amount: 160, transactionCount: 1 },
            { month: 'Apr', amount: 30, transactionCount: 1 }
          ]
        },
        {
          category: 'Entertainment',
          type: 'expense',
          totalAmount: 395,
          transactionCount: 3,
          averageAmount: 131.7,
          percentage: 15.6,
          trend: 'down',
          trendPercentage: -8.3,
          monthlyData: [
            { month: 'Jan', amount: 75, transactionCount: 1 },
            { month: 'Feb', amount: 320, transactionCount: 1 },
            { month: 'Mar', amount: 0, transactionCount: 0 },
            { month: 'Apr', amount: 0, transactionCount: 0 }
          ]
        }
      ],
      revenueCategories: [
        {
          category: 'Salary',
          type: 'revenue',
          totalAmount: 11200,
          transactionCount: 4,
          averageAmount: 2800,
          percentage: 74.7,
          trend: 'stable',
          trendPercentage: 0,
          monthlyData: [
            { month: 'Jan', amount: 3000, transactionCount: 1 },
            { month: 'Feb', amount: 2500, transactionCount: 1 },
            { month: 'Mar', amount: 2800, transactionCount: 1 },
            { month: 'Apr', amount: 2900, transactionCount: 1 }
          ]
        },
        {
          category: 'Freelance',
          type: 'revenue',
          totalAmount: 1450,
          transactionCount: 3,
          averageAmount: 483.3,
          percentage: 9.7,
          trend: 'up',
          trendPercentage: 15.2,
          monthlyData: [
            { month: 'Jan', amount: 500, transactionCount: 1 },
            { month: 'Feb', amount: 650, transactionCount: 1 },
            { month: 'Mar', amount: 0, transactionCount: 0 },
            { month: 'Apr', amount: 300, transactionCount: 1 }
          ]
        },
        {
          category: 'Investment',
          type: 'revenue',
          totalAmount: 1070,
          transactionCount: 2,
          averageAmount: 535,
          percentage: 7.1,
          trend: 'up',
          trendPercentage: 12.5,
          monthlyData: [
            { month: 'Jan', amount: 350, transactionCount: 1 },
            { month: 'Feb', amount: 0, transactionCount: 0 },
            { month: 'Mar', amount: 420, transactionCount: 1 },
            { month: 'Apr', amount: 300, transactionCount: 1 }
          ]
        }
      ],
      timeFrame: timeFrame,
      summary: {
        totalExpenses: 2540,
        totalRevenue: 15000,
        averageTransaction: 625,
        mostSpentCategory: 'Food',
        mostRevenueCategory: 'Salary'
      }
    };

    return of(mockResponse).pipe(delay(300));
  }

  // Generate report
  generateReport(reportData: ReportData): Observable<any> {
    // Create a mock blob for export
    const data = {
      reportType: reportData.type,
      period: `${reportData.startDate} to ${reportData.endDate}`,
      format: reportData.format,
      data: this.getMockReportData(reportData.type),
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: this.getMimeType(reportData.format)
    });

    return of(blob).pipe(delay(500));
  }

  // Get expense report
  getExpenseReport(startDate: string, endDate: string): Observable<ExpenseReport[]> {
    const mockData: ExpenseReport[] = [
      {
        category: 'Food',
        totalAmount: 825,
        transactionCount: 6,
        averageAmount: 137.5,
        percentage: 32.5,
        monthlyBreakdown: [
          { month: 'Jan', amount: 270, percentage: 32.7 },
          { month: 'Feb', amount: 220, percentage: 26.7 },
          { month: 'Mar', amount: 95, percentage: 11.5 },
          { month: 'Apr', amount: 240, percentage: 29.1 }
        ]
      },
      {
        category: 'Transport',
        totalAmount: 530,
        transactionCount: 4,
        averageAmount: 132.5,
        percentage: 20.9,
        monthlyBreakdown: [
          { month: 'Jan', amount: 200, percentage: 37.7 },
          { month: 'Feb', amount: 140, percentage: 26.4 },
          { month: 'Mar', amount: 160, percentage: 30.2 },
          { month: 'Apr', amount: 30, percentage: 5.7 }
        ]
      },
      {
        category: 'Entertainment',
        totalAmount: 395,
        transactionCount: 3,
        averageAmount: 131.7,
        percentage: 15.6,
        monthlyBreakdown: [
          { month: 'Jan', amount: 75, percentage: 19.0 },
          { month: 'Feb', amount: 320, percentage: 81.0 },
          { month: 'Mar', amount: 0, percentage: 0 },
          { month: 'Apr', amount: 0, percentage: 0 }
        ]
      },
      {
        category: 'Bills',
        totalAmount: 360,
        transactionCount: 2,
        averageAmount: 180,
        percentage: 14.2,
        monthlyBreakdown: [
          { month: 'Jan', amount: 180, percentage: 50.0 },
          { month: 'Feb', amount: 0, percentage: 0 },
          { month: 'Mar', amount: 180, percentage: 50.0 },
          { month: 'Apr', amount: 0, percentage: 0 }
        ]
      },
      {
        category: 'Shopping',
        totalAmount: 360,
        transactionCount: 2,
        averageAmount: 180,
        percentage: 14.2,
        monthlyBreakdown: [
          { month: 'Jan', amount: 90, percentage: 25.0 },
          { month: 'Feb', amount: 0, percentage: 0 },
          { month: 'Mar', amount: 270, percentage: 75.0 },
          { month: 'Apr', amount: 0, percentage: 0 }
        ]
      }
    ];

    return of(mockData).pipe(delay(300));
  }

  // Get income statement
  getIncomeStatement(startDate: string, endDate: string): Observable<IncomeStatement> {
    const mockData: IncomeStatement = {
      totalRevenue: 15000,
      totalExpenses: 2540,
      netIncome: 12460,
      grossMargin: 83.1,
      categories: {
        revenue: [
          { name: 'Salary', amount: 11200, percentage: 74.7 },
          { name: 'Freelance', amount: 1450, percentage: 9.7 },
          { name: 'Investment', amount: 1070, percentage: 7.1 },
          { name: 'Gift', amount: 750, percentage: 5.0 },
          { name: 'Other', amount: 530, percentage: 3.5 }
        ],
        expenses: [
          { name: 'Food', amount: 825, percentage: 32.5 },
          { name: 'Transport', amount: 530, percentage: 20.9 },
          { name: 'Entertainment', amount: 395, percentage: 15.6 },
          { name: 'Bills', amount: 360, percentage: 14.2 },
          { name: 'Shopping', amount: 360, percentage: 14.2 },
          { name: 'Healthcare', amount: 240, percentage: 9.5 },
          { name: 'Other', amount: 120, percentage: 4.7 }
        ]
      }
    };

    return of(mockData).pipe(delay(300));
  }

  // Get trend analysis
  getTrendAnalysis(timeFrame: 'monthly' | 'quarterly' | 'yearly'): Observable<TrendAnalysis[]> {
    let mockData: TrendAnalysis[];

    if (timeFrame === 'monthly') {
      mockData = [
        { period: 'Jan 2024', totalAmount: 3875, percentageChange: 0, trend: 'stable' },
        { period: 'Feb 2024', totalAmount: 4230, percentageChange: 9.2, trend: 'up' },
        { period: 'Mar 2024', totalAmount: 3785, percentageChange: -10.5, trend: 'down' },
        { period: 'Apr 2024', totalAmount: 4150, percentageChange: 9.6, trend: 'up' },
        { period: 'May 2024', totalAmount: 4500, percentageChange: 8.4, trend: 'up', forecast: 4500 },
        { period: 'Jun 2024', totalAmount: 0, percentageChange: 0, trend: 'stable', forecast: 4850 }
      ];
    } else if (timeFrame === 'quarterly') {
      mockData = [
        { period: 'Q1 2024', totalAmount: 11890, percentageChange: 5.2, trend: 'up' },
        { period: 'Q2 2024', totalAmount: 8650, percentageChange: -27.2, trend: 'down' },
        { period: 'Q3 2024', totalAmount: 0, percentageChange: 0, trend: 'stable', forecast: 12500 },
        { period: 'Q4 2024', totalAmount: 0, percentageChange: 0, trend: 'stable', forecast: 14000 }
      ];
    } else {
      mockData = [
        { period: '2022', totalAmount: 45200, percentageChange: 8.5, trend: 'up' },
        { period: '2023', totalAmount: 49850, percentageChange: 10.3, trend: 'up' },
        { period: '2024', totalAmount: 20540, percentageChange: 12.7, trend: 'up', forecast: 56000 }
      ];
    }

    return of(mockData).pipe(delay(300));
  }

  // Get budget vs actual
  getBudgetVsActual(): Observable<any> {
    const mockData = {
      categories: [
        { name: 'Food', budget: 1000, actual: 825, variance: 175, variancePercent: 17.5 },
        { name: 'Transport', budget: 600, actual: 530, variance: 70, variancePercent: 11.7 },
        { name: 'Entertainment', budget: 400, actual: 395, variance: 5, variancePercent: 1.3 },
        { name: 'Bills', budget: 400, actual: 360, variance: 40, variancePercent: 10.0 },
        { name: 'Shopping', budget: 300, actual: 360, variance: -60, variancePercent: -20.0 },
        { name: 'Healthcare', budget: 200, actual: 240, variance: -40, variancePercent: -20.0 }
      ],
      total: {
        budget: 2900,
        actual: 2710,
        variance: 190,
        variancePercent: 6.6
      }
    };

    return of(mockData).pipe(delay(300));
  }

  // Helper method to filter by timeFrame
  private filterByTimeFrame(transactions: Transaction[], timeFrame: string): Transaction[] {
    const now = new Date();
    let startDate: Date;

    switch (timeFrame) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'all':
        return transactions;
      default:
        return transactions;
    }

    return transactions.filter(t => new Date(t.date) >= startDate);
  }

  // Helper method to get MIME type for blob
  private getMimeType(format: string): string {
    switch (format) {
      case 'pdf': return 'application/pdf';
      case 'csv': return 'text/csv';
      case 'json': return 'application/json';
      default: return 'application/octet-stream';
    }
  }

  // Helper method to generate mock report data
  private getMockReportData(type: string): any {
    switch (type) {
      case 'expense':
        return this.getExpenseReport('2024-01-01', '2024-04-30');
      case 'revenue':
        return this.getIncomeStatement('2024-01-01', '2024-04-30');
      default:
        return {
          summary: {
            totalExpenses: 2540,
            totalRevenue: 15000,
            netIncome: 12460
          }
        };
    }
  }
}

// services/transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Transaction, TransactionSummary, CategorySummary } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = '/api/transactions';

  constructor(private http: HttpClient) { }

  // In a real app, these would be HTTP calls
  getTransactions(timeFrame: string): Observable<Transaction[]> {
    // Mock data - replace with actual API calls
    const mockTransactions: Transaction[] = [
      { id: '1', amount: 150, type: 'expense', category: 'Food', description: 'Lunch', date: new Date(), userId: '1' },
      { id: '2', amount: 200, type: 'expense', category: 'Transport', description: 'Bus pass', date: new Date(), userId: '1' },
      { id: '3', amount: 3000, type: 'revenue', category: 'Salary', description: 'Monthly salary', date: new Date(), userId: '1' },
      { id: '4', amount: 75, type: 'expense', category: 'Entertainment', description: 'Movie', date: new Date(), userId: '1' },
      { id: '5', amount: 500, type: 'revenue', category: 'Freelance', description: 'Project payment', date: new Date(), userId: '1' },
    ];
    return of(mockTransactions);
  }

  getTransactionSummary(timeFrame: string): Observable<TransactionSummary> {
    // Mock summary data
    const mockSummary: TransactionSummary = {
      totalExpenses: 425,
      totalRevenue: 3500,
      netAmount: 3075,
      period: timeFrame
    };
    return of(mockSummary);
  }

  getCategorySummary(timeFrame: string): Observable<CategorySummary[]> {
    // Mock category data
    const mockCategories: CategorySummary[] = [
      { category: 'Food', amount: 150, type: 'expense', percentage: 35.3 },
      { category: 'Transport', amount: 200, type: 'expense', percentage: 47.1 },
      { category: 'Entertainment', amount: 75, type: 'expense', percentage: 17.6 },
      { category: 'Salary', amount: 3000, type: 'revenue', percentage: 85.7 },
      { category: 'Freelance', amount: 500, type: 'revenue', percentage: 14.3 },
    ];
    return of(mockCategories);
  }
}

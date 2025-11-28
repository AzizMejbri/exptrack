// transactions.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  showAddModal = false;

  // Filters
  searchTerm = '';
  selectedType: 'all' | 'expense' | 'revenue' = 'all';
  selectedCategory = 'all';
  dateRange = {
    start: '',
    end: ''
  };

  // New transaction form
  newTransaction: Partial<Transaction> = {
    type: 'expense',
    amount: 0,
    category: '',
    description: '',
    date: new Date(),
  };

  categories = {
    expense: ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Healthcare'],
    revenue: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other']
  };

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions('all').subscribe(transactions => {
      this.transactions = transactions;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesType = this.selectedType === 'all' || transaction.type === this.selectedType;

      const matchesCategory = this.selectedCategory === 'all' || transaction.category === this.selectedCategory;

      const matchesDate = !this.dateRange.start || !this.dateRange.end ||
        (new Date(transaction.date) >= new Date(this.dateRange.start) &&
          new Date(transaction.date) <= new Date(this.dateRange.end));

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  }

  addTransaction() {
    if (this.newTransaction.amount && this.newTransaction.category && this.newTransaction.description) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        amount: this.newTransaction.amount!,
        type: this.newTransaction.type!,
        category: this.newTransaction.category!,
        description: this.newTransaction.description!,
        date: new Date(this.newTransaction.date!),
        userId: '1' // In real app, get from auth service
      };

      this.transactions.unshift(transaction);
      this.applyFilters();
      this.closeAddModal();
      this.resetForm();
    }
  }

  editTransaction(transaction: Transaction) {
    // Implementation for edit
    console.log('Edit transaction:', transaction);
  }

  deleteTransaction(transactionId: string) {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.transactions = this.transactions.filter(t => t.id !== transactionId);
      this.applyFilters();
    }
  }

  openAddModal() {
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  resetForm() {
    this.newTransaction = {
      type: 'expense',
      amount: 0,
      category: '',
      description: '',
      date: new Date(),
    };
  }

  getCategories() {
    return this.newTransaction.type === 'expense' ? this.categories.expense : this.categories.revenue;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}

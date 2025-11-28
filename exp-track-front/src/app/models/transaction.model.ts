// models/transaction.model.ts
export interface Transaction {
  id: string;
  amount: number;
  type: 'expense' | 'revenue';
  category: string;
  description: string;
  date: Date;
  userId: string;
}

export interface TransactionSummary {
  totalExpenses: number;
  totalRevenue: number;
  netAmount: number;
  period: string;
}

export interface CategorySummary {
  category: string;
  amount: number;
  type: 'expense' | 'revenue';
  percentage: number;
}

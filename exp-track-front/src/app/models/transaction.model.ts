// models/transaction.model.ts
export interface Transaction {
  id: string;
  amount: number;
  type: 'expense' | 'revenue';
  category: string;
  description: string;
  date: Date;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransactionSummary {
  totalExpenses: number;
  totalRevenue: number;
  netAmount: number;
  period: string;
  currency?: string;
  periodStart?: string;
  periodEnd?: string;
  transactionCount?: number;
}

export interface CategorySummary {
  category: string;
  amount: number;
  type: 'expense' | 'revenue';
  percentage: number;
  count?: number;
  color?: string;
}

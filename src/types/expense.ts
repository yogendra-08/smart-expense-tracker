
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface FinancialSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

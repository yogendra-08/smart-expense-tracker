
import { useState, useEffect } from 'react';
import { ExpenseHeader } from '@/components/ExpenseHeader';
import { FinancialSummary } from '@/components/FinancialSummary';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { ExpenseCharts } from '@/components/ExpenseCharts';
import { BudgetTracker } from '@/components/BudgetTracker';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Transaction } from '@/types/expense';
import { toast } from "sonner";

const Index = () => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [monthlyBudget, setMonthlyBudget] = useLocalStorage<number>('monthlyBudget', 0);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    setTransactions(prev => [...prev, newTransaction]);
    toast.success(`${transaction.type} of ₹${transaction.amount} added successfully!`);
  };

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast.success(`Transaction of ₹${transaction?.amount} deleted`);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <ExpenseHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <FinancialSummary 
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              balance={balance}
            />
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <TransactionForm onAddTransaction={addTransaction} />
              <BudgetTracker 
                monthlyBudget={monthlyBudget}
                setMonthlyBudget={setMonthlyBudget}
                totalExpenses={totalExpenses}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <ExpenseCharts transactions={transactions} />
          </div>
        </div>

        <TransactionList 
          transactions={transactions}
          onDeleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
};

export default Index;

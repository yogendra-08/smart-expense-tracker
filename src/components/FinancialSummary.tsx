
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FinancialSummaryProps } from '@/types/expense';

export const FinancialSummary = ({ totalIncome, totalExpenses, balance }: FinancialSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Income</p>
              <p className="text-2xl font-bold">₹{totalIncome.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Total Expenses</p>
              <p className="text-2xl font-bold">₹{totalExpenses.toFixed(2)}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-200" />
          </div>
        </CardContent>
      </Card>

      <Card className={`${balance >= 0 
        ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
        : 'bg-gradient-to-r from-orange-500 to-orange-600'} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Balance</p>
              <p className="text-2xl font-bold">₹{balance.toFixed(2)}</p>
            </div>
            <Wallet className="h-8 w-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

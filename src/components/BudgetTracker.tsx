
import { useState } from 'react';
import { Target, Edit3, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

interface BudgetTrackerProps {
  monthlyBudget: number;
  setMonthlyBudget: (budget: number) => void;
  totalExpenses: number;
}

export const BudgetTracker = ({ monthlyBudget, setMonthlyBudget, totalExpenses }: BudgetTrackerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [budgetInput, setBudgetInput] = useState(monthlyBudget.toString());

  const budgetPercentage = monthlyBudget > 0 ? (totalExpenses / monthlyBudget) * 100 : 0;
  
  const getBudgetColor = () => {
    if (budgetPercentage < 70) return 'bg-green-500';
    if (budgetPercentage < 100) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getBudgetStatus = () => {
    if (budgetPercentage < 70) return { text: 'On Track', color: 'text-green-600 dark:text-green-400' };
    if (budgetPercentage < 100) return { text: 'Warning', color: 'text-yellow-600 dark:text-yellow-400' };
    return { text: 'Over Budget', color: 'text-red-600 dark:text-red-400' };
  };

  const handleSaveBudget = () => {
    const newBudget = parseFloat(budgetInput) || 0;
    setMonthlyBudget(newBudget);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setBudgetInput(monthlyBudget.toString());
    setIsEditing(false);
  };

  const status = getBudgetStatus();

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <span>Budget Tracker</span>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Monthly Budget:</span>
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                step="0.01"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="w-24 h-8 text-sm"
                placeholder="0.00"
              />
              <Button onClick={handleSaveBudget} size="sm" variant="ghost">
                <Check className="h-4 w-4 text-green-600" />
              </Button>
              <Button onClick={handleCancelEdit} size="sm" variant="ghost">
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          ) : (
            <span className="font-semibold text-gray-900 dark:text-white">
              ₹{monthlyBudget.toFixed(2)}
            </span>
          )}
        </div>

        {monthlyBudget > 0 && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Spent:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ₹{totalExpenses.toFixed(2)} ({budgetPercentage.toFixed(1)}%)
                </span>
              </div>
              
              <Progress 
                value={Math.min(budgetPercentage, 100)} 
                className="h-3"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Status:</span>
              <span className={`text-sm font-semibold ${status.color}`}>
                {status.text}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Remaining:</span>
              <span className={`text-sm font-semibold ${
                monthlyBudget - totalExpenses >= 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                ₹{(monthlyBudget - totalExpenses).toFixed(2)}
              </span>
            </div>
          </>
        )}

        {monthlyBudget === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Set a monthly budget to track your progress</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

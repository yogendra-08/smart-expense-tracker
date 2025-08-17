
import { Moon, Sun, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExpenseHeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ExpenseHeader = ({ darkMode, toggleDarkMode }: ExpenseHeaderProps) => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Smart Expense Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Take control of your finances
          </p>
        </div>
      </div>
      
      <Button
        onClick={toggleDarkMode}
        variant="outline"
        size="icon"
        className="bg-white dark:bg-gray-800 hover:scale-110 transition-transform duration-200"
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-gray-600" />
        )}
      </Button>
    </header>
  );
};

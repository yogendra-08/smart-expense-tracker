
import { useEffect, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/types/expense';
import { PieChart, BarChart3 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface ExpenseChartsProps {
  transactions: Transaction[];
}

export const ExpenseCharts = ({ transactions }: ExpenseChartsProps) => {
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartInstance = useRef<ChartJS | null>(null);
  const barChartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const income = transactions.filter(t => t.type === 'income');

    // Pie Chart - Expense Categories
    if (pieChartRef.current && expenses.length > 0) {
      const ctx = pieChartRef.current.getContext('2d');
      
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }

      const categoryTotals = expenses.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>);

      const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
      ];

      pieChartInstance.current = new ChartJS(ctx!, {
        type: 'pie',
        data: {
          labels: Object.keys(categoryTotals),
          datasets: [{
            data: Object.values(categoryTotals),
            backgroundColor: colors.slice(0, Object.keys(categoryTotals).length),
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 15
              }
            }
          }
        }
      });
    }

    // Bar Chart - Monthly Income vs Expenses
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext('2d');
      
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }

      const monthlyData = transactions.reduce((acc, transaction) => {
        const month = new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        if (!acc[month]) {
          acc[month] = { income: 0, expense: 0 };
        }
        acc[month][transaction.type] += transaction.amount;
        return acc;
      }, {} as Record<string, { income: number; expense: number }>);

      const months = Object.keys(monthlyData).sort();
      const incomeData = months.map(month => monthlyData[month].income);
      const expenseData = months.map(month => monthlyData[month].expense);

      barChartInstance.current = new ChartJS(ctx!, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Income',
              data: incomeData,
              backgroundColor: '#10B981',
              borderColor: '#059669',
              borderWidth: 1
            },
            {
              label: 'Expenses',
              data: expenseData,
              backgroundColor: '#EF4444',
              borderColor: '#DC2626',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '₹' + value;
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
      }
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
    };
  }, [transactions]);

  const expenses = transactions.filter(t => t.type === 'expense');

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <PieChart className="h-5 w-5 text-blue-600" />
            <span>Expense Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length > 0 ? (
            <div className="h-64">
              <canvas ref={pieChartRef}></canvas>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No expenses to display</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span>Monthly Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <div className="h-64">
              <canvas ref={barChartRef}></canvas>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No data to display</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

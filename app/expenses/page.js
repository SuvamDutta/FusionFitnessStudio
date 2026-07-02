import { getExpenses, getGlobalMonth } from '@/lib/actions';
import AddExpenseForm from '@/app/components/AddExpenseForm';

export default async function ExpensesPage() {
  const { monthPrefix } = await getGlobalMonth();
  const expenses = await getExpenses(monthPrefix);

  return (
    <div>
      <div className="page-header">
        <h1>Expenses Tracker</h1>
      </div>

      <div className="grid-2 mb-2">
        <div className="card">
          <h2 className="mb-1">Record New Expense</h2>
          <AddExpenseForm monthPrefix={monthPrefix} />
        </div>

        <div className="card">
          <h2 className="mb-1">Expense Summary</h2>
          <p className="text-muted mb-1">Total expenses recorded: {expenses.length}</p>
          <div className="card-value negative">
            ₹{expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-1">All Expenses</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td>{e.category}</td>
                  <td>{e.description || '-'}</td>
                  <td>₹{e.amount}</td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No expenses recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

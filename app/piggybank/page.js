import { getPiggyBankSavings, getGlobalMonth } from '@/lib/actions';
import AddPiggyBankForm from '@/app/components/AddPiggyBankForm';
import DeletePiggyBankButton from '@/app/components/DeletePiggyBankButton';
import { PiggyBank } from 'lucide-react';

export default async function PiggyBankPage() {
  const { monthPrefix } = await getGlobalMonth();
  const savings = await getPiggyBankSavings(monthPrefix);
  
  const totalSaved = savings.reduce((sum, s) => sum + s.amount, 0);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          animation: 'bounce 2s infinite',
          color: 'var(--primary)',
          display: 'flex'
        }}>
          <PiggyBank size={32} />
        </div>
        <h1>Piggy Bank</h1>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-10px);}
            60% {transform: translateY(-5px);}
          }
        `}} />
      </div>

      <div className="grid-2 mb-2">
        <div className="card">
          <h2 className="mb-1">Add to Piggy Bank</h2>
          <AddPiggyBankForm monthPrefix={monthPrefix} />
        </div>

        <div className="card">
          <h2 className="mb-1">Savings Summary</h2>
          <p className="text-muted mb-1">Total entries this month: {savings.length}</p>
          <div className="card-value positive" style={{ fontSize: '3rem', margin: '1rem 0' }}>
            ₹{totalSaved.toFixed(2)}
          </div>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Savings are automatically deducted from the Dashboard Monthly Profit calculation.
          </p>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-1">Savings History</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {savings.map(s => (
                <tr key={s.id}>
                  <td>{s.date}</td>
                  <td>{s.description || '-'}</td>
                  <td className="positive">₹{s.amount}</td>
                  <td>
                    <DeletePiggyBankButton id={s.id} />
                  </td>
                </tr>
              ))}
              {savings.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No savings recorded this month.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

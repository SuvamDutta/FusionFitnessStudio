import { getLockers, getLockerPayments, getGlobalMonth } from '@/lib/actions';
import LockerGrid from '@/app/components/LockerGrid';
import DeleteLockerPaymentButton from '@/app/components/DeleteLockerPaymentButton';
import MonthSelector from '@/app/components/MonthSelector';

export default async function LockersPage() {
  const { year, month, monthPrefix } = await getGlobalMonth();
  const rawLockers = await getLockers();
  const lockers = JSON.parse(JSON.stringify(rawLockers));
  const payments = await getLockerPayments(monthPrefix);

  const totalPayments = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Locker Room</h1>
        <MonthSelector currentYear={year} currentMonth={month} />
      </div>

      <div className="grid-2 mb-2">
        <div className="card">
          <h2 className="mb-1">Locker Layout</h2>
          <p className="text-muted mb-1">Click a locker to manage its assignment and payments.</p>
          <LockerGrid lockers={lockers} />
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 className="mb-1">Locker Earnings</h2>
          <p className="text-muted mb-1">Total collected for this month</p>
          <div className="card-value positive mb-2" style={{ fontSize: '2rem' }}>
            ₹{totalPayments.toFixed(2)}
          </div>
          
          <h2 className="mb-1" style={{ marginTop: '1rem' }}>Payments History</h2>
          <div className="table-container" style={{ flex: 1 }}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Locker #</th>
                  <th>Assigned To</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id}>
                    <td>{p.date}</td>
                    <td>{p.locker_number}</td>
                    <td>{p.assigned_to || '-'}</td>
                    <td>₹{p.amount}</td>
                    <td><DeleteLockerPaymentButton id={p.id} /></td>
                  </tr>
                ))}
                {payments.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No payments recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

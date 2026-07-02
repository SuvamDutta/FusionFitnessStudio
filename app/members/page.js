import { getMembers, getPayments, getGlobalMonth } from '@/lib/actions';
import AddMemberForm from '@/app/components/AddMemberForm';
import AddPaymentForm from '@/app/components/AddPaymentForm';
import DeletePaymentButton from '@/app/components/DeletePaymentButton';
import DeleteMemberButton from '@/app/components/DeleteMemberButton';

export default async function MembersPage() {
  const { monthPrefix } = await getGlobalMonth();
  const members = await getMembers(monthPrefix);
  const payments = await getPayments(monthPrefix);

  return (
    <div>
      <div className="page-header">
        <h1>Members & Payments</h1>
      </div>

      <div className="grid-2 mb-2">
        <div className="card">
          <h2 className="mb-1">Add New Member</h2>
          <AddMemberForm />
        </div>
        
        <div className="card">
          <h2 className="mb-1">Record Payment</h2>
          <AddPaymentForm members={members} monthPrefix={monthPrefix} />
        </div>
      </div>

      <div className="card mb-2">
        <h2 className="mb-1">Recent Payments</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Member</th>
                <th>Amount</th>
                <th>Months Covered</th>
                <th>Type</th>
                <th>Mode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td>{p.date}</td>
                  <td>{p.member_name}</td>
                  <td>₹{p.amount}</td>
                  <td>{p.months_covered}</td>
                  <td>{p.payment_type === 'ADMISSION' ? 'Admission Fee' : 'Monthly Fee'}</td>
                  <td>{p.mode}</td>
                  <td><DeletePaymentButton id={p.id} /></td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No payments recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-1">Member List</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Join Date</th>
                <th>Status (This Month)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.join_date}</td>
                  <td>
                    <span style={{ color: m.dynamic_status === 'ACTIVE' ? 'var(--success)' : 'var(--danger)' }}>
                      {m.dynamic_status}
                    </span>
                  </td>
                  <td><DeleteMemberButton id={m.id} /></td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

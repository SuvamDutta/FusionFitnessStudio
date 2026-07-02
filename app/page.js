import { getMonthlyReport, getGlobalMonth } from '@/lib/actions';
import { IndianRupee, TrendingUp, TrendingDown, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import DownloadReportButton from './components/DownloadReportButton';

export default async function Dashboard() {
  const { year, month } = await getGlobalMonth();
  
  const report = await getMonthlyReport(year, month);
  
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = months[month - 1];

  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted">Overview for {currentMonthName} {year}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', alignItems: 'center' }}>
          <DownloadReportButton report={report} monthName={currentMonthName} year={year} />
        </div>
      </div>

      <div className="grid-4 mb-2">
        <div className="card">
          <div className="card-title">Total Income (Fees)</div>
          <div className="card-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <IndianRupee size={24} />
            {report.totalFees.toFixed(2)}
          </div>
          <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Apportioned monthly fees</p>
        </div>

        <div className="card">
          <div className="card-title">Supplement Revenue</div>
          <div className="card-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={24} />
            {report.supplementRevenue.toFixed(2)}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Net Supplement Profit</div>
          <div className="card-value positive" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={24} />
            {report.netSupplementProfit.toFixed(2)}
          </div>
        </div>

        <div className="card" style={{ borderColor: report.profit >= 0 ? 'var(--success)' : 'var(--danger)' }}>
          <div className="card-title">Net Profit</div>
          <div className={`card-value ${report.profit >= 0 ? 'positive' : 'negative'}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={24} />
            {report.profit.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="card mb-2">
        <h3 className="mb-1">Active Members ({currentMonthName})</h3>
        {report.validPayments.length === 0 ? (
          <p className="text-muted">No members are active for this month.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Member Name</th>
                  <th>Payment Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Mode</th>
                </tr>
              </thead>
              <tbody>
                {report.validPayments.map((vp, idx) => (
                  <tr key={idx}>
                    <td><strong>{vp.member_name}</strong></td>
                    <td>{vp.date}</td>
                    <td>{vp.payment_type === 'ADMISSION' ? 'Admission Fee' : 'Monthly Fee'}</td>
                    <td style={{ color: 'var(--success)' }}>+₹{vp.amount.toFixed(2)}</td>
                    <td>{vp.mode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid-2">
        <div className="card">
          <h3 className="mb-1">Recent Expenses</h3>
          {report.expenses.length === 0 ? (
            <p className="text-muted">No expenses recorded for this month.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {report.expenses.slice(0, 5).map(exp => (
                    <tr key={exp.id}>
                      <td>{exp.date}</td>
                      <td>{exp.category}</td>
                      <td>₹{exp.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="mb-1">Recent Supplements Sold</h3>
          {report.supplements.length === 0 ? (
            <p className="text-muted">No supplements sold this month.</p>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Buyer</th>
                    <th>Item</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {report.supplements.slice(0, 5).map(sup => (
                    <tr key={sup.id}>
                      <td>{sup.date}</td>
                      <td>{sup.buyer_name}</td>
                      <td>{sup.item}</td>
                      <td>₹{sup.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

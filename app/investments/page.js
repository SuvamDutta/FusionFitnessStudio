import { getInvestments, getGlobalMonth } from '@/lib/actions';
import AddInvestmentForm from '@/app/components/AddInvestmentForm';
import DeleteInvestmentButton from '@/app/components/DeleteInvestmentButton';
import { TrendingUp, TrendingDown, Bitcoin } from 'lucide-react';

async function getBtcPrice() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.bitcoin.usd;
  } catch (e) {
    return null;
  }
}

export default async function InvestmentsPage() {
  const { monthPrefix } = await getGlobalMonth();
  const allInvestments = await getInvestments();
  const monthInvestments = await getInvestments(monthPrefix);
  
  const currentBtcPrice = await getBtcPrice();
  
  const totalBtc = allInvestments.reduce((sum, inv) => sum + inv.quantity, 0);
  const totalUsdtInvested = allInvestments.reduce((sum, inv) => sum + inv.usdt_invested, 0);
  
  const totalCurrentValue = currentBtcPrice ? (totalBtc * currentBtcPrice) : 0;
  const profitLoss = totalCurrentValue - totalUsdtInvested;
  const isProfit = profitLoss >= 0;

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Bitcoin size={32} color="#F7931A" />
        <h1>BTC Investments</h1>
        {currentBtcPrice && (
          <span style={{ marginLeft: 'auto', padding: '0.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', fontWeight: 'bold' }}>
            Live BTC: ${currentBtcPrice.toLocaleString()}
          </span>
        )}
      </div>

      <div className="grid-2 mb-2">
        <div className="card">
          <h2 className="mb-1">Log Investment</h2>
          <AddInvestmentForm monthPrefix={monthPrefix} />
        </div>

        <div className="card">
          <h2 className="mb-1">Portfolio Summary</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              <span className="text-muted">Total BTC</span>
              <strong>{totalBtc.toFixed(8)} ₿</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
              <span className="text-muted">Total Invested</span>
              <strong>${totalUsdtInvested.toFixed(2)} USDT</strong>
            </div>
            {currentBtcPrice ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                  <span className="text-muted">Current Value</span>
                  <strong>${totalCurrentValue.toFixed(2)} USDT</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="text-muted">Total Profit / Loss</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isProfit ? 'var(--success)' : 'var(--danger)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                    {isProfit ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    {isProfit ? '+' : '-'}${Math.abs(profitLoss).toFixed(2)}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-muted text-center" style={{ marginTop: '1rem' }}>
                Live price currently unavailable.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-1">Investment History</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Asset</th>
                <th>Quantity</th>
                <th>Invested (USDT)</th>
                <th>Avg Buy Price</th>
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {allInvestments.map(inv => (
                <tr key={inv.id}>
                  <td>{inv.date}</td>
                  <td>{inv.asset}</td>
                  <td>{inv.quantity.toFixed(8)}</td>
                  <td>${inv.usdt_invested.toFixed(2)}</td>
                  <td>${(inv.usdt_invested / inv.quantity).toFixed(2)}</td>
                  <td>
                    <DeleteInvestmentButton id={inv.id} />
                  </td>
                </tr>
              ))}
              {allInvestments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No investments logged yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

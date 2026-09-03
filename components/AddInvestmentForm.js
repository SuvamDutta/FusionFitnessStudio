'use client';
import { useState } from 'react';
import { addInvestment } from '@/lib/actions';

export default function AddInvestmentForm({ monthPrefix }) {
  const today = new Date();
  const currentMonthPrefix = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const defaultDate = (monthPrefix && monthPrefix !== currentMonthPrefix) ? `${monthPrefix}-01` : today.toISOString().split('T')[0];

  const [quantity, setQuantity] = useState('');
  const [usdtInvested, setUsdtInvested] = useState('');
  const [date, setDate] = useState(defaultDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addInvestment({ 
      quantity: parseFloat(quantity), 
      usdtInvested: parseFloat(usdtInvested), 
      date,
      asset: 'BTC'
    });
    setQuantity('');
    setUsdtInvested('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">BTC Quantity</label>
          <input 
            type="number" 
            step="0.00000001"
            className="form-control" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            placeholder="e.g. 0.05"
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">USDT Invested</label>
          <input 
            type="number" 
            step="0.01"
            className="form-control" 
            value={usdtInvested} 
            onChange={(e) => setUsdtInvested(e.target.value)} 
            placeholder="e.g. 3000"
            required 
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Date</label>
        <input 
          type="date" 
          className="form-control" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Log Investment</button>
    </form>
  );
}

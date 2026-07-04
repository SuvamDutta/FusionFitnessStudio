'use client';
import { useState } from 'react';
import { addPiggyBankSaving } from '@/lib/actions';

export default function AddPiggyBankForm({ monthPrefix }) {
  const today = new Date();
  const currentMonthPrefix = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const defaultDate = (monthPrefix && monthPrefix !== currentMonthPrefix) ? `${monthPrefix}-01` : today.toISOString().split('T')[0];

  const [amount, setAmount] = useState('500'); // Default to 500 as requested
  const [date, setDate] = useState(defaultDate);
  const [description, setDescription] = useState('Daily Saving');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPiggyBankSaving({ amount: parseFloat(amount), date, description });
    setAmount('500');
    setDescription('Daily Saving');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Amount (₹)</label>
          <input 
            type="number" 
            className="form-control" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
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
      </div>
      <div className="form-group">
        <label className="form-label">Description (Optional)</label>
        <input 
          type="text" 
          className="form-control" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add to Piggy Bank</button>
    </form>
  );
}

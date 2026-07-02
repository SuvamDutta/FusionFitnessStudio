'use client';
import { useState } from 'react';
import { addPayment } from '@/lib/actions';

export default function AddPaymentForm({ members }) {
  const [memberId, setMemberId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [monthsCovered, setMonthsCovered] = useState(1);
  const [mode, setMode] = useState('CASH');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPayment({ memberId, amount: parseFloat(amount), date, monthsCovered: parseInt(monthsCovered), mode });
    setMemberId('');
    setAmount('');
    setMonthsCovered(1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Member</label>
        <select 
          className="form-control" 
          value={memberId} 
          onChange={(e) => setMemberId(e.target.value)} 
          required
        >
          <option value="" disabled>Select a member...</option>
          {members.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>
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
          <label className="form-label">Months Covered</label>
          <input 
            type="number" 
            min="1"
            className="form-control" 
            value={monthsCovered} 
            onChange={(e) => setMonthsCovered(e.target.value)} 
            required 
          />
        </div>
      </div>
      <div className="grid-2">
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
        <div className="form-group">
          <label className="form-label">Payment Mode</label>
          <select 
            className="form-control" 
            value={mode} 
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="CASH">Cash</option>
            <option value="ONLINE">Online</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Record Payment</button>
    </form>
  );
}

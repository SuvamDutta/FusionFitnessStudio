'use client';
import { useState } from 'react';
import { addPayment } from '@/lib/actions';

export default function AddPaymentForm({ members, monthPrefix }) {
  const today = new Date();
  const currentMonthPrefix = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const defaultDate = (monthPrefix && monthPrefix !== currentMonthPrefix) ? `${monthPrefix}-01` : today.toISOString().split('T')[0];

  const [memberId, setMemberId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(defaultDate);
  const [monthsCovered, setMonthsCovered] = useState(1);
  const [mode, setMode] = useState('CASH');
  const [paymentType, setPaymentType] = useState('FEE');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPayment({ memberId, amount: parseFloat(amount), date, monthsCovered: parseInt(monthsCovered), mode, paymentType });
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
          <select 
            className="form-control" 
            value={monthsCovered} 
            onChange={(e) => setMonthsCovered(e.target.value)} 
            required 
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Payment Type</label>
          <select 
            className="form-control" 
            value={paymentType} 
            onChange={(e) => {
              setPaymentType(e.target.value);
              if (e.target.value === 'ADMISSION') setMonthsCovered(1);
            }}
          >
            <option value="FEE">Monthly Fee</option>
            <option value="ADMISSION">New Admission</option>
          </select>
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

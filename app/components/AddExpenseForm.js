'use client';
import { useState } from 'react';
import { addExpense } from '@/lib/actions';

export default function AddExpenseForm() {
  const [category, setCategory] = useState('FIXED');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense({ category, amount: parseFloat(amount), date, description });
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Category</label>
          <select 
            className="form-control" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="FIXED">Fixed (Rent, EMI, etc)</option>
            <option value="SALARY">Salary</option>
            <option value="BILLS">Bills (Internet, EC)</option>
            <option value="MISCELLANEOUS">Miscellaneous</option>
          </select>
        </div>
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
        <label className="form-label">Description (Optional)</label>
        <input 
          type="text" 
          className="form-control" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Record Expense</button>
    </form>
  );
}

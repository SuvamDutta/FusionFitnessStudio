'use client';
import { useState } from 'react';
import { addSupplement } from '@/lib/actions';

export default function AddSupplementForm({ inventory, monthPrefix }) {
  const today = new Date();
  const currentMonthPrefix = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const defaultDate = (monthPrefix && monthPrefix !== currentMonthPrefix) ? `${monthPrefix}-01` : today.toISOString().split('T')[0];

  const [buyerName, setBuyerName] = useState('');
  const [inventoryId, setInventoryId] = useState('');
  const [quantitySold, setQuantitySold] = useState('1');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(defaultDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSupplement({ 
      buyerName, 
      inventoryId: parseInt(inventoryId), 
      quantitySold: parseInt(quantitySold),
      price: parseFloat(price), 
      date 
    });
    setBuyerName('');
    setInventoryId('');
    setQuantitySold('1');
    setPrice('');
  };

  if (inventory.length === 0) {
    return <p className="text-muted">Please add items to your inventory first before recording a sale.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Buyer Name</label>
        <input 
          type="text" 
          className="form-control" 
          value={buyerName} 
          onChange={(e) => setBuyerName(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Item / Supplement Name</label>
        <select 
          className="form-control" 
          value={inventoryId} 
          onChange={(e) => setInventoryId(e.target.value)} 
          required
        >
          <option value="" disabled>Select an item...</option>
          {inventory.map(item => (
            <option key={item.id} value={item.id} disabled={item.quantity <= 0}>
              {item.item_name} ({item.quantity} in stock)
            </option>
          ))}
        </select>
      </div>
      <div className="grid-3">
        <div className="form-group">
          <label className="form-label">Scoops/Qty Sold</label>
          <input 
            type="number" 
            min="1"
            className="form-control" 
            value={quantitySold} 
            onChange={(e) => setQuantitySold(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Total Sell Price (₹)</label>
          <input 
            type="number" 
            className="form-control" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
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
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Record Sale</button>
    </form>
  );
}

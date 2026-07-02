'use client';
import { useState } from 'react';
import { addInventory } from '@/lib/actions';

export default function InventoryManagement() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addInventory({ itemName, quantity: parseInt(quantity), buyPrice: parseFloat(buyPrice) || 0 });
    setItemName('');
    setQuantity('');
    setBuyPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-3">
        <div className="form-group">
          <label className="form-label">Supplement Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
            placeholder="e.g. Whey Protein"
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Total Buy Price (₹)</label>
          <input 
            type="number"
            min="0"
            className="form-control" 
            value={buyPrice} 
            onChange={(e) => setBuyPrice(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Total Servings / Qty</label>
          <input 
            type="number"
            min="1"
            className="form-control" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add to Inventory</button>
    </form>
  );
}

'use client';
import { useState } from 'react';
import { addInventory } from '@/lib/actions';

export default function InventoryManagement() {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [servings, setServings] = useState('');
  const [buyPrice, setBuyPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalServings = parseFloat(quantity) * parseFloat(servings);
    await addInventory({ itemName, quantity: totalServings, buyPrice: parseFloat(buyPrice) || 0 });
    setItemName('');
    setQuantity('');
    setServings('');
    setBuyPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-2">
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
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
          <label className="form-label">Qty (e.g., Tubs/Boxes)</label>
          <input 
            type="number"
            min="0.1"
            step="0.1"
            className="form-control" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group" style={{ gridColumn: 'span 2' }}>
          <label className="form-label">Servings Per Unit (Scoops)</label>
          <input 
            type="number"
            min="1"
            step="0.5"
            className="form-control" 
            value={servings} 
            onChange={(e) => setServings(e.target.value)} 
            placeholder="e.g. 60"
            required 
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-1" style={{ width: '100%' }}>Add to Inventory</button>
    </form>
  );
}

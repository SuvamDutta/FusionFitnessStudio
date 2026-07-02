'use client';
import { deleteSupplementSale } from '@/lib/actions';
import { Trash2 } from 'lucide-react';

export default function DeleteSaleButton({ id }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this sale and restore stock?')) {
      await deleteSupplementSale(id);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0.25rem' }}
      title="Delete Sale"
    >
      <Trash2 size={18} />
    </button>
  );
}

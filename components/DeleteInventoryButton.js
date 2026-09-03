'use client';

import { Trash2 } from 'lucide-react';
import { deleteInventoryItem } from '@/lib/actions';

export default function DeleteInventoryButton({ id }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product from current stock?')) {
      await deleteInventoryItem(id);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--danger)',
        cursor: 'pointer',
        padding: '0.25rem'
      }}
      title="Delete Product"
    >
      <Trash2 size={16} />
    </button>
  );
}

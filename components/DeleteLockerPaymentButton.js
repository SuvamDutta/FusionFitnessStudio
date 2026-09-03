'use client';

import { Trash2 } from 'lucide-react';
import { deleteLockerPayment } from '@/lib/actions';

export default function DeleteLockerPaymentButton({ id }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this payment?')) {
      await deleteLockerPayment(id);
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
      title="Delete Payment"
    >
      <Trash2 size={16} />
    </button>
  );
}

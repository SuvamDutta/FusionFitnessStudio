'use client';
import { deletePayment } from '@/lib/actions';
import { Trash2 } from 'lucide-react';

export default function DeletePaymentButton({ id }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this payment?')) {
      await deletePayment(id);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0.25rem' }}
      title="Delete Payment"
    >
      <Trash2 size={18} />
    </button>
  );
}

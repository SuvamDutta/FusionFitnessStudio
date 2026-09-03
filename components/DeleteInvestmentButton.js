'use client';

import { Trash2 } from 'lucide-react';
import { deleteInvestment } from '@/lib/actions';

export default function DeleteInvestmentButton({ id }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this investment record?')) {
      await deleteInvestment(id);
    }
  };

  return (
    <button onClick={handleDelete} className="btn" style={{ padding: '0.25rem', color: 'var(--danger)', backgroundColor: 'transparent' }} title="Delete Investment">
      <Trash2 size={16} />
    </button>
  );
}

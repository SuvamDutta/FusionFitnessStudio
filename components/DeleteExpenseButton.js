'use client';

import { Trash2 } from 'lucide-react';
import { deleteExpense } from '@/lib/actions';

export default function DeleteExpenseButton({ id }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
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
      title="Delete Expense"
    >
      <Trash2 size={16} />
    </button>
  );
}

'use client';

import { Trash2 } from 'lucide-react';
import { deletePiggyBankSaving } from '@/lib/actions';

export default function DeletePiggyBankButton({ id }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this saving?')) {
      await deletePiggyBankSaving(id);
    }
  };

  return (
    <button onClick={handleDelete} className="btn" style={{ padding: '0.25rem', color: 'var(--danger)', backgroundColor: 'transparent' }} title="Delete Saving">
      <Trash2 size={16} />
    </button>
  );
}

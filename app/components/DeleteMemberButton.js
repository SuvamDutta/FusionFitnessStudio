'use client';

import { Trash2 } from 'lucide-react';
import { deleteMember } from '@/lib/actions';

export default function DeleteMemberButton({ id }) {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this member? All of their payments will also be deleted. This cannot be undone.')) {
      await deleteMember(id);
    }
  };

  return (
    <button onClick={handleDelete} className="btn" style={{ padding: '0.25rem', color: 'var(--danger)', backgroundColor: 'transparent' }} title="Delete Member">
      <Trash2 size={16} />
    </button>
  );
}

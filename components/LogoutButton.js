'use client';

import { logout } from '@/lib/actions';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <button 
      onClick={() => logout()} 
      className="nav-link" 
      style={{ 
        width: '100%', 
        border: 'none', 
        background: 'none', 
        cursor: 'pointer', 
        textAlign: 'left', 
        color: 'var(--danger)',
        fontFamily: 'inherit',
        fontSize: '1rem',
        marginTop: '2rem'
      }}
    >
      <LogOut size={20} />
      Secure Logout
    </button>
  );
}

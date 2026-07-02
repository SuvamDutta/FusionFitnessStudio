'use client';

import { setGlobalMonth } from '@/lib/actions';
import { useTransition } from 'react';

export default function MonthSelector({ initialYear, initialMonth }) {
  const [isPending, startTransition] = useTransition();

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    startTransition(() => {
      setGlobalMonth(initialYear, newMonth);
    });
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    startTransition(() => {
      setGlobalMonth(newYear, initialMonth);
    });
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Generate last 2 years, current year, and next 2 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - 2 + i);

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <select 
        value={initialMonth} 
        onChange={handleMonthChange}
        disabled={isPending}
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: 'var(--text-main)',
          border: '1px solid var(--border-color)',
          cursor: isPending ? 'wait' : 'pointer'
        }}
      >
        {months.map((m, i) => (
          <option key={m} value={i + 1} style={{ color: '#000' }}>{m}</option>
        ))}
      </select>

      <select 
        value={initialYear} 
        onChange={handleYearChange}
        disabled={isPending}
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          color: 'var(--text-main)',
          border: '1px solid var(--border-color)',
          cursor: isPending ? 'wait' : 'pointer'
        }}
      >
        {years.map(y => (
          <option key={y} value={y} style={{ color: '#000' }}>{y}</option>
        ))}
      </select>
    </div>
  );
}

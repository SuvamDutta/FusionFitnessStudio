'use client';

import { useState } from 'react';
import LockerModal from './LockerModal';

export default function LockerGrid({ lockers }) {
  const [selectedLocker, setSelectedLocker] = useState(null);

  // Ensure lockers are sorted
  const sortedLockers = [...lockers].sort((a, b) => a.locker_number - b.locker_number);

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {sortedLockers.map((locker) => {
          const isOccupied = locker.status === 'OCCUPIED';
          return (
            <div 
              key={locker.locker_number}
              onClick={() => setSelectedLocker(locker)}
              style={{
                border: `2px solid ${isOccupied ? 'var(--danger)' : 'var(--success)'}`,
                borderRadius: '8px',
                padding: '1rem 0.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: isOccupied ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-color)' }}>
                {locker.locker_number}
              </span>
              <span style={{ 
                fontSize: '0.7rem', 
                color: isOccupied ? 'var(--danger)' : 'var(--success)',
                marginTop: '0.25rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%'
              }}>
                {isOccupied ? (locker.assigned_to.split(' ')[0]) : 'AVAILABLE'}
              </span>
            </div>
          );
        })}
      </div>
      
      <LockerModal 
        isOpen={!!selectedLocker} 
        onClose={() => setSelectedLocker(null)} 
        locker={selectedLocker} 
      />
    </>
  );
}

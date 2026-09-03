'use client';

import { useState, useEffect } from 'react';
import { assignLocker, unassignLocker, addLockerPayment } from '@/lib/actions';

export default function LockerModal({ isOpen, onClose, locker }) {
  const [assignedTo, setAssignedTo] = useState('');
  const [monthlyFee, setMonthlyFee] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  useEffect(() => {
    if (locker) {
      setAssignedTo(locker.assigned_to || '');
      setMonthlyFee(locker.monthly_fee || '');
      setPaymentAmount('');
      setPaymentDate(new Date().toISOString().split('T')[0]);
    }
  }, [locker]);

  if (!isOpen || !locker) return null;

  const handleAssign = async (e) => {
    e.preventDefault();
    await assignLocker({
      lockerNumber: locker.locker_number,
      assignedTo,
      monthlyFee: parseFloat(monthlyFee) || 0
    });
    onClose();
  };

  const handleUnassign = async () => {
    if (confirm(`Are you sure you want to unassign locker ${locker.locker_number}?`)) {
      await unassignLocker(locker.locker_number);
      onClose();
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    await addLockerPayment({
      lockerNumber: locker.locker_number,
      amount: parseFloat(paymentAmount) || 0,
      date: paymentDate
    });
    setPaymentAmount('');
    alert('Payment recorded!');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ 
        width: '90%', 
        maxWidth: '500px', 
        maxHeight: '90vh', 
        overflowY: 'auto', 
        backgroundColor: 'var(--bg-panel)', 
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        animation: 'fadeIn 0.3s ease-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="mb-0">Locker #{locker.locker_number}</h2>
          <button onClick={onClose} className="btn" style={{ background: 'none', border: 'none', color: 'var(--text-color)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 className="mb-1" style={{ fontSize: '1.1rem', color: 'var(--primary-color)' }}>Assignment Details</h3>
          <form onSubmit={handleAssign}>
            <div className="form-group">
              <label className="form-label">Assigned To (Name)</label>
              <input 
                type="text" 
                className="form-control" 
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Enter member name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Monthly Fee (₹)</label>
              <input 
                type="number"
                min="0"
                className="form-control"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(e.target.value)}
                placeholder="e.g. 500"
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                {locker.status === 'OCCUPIED' ? 'Update Assignment' : 'Assign Locker'}
              </button>
              {locker.status === 'OCCUPIED' && (
                <button type="button" className="btn btn-danger" onClick={handleUnassign}>
                  Unassign
                </button>
              )}
            </div>
          </form>
        </div>

        {locker.status === 'OCCUPIED' && (
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 className="mb-1" style={{ fontSize: '1.1rem', color: 'var(--success)' }}>Record Payment</h3>
            <form onSubmit={handlePayment}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Amount (₹)</label>
                  <input 
                    type="number"
                    min="1"
                    className="form-control"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input 
                    type="date"
                    className="form-control"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', backgroundColor: 'var(--success)', borderColor: 'var(--success)' }}>
                Add Payment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

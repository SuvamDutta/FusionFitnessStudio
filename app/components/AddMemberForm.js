'use client';
import { useState } from 'react';
import { addMember } from '@/lib/actions';

export default function AddMemberForm() {
  const [name, setName] = useState('');
  const [joinDate, setJoinDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMember({ name, joinDate });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input 
          type="text" 
          className="form-control" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Join Date</label>
        <input 
          type="date" 
          className="form-control" 
          value={joinDate} 
          onChange={(e) => setJoinDate(e.target.value)} 
          required 
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Member</button>
    </form>
  );
}

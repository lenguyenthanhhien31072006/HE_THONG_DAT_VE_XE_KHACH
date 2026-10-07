'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import homeStyles from '../Home/Home.module.css'; // Dùng lại CSS gốc của HeroBanner

export default function CompactSearch({
  initialFrom,
  initialTo,
  initialDate
}: {
  initialFrom: string;
  initialTo: string;
  initialDate: string;
}) {
  const router = useRouter();
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(initialDate);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (from) query.append('from', from.trim());
    if (to) query.append('to', to.trim());
    if (date) query.append('date', date);
    
    router.push(`/tim-chuyen?${query.toString()}`);
  };

  return (
    <div style={{ width: '100%', marginBottom: '2rem' }}>
      <form 
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          gap: '16px',
          width: '100%',
          alignItems: 'center',
          backgroundColor: 'var(--surface)',
          padding: '12px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}
      >
        {/* Khối nhập liệu */}
        <div className={homeStyles.searchInputs} style={{ flex: 1, margin: 0, boxShadow: 'none' }}>
          <div className={homeStyles.inputGroup}>
            <span className={homeStyles.inputIcon}>📍</span>
            <div className={homeStyles.inputField}>
              <label>Nơi xuất phát</label>
              <input 
                type="text" 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required 
              />
            </div>
          </div>

          <button type="button" className={homeStyles.inputDivider} onClick={handleSwap} aria-label="Đổi chiều">
            ⇄
          </button>

          <div className={homeStyles.inputGroup}>
            <span className={homeStyles.inputIcon}>🎯</span>
            <div className={homeStyles.inputField}>
              <label>Nơi đến</label>
              <input 
                type="text" 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className={homeStyles.inputGroup}>
            <span className={homeStyles.inputIcon}>📅</span>
            <div className={homeStyles.inputField}>
              <label>Ngày đi</label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required 
                suppressHydrationWarning
              />
            </div>
          </div>
        </div>

        {/* Nút tìm kiếm */}
        <button 
          type="submit" 
          className={homeStyles.searchBtn} 
          style={{ height: '56px', padding: '0 32px', margin: 0, flexShrink: 0 }}
        >
          Tìm kiếm
        </button>
      </form>
    </div>
  );
}
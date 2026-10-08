'use client';

import { useState } from 'react';
import styles from './Home.module.css';

export default function HeroBanner() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Tạm thời log ra console, sau này sẽ chuyển hướng sang trang tìm kiếm
    console.log('Tìm chuyến:', { from, to, date });
    alert(`Đang tìm chuyến xe từ ${from || '...'} đến ${to || '...'} vào ngày ${date || '...'}`);
  };

  return (
    <div className={styles.heroBanner}>
      <div className={styles.heroOverlay}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>HỆ THỐNG ĐẶT VÉ XE KHÁCH</h1>
            
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <div className={styles.searchInputs}>
                <div className={styles.inputGroup}>
                  <span className={styles.inputIcon}>📍</span>
                  <div className={styles.inputField}>
                    <label>Nơi xuất phát</label>
                    <input 
                      type="text" 
                      placeholder="Chọn điểm đi" 
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className={styles.inputDivider}>⇄</div>
                
                <div className={styles.inputGroup}>
                  <span className={styles.inputIcon}>🎯</span>
                  <div className={styles.inputField}>
                    <label>Nơi đến</label>
                    <input 
                      type="text" 
                      placeholder="Chọn điểm đến" 
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className={styles.inputGroup}>
                  <span className={styles.inputIcon}>📅</span>
                  <div className={styles.inputField}>
                    <label>Ngày đi</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className={styles.searchBtn}>Tìm chuyến</button>
            </form>
          </div>
        </div>
      </div>
      {/* Trust Badges (Thanh cam kết) */}
      <div className={styles.trustBar}>
        <div className={styles.trustBarInner}>
          <div className={styles.trustBadge}>
            <span className={styles.trustBadgeIcon}>✅</span>
            Chắc chắn có chỗ
          </div>
          <div className={styles.trustBadge}>
            <span className={styles.trustBadgeIcon}>🕐</span>
            Hỗ trợ 24/7
          </div>
          <div className={styles.trustBadge}>
            <span className={styles.trustBadgeIcon}>🎁</span>
            Nhiều ưu đãi
          </div>
          <div className={styles.trustBadge}>
            <span className={styles.trustBadgeIcon}>💳</span>
            Thanh toán đa dạng
          </div>
        </div>
      </div>
    </div>
  );
}
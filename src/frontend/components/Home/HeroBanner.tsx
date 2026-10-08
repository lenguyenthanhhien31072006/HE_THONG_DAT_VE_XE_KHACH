'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Home.module.css';

// Hàm hỗ trợ lấy chuỗi ngày YYYY-MM-DD
const getLocalDateString = (daysToAdd = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + daysToAdd);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function HeroBanner() {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  
  // Khởi tạo state ngay từ đầu (Lazy initialization)
  const [date, setDate] = useState(() => getLocalDateString(0));
  
  // Các biến không thay đổi trong suốt vòng đời component thì không cần dùng State
  const minDate = getLocalDateString(0);
  const maxDate = getLocalDateString(7);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gom các giá trị nhập vào thành tham số URL
    const query = new URLSearchParams();
    if (from) query.append('from', from.trim());
    if (to) query.append('to', to.trim());
    if (date) query.append('date', date);
    
    // Chuyển hướng sang trang kết quả
    router.push(`/tim-chuyen?${query.toString()}`);
  };

  return (
    <div className={styles.heroBanner}>
      <div className={styles.heroOverlay}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>VeXe - Cam kết hoàn tiền 150% nếu không có chỗ</h1>
            
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
                      required /* Bắt buộc nhập */
                    />
                  </div>
                </div>
                
                <button type="button" className={styles.inputDivider} onClick={handleSwap} aria-label="Đổi chiều">
                  ⇄
                </button>
                
                <div className={styles.inputGroup}>
                  <span className={styles.inputIcon}>🎯</span>
                  <div className={styles.inputField}>
                    <label>Nơi đến</label>
                    <input 
                      type="text" 
                      placeholder="Chọn điểm đến" 
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required /* Bắt buộc nhập */
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
                      min={minDate}
                      max={maxDate}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      suppressHydrationWarning 
                      /* suppressHydrationWarning giúp ẩn lỗi nếu ngày của Server Next.js khác ngày của máy tính người dùng */
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
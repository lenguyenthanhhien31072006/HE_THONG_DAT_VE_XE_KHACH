'use client';

import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        
        <div className={styles.leftSection}>
          <div className={styles.logoGroup}>
            <span className={styles.logoIcon}>🚌</span>
            <div className={styles.logoTextGroup}>
              <span className={styles.logoName}>VeXe</span>
              <span className={styles.logoSlogan}>Đặt vé xe khách online</span>
            </div>
          </div>
          <button className={styles.serviceBtn}>🚌 Xe khách</button>
        </div>

        <nav className={styles.centerSection}>
          <a href="#" className={styles.navLink}>Đơn hàng của tôi</a>
          <a href="#" className={styles.navLink}>Mở bán vé trên VeXe</a>
          <a href="#" className={styles.navLink}>Trở thành đối tác</a>
        </nav> 

        <div className={styles.rightSection}>
          <div className={styles.hotlineBox}>
            📞 Hotline 24/7
          </div>
          <button className={styles.loginBtn}>
            👤 Đăng nhập
          </button>
          
          {/* Nút Mobile Menu nằm ở góc phải */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>  
      </div>    

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <button className={`${styles.navTab} ${styles.navTabActive}`}>
            🚌 Xe khách
          </button>
          <button className={styles.navTab}>👤 Đăng nhập</button>
        </div>
      )}

    </header>
  );
}
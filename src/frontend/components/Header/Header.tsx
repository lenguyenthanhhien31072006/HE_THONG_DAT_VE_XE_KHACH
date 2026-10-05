'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      {/* Main Header */}
      <div className={styles.mainHeader}>
        <div className={styles.mainHeaderInner}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🚌</span>
            <span className={styles.logoText}>
              <span>VeXe</span>
              <span>Đặt vé xe khách online</span>
            </span>
          </Link>

          <nav className={styles.navTabs}>
            <button className={`${styles.navTab} ${styles.navTabActive}`}>
              <span className={styles.navTabIcon}>🚌</span>
              Xe khách
            </button>
          </nav>
          <div className={styles.headerRight}>
            <div className={styles.actionLinks}>
               <span className={styles.actionLink}>📋 Đơn hàng của tôi</span>
               <span className={styles.actionLink}>🏢 Mở bán vé trên VeXe</span>
               <span className={styles.actionLink}>🤝 Trở thành đối tác</span>
               <span className={`${styles.actionLink} ${styles.hotline}`}>
                  📞 Hotline 24/7
               </span>
            </div>
          </div>  
          <div className={styles.headerRight}>
            <button className={styles.loginBtn}>
              👤 Đăng nhập
            </button>
          </div>

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

      {/* Trust Badges */}
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
    </header>
  );
}

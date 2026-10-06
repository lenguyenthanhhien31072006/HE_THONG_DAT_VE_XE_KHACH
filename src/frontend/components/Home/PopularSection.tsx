'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { popularRoutes, busStationCards, formatPrice } from '../../lib/mock-data';
import styles from './Home.module.css';

export default function PopularSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.popularSection}>
      <div className="container">
        {/* Tuyến đường phổ biến */}
        <div className={styles.sectionBlock}>
          <h2 className="section-title">Tuyến đường phổ biến</h2>
          
          <div className={styles.sliderContainer}>
            <button className={`${styles.sliderBtn} ${styles.sliderBtnLeft}`} onClick={slideLeft}>
              ❮
            </button>
            
            <div className={styles.routesGrid} ref={sliderRef}>
              {popularRoutes.map((route) => (
                <Link href={`/tim-chuyen?from=${encodeURIComponent(route.from)}&to=${encodeURIComponent(route.to)}`} key={route.id} className={styles.routeCard}>
                  <div className={styles.routeImage}>
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1A5BB8, #2474E5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem' }}>
                      🚌
                    </div>
                  </div>
                  <div className={styles.routeInfo}>
                    <h3 className={styles.routeName}>{route.from} - {route.to}</h3>
                    <div className={styles.routePricing}>
                      <span className={styles.price}>{formatPrice(route.price)}</span>
                      <span className={styles.originalPrice}>{formatPrice(route.originalPrice)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <button className={`${styles.sliderBtn} ${styles.sliderBtnRight}`} onClick={slideRight}>
              ❯
            </button>
          </div>
        </div>

        {/* Bến xe nổi bật*/}
        <div className={styles.sectionBlock}>
          <h2 className="section-title">Bến xe nổi bật</h2>
          <div className={styles.stationsGrid}>
            {busStationCards.map((station) => (
              <Link 
                href={`/tim-chuyen?from=${encodeURIComponent(station.city)}&station=${encodeURIComponent(station.name)}`}
                key={station.id} 
                className={styles.stationCard}
                style={{ textDecoration: 'none' }}
              >
                 <div className={styles.stationImage}>
                   <div style={{ width: '100%', height: '100%', background: '#E8F0FE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                    🏢
                   </div>
                 </div>
                 <div className={styles.stationInfo}>
                    <h3 className={styles.stationName}>{station.name}</h3>
                    <p className={styles.stationCity}>{station.city}</p>
                 </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
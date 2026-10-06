import { featuredDeals } from '../../lib/mock-data';
import styles from './Home.module.css';

export default function AdsSection() {
  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div className={styles.sectionBlock}>
        <h2 className="section-title">Ưu đãi nổi bật</h2>
        <div className={styles.stationsGrid}>
          {featuredDeals.map((deal) => (
            <div key={deal.id} className={styles.stationCard}>
              <div className={styles.stationImage}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  backgroundColor: deal.bgColor, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '4rem' 
                }}>
                  {deal.image}
                </div>
              </div>
              <div className={styles.stationInfo}>
                <h3 className={styles.stationName}>{deal.title}</h3>
                <p className={styles.stationCity} style={{ marginTop: '4px' }}>
                  {deal.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
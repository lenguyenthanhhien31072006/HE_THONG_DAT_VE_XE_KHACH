import { Trip, formatPrice } from '../../lib/mock-data';
import styles from './Search.module.css';

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <div className={styles.tripCard}>
      <div className={styles.tripTop}>
        <div className={styles.timeInfo}>
          <div className={styles.timeCol}>
            <div className={styles.time}>{trip.departureTime}</div>
            <div className={styles.station}>{trip.fromStation.name}</div>
          </div>
          
          <div className={styles.duration}>
            <span>---</span> {trip.duration} <span>---</span>
          </div>
          
          <div className={styles.timeCol}>
            <div className={styles.time}>{trip.arrivalTime}</div>
            <div className={styles.station}>{trip.toStation.name}</div>
          </div>
        </div>

        <div className={styles.companyInfo}>
          <div className={styles.companyName}>
            <span>{trip.company.logo}</span> {trip.company.name}
          </div>
          <div className={styles.vehicleType}>{trip.vehicleLabel}</div>
        </div>
      </div>

      <div className={styles.tripBottom}>
        <div className={styles.seatInfo}>
          {trip.availableSeats} chỗ trống
        </div>
        <div className={styles.priceInfo}>
          {trip.originalPrice && (
            <span className={styles.originalPrice}>{formatPrice(trip.originalPrice)}</span>
          )}
          <span className={styles.price}>{formatPrice(trip.price)}</span>
          <br />
          <button className={styles.selectBtn}>Chọn chuyến</button>
        </div>
      </div>
    </div>
  );
}
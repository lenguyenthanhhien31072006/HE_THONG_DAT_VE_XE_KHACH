import Link from 'next/link';
import SeatMap from '../../../components/Booking/SeatMap';
import styles from '../../../components/Booking/Booking.module.css';

// Mock dữ liệu tạm cho trang chi tiết (Sau này sẽ fetch từ database dựa vào id)
const getTripDetails = (id: string) => {
  return {
    id,
    from: 'Hà Nội',
    to: 'Sapa',
    departureTime: '22:00',
    arrivalTime: '04:00',
    date: '08/10/2026',
    price: 350000,
    companyName: 'Sao Việt',
    vehicleType: 'Giường nằm 40 chỗ',
  };
};

export default async function TripDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  const tripId = resolvedParams.id;
  const trip = getTripDetails(tripId);

  return (
    <div className={styles.bookingPage}>
      <div className="container">
        
        {/* Nút quay lại */}
        <Link href="/tim-chuyen" className={styles.backLink}>
          ← Quay lại kết quả tìm kiếm
        </Link>

        {/* Header thông tin chuyến xe */}
        <div className={styles.headerCard}>
          <div className={styles.tripInfo}>
            <h1>{trip.from} ➔ {trip.to}</h1>
            <div className={styles.tripDetails}>
              <span>📅 Ngày đi: <strong>{trip.date}</strong></span>
              <span>⏰ Thời gian: <strong>{trip.departureTime} - {trip.arrivalTime}</strong></span>
              <span>🚌 Loại xe: <strong>{trip.vehicleType}</strong></span>
            </div>
          </div>
          <div className={styles.companyInfo}>
            <div className={styles.companyName}>{trip.companyName}</div>
            <div className={styles.price}>
              {trip.price.toLocaleString('vi-VN')}đ
            </div>
          </div>
        </div>

        {/* Gọi component Sơ đồ ghế */}
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Chọn vị trí ghế</h2>
        <SeatMap ticketPrice={trip.price} />
        
      </div>
    </div>
  );
}
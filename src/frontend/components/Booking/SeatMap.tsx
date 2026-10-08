'use client';

import { useState } from 'react';
import styles from './SeatMap.module.css';

interface SeatMapProps {
  ticketPrice?: number;
  vehicleType?: string;
  totalSeats?: number;
  bookedSeats?: string[]; // Thêm mảng chứa danh sách ID các ghế đã có người mua
}

export default function SeatMap({ 
  ticketPrice = 350000, 
  vehicleType = 'Giường nằm',
  totalSeats = 40,
  bookedSeats = [] // Nhận mảng ghế đã đặt từ mock-data/API
}: SeatMapProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const isSleeper = vehicleType.toLowerCase().includes('giường nằm');
  
  const columns = isSleeper ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
  const floorsCount = isSleeper ? 2 : 1;
  const rowsPerFloor = Math.ceil(totalSeats / (columns.length * floorsCount));

  const generateSeats = (floorPrefix: string) => {
    const seats = [];
    for (let i = 1; i <= rowsPerFloor; i++) {
      for (const col of columns) {
        if (seats.length >= totalSeats / floorsCount) break;
        seats.push(`${col}${floorPrefix}${i}`);
      }
    }
    return seats;
  };

  const lowerFloor = generateSeats(isSleeper ? '0' : '');
  const upperFloor = isSleeper ? generateSeats('1') : [];

  // Logic click chọn ghế
  const toggleSeat = (seatId: string) => {
    // Sử dụng trực tiếp mảng bookedSeats từ props
    if (bookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      if (selectedSeats.length >= 6) {
        alert('Bạn chỉ được đặt tối đa 6 ghế trong một giao dịch.');
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatClass = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return `${styles.seat} ${styles.seatBooked}`;
    if (selectedSeats.includes(seatId)) return `${styles.seat} ${styles.seatSelected}`;
    return `${styles.seat} ${styles.seatAvailable}`;
  };

  const renderFloor = (name: string, seats: string[]) => (
    <div className={styles.floor}>
      <h3 className={styles.floorTitle}>{name}</h3>
      <div 
        className={styles.grid} 
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      >
        {seats.map(seat => (
          <div key={seat} className={getSeatClass(seat)} onClick={() => toggleSeat(seat)}>
            {seat}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.seatMapContainer}>
      <div className={styles.legend}>
        <div className={styles.legendItem}><div className={`${styles.seatBox} ${styles.seatAvailable}`}></div><span>Trống</span></div>
        <div className={styles.legendItem}><div className={`${styles.seatBox} ${styles.seatSelected}`}></div><span>Đang chọn</span></div>
        <div className={styles.legendItem}><div className={`${styles.seatBox} ${styles.seatBooked}`}></div><span>Đã bán</span></div>
      </div>

      <div className={styles.floorsWrapper}>
        {renderFloor(isSleeper ? 'Tầng dưới' : 'Sơ đồ ghế', lowerFloor)}
        {isSleeper && renderFloor('Tầng trên', upperFloor)}
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryInfo}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Ghế đã chọn: <strong style={{ color: 'var(--text-primary)' }}>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn'}</strong>
          </span>
          <span className={styles.totalPrice}>Tổng: {(selectedSeats.length * ticketPrice).toLocaleString('vi-VN')}đ</span>
        </div>
        <button className={styles.continueBtn} disabled={selectedSeats.length === 0}>Tiếp tục</button>
      </div>
    </div>
  );
}
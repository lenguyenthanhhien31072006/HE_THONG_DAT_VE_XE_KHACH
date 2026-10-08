'use client';

import { useState } from 'react';
import TripCard from './TripCard';
import styles from './Search.module.css';
import { Trip } from '../../lib/mock-data';

// Hàm phụ trợ đổi chuỗi "HH:MM" thành số phút để dễ so sánh
const timeToMinutes = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export default function SearchResults({ initialTrips }: { initialTrips: Trip[] }) {
  // State quản lý Bộ lọc
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  
  // State quản lý Sắp xếp
  const [sortOption, setSortOption] = useState<string>('default');

  const availableCompanies = Array.from(
    new Map(initialTrips.map(trip => [trip.company.id, trip.company])).values()
  );

  const toggleVehicle = (type: string) => {
    setSelectedVehicles(prev => 
      prev.includes(type) ? prev.filter(v => v !== type) : [...prev, type]
    );
  };

  const toggleCompany = (id: string) => {
    setSelectedCompanies(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  // Bước 1: Lọc danh sách (Filter)
  const filteredTrips = initialTrips.filter(trip => {
    const matchVehicle = selectedVehicles.length === 0 || selectedVehicles.includes(trip.vehicleType);
    const matchCompany = selectedCompanies.length === 0 || selectedCompanies.includes(trip.companyId);
    return matchVehicle && matchCompany;
  });

  // Bước 2: Sắp xếp danh sách đã lọc (Sort)
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortOption) {
      case 'time-asc':
        return timeToMinutes(a.departureTime) - timeToMinutes(b.departureTime);
      case 'time-desc':
        return timeToMinutes(b.departureTime) - timeToMinutes(a.departureTime);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'seats-desc':
        return b.availableSeats - a.availableSeats;
      case 'seats-asc':
        return a.availableSeats - b.availableSeats;
      default:
        return 0; // Giữ nguyên thứ tự mặc định
    }
  });

  // Hàm xóa bộ lọc
  const clearFilters = () => {
    setSelectedVehicles([]);
    setSelectedCompanies([]);
  };

  return (
    <div className={styles.searchLayout}>
      {/* Cột trái: Bao gồm Khối Sắp xếp và Khối Lọc */}
      <aside className={styles.sidebarWrapper}>
        
        {/* KHỐI 1: SẮP XẾP */}
        <div className={styles.sidebarBlock}>
          <h2 className={styles.sidebarTitle}>Sắp xếp</h2>
          <div className={styles.filterList}>
            <label className={styles.radioLabel}>
              <input type="radio" name="sort" value="default" checked={sortOption === 'default'} onChange={(e) => setSortOption(e.target.value)} />
              Mặc định
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="sort" value="time-asc" checked={sortOption === 'time-asc'} onChange={(e) => setSortOption(e.target.value)} />
              Giờ đi sớm nhất
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="sort" value="time-desc" checked={sortOption === 'time-desc'} onChange={(e) => setSortOption(e.target.value)} />
              Giờ đi muộn nhất
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="sort" value="price-asc" checked={sortOption === 'price-asc'} onChange={(e) => setSortOption(e.target.value)} />
              Giá tăng dần
            </label>
            <label className={styles.radioLabel}>
              <input type="radio" name="sort" value="price-desc" checked={sortOption === 'price-desc'} onChange={(e) => setSortOption(e.target.value)} />
              Giá giảm dần
            </label>
          </div>
        </div>

        {/* KHỐI 2: LỌC */}
        <div className={styles.sidebarBlock}>
          <div className={styles.filterHeader}>
            <h2 className={styles.sidebarTitle}>Lọc</h2>
            {(selectedVehicles.length > 0 || selectedCompanies.length > 0) && (
              <button className={styles.clearFilterBtn} onClick={clearFilters}>Xóa lọc</button>
            )}
          </div>

          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Loại xe</h3>
          <div className={styles.filterList}>
            <label className={styles.filterLabel}>
              <input type="checkbox" onChange={() => toggleVehicle('sleeper')} />
              Giường nằm
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" onChange={() => toggleVehicle('seat')} />
              Ghế ngồi
            </label>
            <label className={styles.filterLabel}>
              <input type="checkbox" onChange={() => toggleVehicle('limousine')} />
              Limousine
            </label>
          </div>
        </div>

        {availableCompanies.length > 0 && (
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Hãng xe</h3>
            <div className={styles.filterList}>
              {availableCompanies.map(company => (
                <label key={company.id} className={styles.filterLabel}>
                  <input type="checkbox" onChange={() => toggleCompany(company.id)} />
                  {company.name}
                </label>
              ))}
            </div>
          </div>
        )}
        </div>
      </aside>

      {/* Cột phải: Danh sách kết quả */}
      <div className={styles.mainContent}>

        {/* Danh sách thẻ (Dùng mảng sortedTrips) */}
        {sortedTrips.length > 0 ? (
          sortedTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--surface)', borderRadius: '8px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Không có kết quả phù hợp</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Vui lòng bỏ bớt các tiêu chí lọc để xem thêm chuyến xe.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
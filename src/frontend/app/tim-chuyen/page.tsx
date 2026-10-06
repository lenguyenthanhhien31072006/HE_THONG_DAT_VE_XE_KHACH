import { generateMockTrips, locations } from '../../lib/mock-data';
import TripCard from '../../components/Search/TripCard';
import SearchResults from '../../components/Search/SearchResults';
import styles from '../../components/Search/Search.module.css'; 

// Nâng cấp: Hàm trả về cả thông tin Tỉnh/Thành phố VÀ Bến xe (nếu có)
const parseLocationQuery = (query: string | undefined) => {
  if (!query) return { location: null, station: null };
  
  const normalizedQuery = query.toLowerCase().trim();
  let searchName = normalizedQuery;
  
  // 1. Xử lý viết tắt tỉnh thành
  const hcmAliases = ['sài gòn', 'hcm', 'tphcm', 'tp hcm', 'tp.hcm', 'hồ chí minh'];
  const hanoiAliases = ['hn', 'ha noi'];
  
  if (hcmAliases.includes(normalizedQuery)) searchName = 'tp. hồ chí minh';
  if (hanoiAliases.includes(normalizedQuery)) searchName = 'hà nội';
  
  // 2. Tìm theo tên tỉnh thành
  const loc = locations.find(l => 
    l.id === searchName || 
    l.name.toLowerCase() === searchName ||
    l.name.toLowerCase().includes(searchName)
  );
  
  if (loc) return { location: loc, station: null };
  
  // 3. Thông minh: Nếu không tìm thấy tỉnh thành, quét qua tất cả các Bến xe
  for (const location of locations) {
    const matchedStation = location.stations.find(s => 
      s.name.toLowerCase() === searchName || 
      s.name.toLowerCase().includes(searchName)
    );
    if (matchedStation) {
      // Trả về cả Tỉnh thành chứa bến xe đó và đích danh bến xe
      return { location, station: matchedStation };
    }
  }
  
  return { location: null, station: null };
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await searchParams;
  const fromQuery = params.from;
  const toQuery = params.to;
  const dateQuery = params.date || '2026-10-06';
  const urlStationQuery = params.station; // Tham số từ thẻ Bến xe nổi bật

  // Kiểm tra nhập liệu
  if (!fromQuery || !toQuery) {
    return (
      <div className={styles.searchPage}>
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚌</div>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Chưa đủ thông tin tìm kiếm</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Vui lòng nhập đầy đủ &quot;Nơi xuất phát&quot; và &quot;Nơi đến&quot; để tìm chuyến xe.</p>
        </div>
      </div>
    );
  }

  // Phân tích thông minh từ khóa
  const fromParsed = parseLocationQuery(fromQuery);
  const toParsed = parseLocationQuery(toQuery);

  if (!fromParsed.location || !toParsed.location) {
    return (
      <div className={styles.searchPage}>
        <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📍</div>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Không tìm thấy tuyến đường</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Hệ thống chưa có dữ liệu tuyến đường từ &quot;{fromQuery}&quot; đến &quot;{toQuery}&quot;.</p>
        </div>
      </div>
    );
  }

  // Sinh danh sách chuyến xe theo Tỉnh/Thành phố
  let trips = generateMockTrips(fromParsed.location.id, toParsed.location.id, dateQuery);

  // Lọc theo bến xe xuất phát (nếu người dùng gõ tên bến xe hoặc click từ trang chủ)
  const filterFromStation = urlStationQuery || fromParsed.station?.name;
  if (filterFromStation) {
    trips = trips.filter(trip => 
      trip.fromStation.name.toLowerCase() === filterFromStation.toLowerCase()
    );
  }

  // Lọc theo bến xe đích (nếu người dùng gõ thẳng tên bến xe vào ô Nơi đến)
  if (toParsed.station) {
    trips = trips.filter(trip => 
      trip.toStation.name.toLowerCase() === toParsed.station!.name.toLowerCase()
    );
  }

  // Tạo tiêu đề trang động
  let pageTitle = `Xe khách đi ${toParsed.location.name} từ ${fromParsed.location.name}`;
  if (filterFromStation) {
    pageTitle = `Các chuyến xe xuất phát từ ${filterFromStation}`;
  } else if (toParsed.station) {
    pageTitle = `Các chuyến xe đến ${toParsed.station.name}`;
  }

  return (
    <div className={styles.searchPage}>
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: '1.5rem' }}>{pageTitle}</h1>
        
        <SearchResults initialTrips={trips} />
      </div>
    </div>
  );
}
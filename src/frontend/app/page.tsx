import AdsSection from '@/components/Home/AdsSection';
import HeroBanner from '../components/Home/HeroBanner';
import PopularSection from '../components/Home/PopularSection';

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <PopularSection />
      <AdsSection />
      {/* Các sections khác sẽ được thêm vào sau (Platform Features, Media Mentions...) */}
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
        <p>Các phần Ưu đãi và Đối tác sẽ được tiếp tục phát triển ở các bước sau.</p>
      </div>
    </main>
  );
}
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* Popular Links */}
      <div className={styles.popularLinks}>
        <div className={styles.popularLinksGrid}>
          <div className={styles.popularLinksCol}>
            <h4>Tuyến đường phổ biến</h4>
            <Link href="#">Xe đi Đà Lạt từ Sài Gòn</Link>
            <Link href="#">Xe đi Vũng Tàu từ Sài Gòn</Link>
            <Link href="#">Xe đi Nha Trang từ Sài Gòn</Link>
            <Link href="#">Xe đi Sapa từ Hà Nội</Link>
          </div>
          <div className={styles.popularLinksCol}>
            <h4>Xe limousine</h4>
            <Link href="#">Xe limousine đi Đà Lạt</Link>
            <Link href="#">Xe limousine đi Vũng Tàu</Link>
            <Link href="#">Xe limousine đi Nha Trang</Link>
            <Link href="#">Xe limousine đi Hải Phòng</Link>
          </div>
          <div className={styles.popularLinksCol}>
            <h4>Tin tức</h4>
            <Link href="#">Tin tức du lịch</Link>
            <Link href="#">Cẩm nang du lịch</Link>
            <Link href="#">Kinh nghiệm đi xe khách</Link>
            <Link href="#">Khuyến mãi VeXe</Link>
          </div>
          <div className={styles.popularLinksCol}>
            <h4>Bến xe</h4>
            <Link href="#">Bến xe Miền Đông</Link>
            <Link href="#">Bến xe Mỹ Đình</Link>
            <Link href="#">Bến xe Nước Ngầm</Link>
            <Link href="#">Bến xe Miền Tây</Link>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className={styles.footerMain}>
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.footerLogo}>
            <span className={styles.footerLogoIcon}>🚌</span>
            <span>VeXeOnline</span>
          </Link>
          <p>Hệ thống đặt vé xe khách trực tuyến hàng đầu. Hàng ngàn tuyến đường, hàng trăm nhà xe chất lượng cao.</p>
          <div className={styles.socialLinks}>
            <Link href="#" className={styles.socialLink}>FB</Link>
            <Link href="#" className={styles.socialLink}>TK</Link>
            <Link href="#" className={styles.socialLink}>YT</Link>
          </div>
          <div className={styles.paymentPartners}>
            <span className={styles.paymentBadge}>MoMo</span>
            <span className={styles.paymentBadge}>ZaloPay</span>
            <span className={styles.paymentBadge}>VNPay</span>
            <span className={styles.paymentBadge}>Visa/Master</span>
          </div>
        </div>

        <div className={styles.footerCol}>
          <h4>Về chúng tôi</h4>
          <Link href="#">Giới thiệu VeXe</Link>
          <Link href="#">Tuyển dụng</Link>
          <Link href="#">Tin tức</Link>
          <Link href="#">Liên hệ</Link>
        </div>

        <div className={styles.footerCol}>
          <h4>Hỗ trợ</h4>
          <Link href="#">Hướng dẫn thanh toán</Link>
          <Link href="#">Quy chế ứng dụng</Link>
          <Link href="#">Chính sách bảo mật</Link>
          <Link href="#">Câu hỏi thường gặp (FAQ)</Link>
        </div>

        <div className={styles.footerCol}>
          <h4>Trở thành đối tác</h4>
          <Link href="#">Phần mềm đại lý</Link>
          <Link href="#">Phần mềm nhà xe</Link>
          <Link href="#">Đăng ký mở bán vé</Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <p>© 2026 Bản quyền thuộc về VeXe. Hệ thống đặt vé xe khách online hàng đầu Việt Nam.</p>
      </div>
    </footer>
  );
}
-- Route/trip module. NhaXe and Xe are minimal references until their owning modules land.
CREATE TABLE IF NOT EXISTS tinh_thanh (
  ma_tinh_thanh varchar(40) PRIMARY KEY,
  ten_tinh_thanh varchar(120) NOT NULL,
  khu_vuc varchar(80)
);
CREATE TABLE IF NOT EXISTS ben_xe (
  ma_ben_xe varchar(40) PRIMARY KEY,
  ten_ben_xe varchar(160) NOT NULL,
  dia_chi varchar(255) NOT NULL,
  so_dien_thoai varchar(30),
  ma_tinh_thanh varchar(40) NOT NULL REFERENCES tinh_thanh(ma_tinh_thanh),
  trang_thai varchar(30) NOT NULL
);
CREATE TABLE IF NOT EXISTS nha_xe (
  ma_nha_xe varchar(40) PRIMARY KEY,
  ten_nha_xe varchar(160) NOT NULL
);
CREATE TABLE IF NOT EXISTS xe (
  ma_xe varchar(40) PRIMARY KEY,
  bien_so varchar(30) NOT NULL UNIQUE,
  so_cho_ngoi integer NOT NULL CHECK (so_cho_ngoi > 0),
  trang_thai varchar(30) NOT NULL,
  ma_nha_xe varchar(40) REFERENCES nha_xe(ma_nha_xe)
);
CREATE TABLE IF NOT EXISTS tuyen_xe (
  ma_tuyen varchar(40) PRIMARY KEY,
  ten_tuyen varchar(160) NOT NULL,
  tram_khoi_hanh varchar(40) NOT NULL REFERENCES ben_xe(ma_ben_xe),
  tram_den varchar(40) NOT NULL REFERENCES ben_xe(ma_ben_xe),
  thoi_gian_khoi_hanh time,
  khoang_cach_km numeric(12,2),
  thoi_gian_du_kien numeric(10,2),
  gia_co_ban numeric(14,2) NOT NULL,
  mo_ta varchar(1000),
  trang_thai varchar(30) NOT NULL,
  ma_nha_xe varchar(40) REFERENCES nha_xe(ma_nha_xe),
  CONSTRAINT ck_tram_khac_nhau CHECK (tram_khoi_hanh <> tram_den),
  CONSTRAINT ck_tuyen_gia CHECK (gia_co_ban >= 0),
  CONSTRAINT ck_tuyen_km CHECK (khoang_cach_km IS NULL OR khoang_cach_km > 0),
  CONSTRAINT ck_tuyen_thoi_gian CHECK (thoi_gian_du_kien IS NULL OR thoi_gian_du_kien > 0)
);
CREATE TABLE IF NOT EXISTS diem_dung (
  ma_diem_dung varchar(40) PRIMARY KEY,
  ma_tuyen varchar(40) NOT NULL REFERENCES tuyen_xe(ma_tuyen),
  ten_diem_dung varchar(160) NOT NULL,
  dia_chi varchar(255) NOT NULL,
  thu_tu integer NOT NULL CHECK (thu_tu > 0),
  thoi_gian_dung integer NOT NULL CHECK (thoi_gian_dung >= 0),
  loai_diem_dung varchar(20) NOT NULL,
  CONSTRAINT uq_diem_dung_thu_tu UNIQUE (ma_tuyen, thu_tu) DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS chuyen_xe (
  ma_chuyen varchar(40) PRIMARY KEY,
  ma_tuyen varchar(40) NOT NULL REFERENCES tuyen_xe(ma_tuyen),
  ma_xe varchar(40) REFERENCES xe(ma_xe),
  ngay_khoi_hanh date NOT NULL,
  gio_khoi_hanh time NOT NULL,
  gio_den_du_kien timestamp NOT NULL,
  trang_thai varchar(30) NOT NULL,
  CONSTRAINT ck_chuyen_gio_den CHECK (gio_den_du_kien > (ngay_khoi_hanh + gio_khoi_hanh))
);
CREATE INDEX IF NOT EXISTS ix_chuyen_ngay_trang_thai ON chuyen_xe (ngay_khoi_hanh, trang_thai);
CREATE INDEX IF NOT EXISTS ix_chuyen_tuyen ON chuyen_xe (ma_tuyen);
CREATE INDEX IF NOT EXISTS ix_chuyen_xe ON chuyen_xe (ma_xe);

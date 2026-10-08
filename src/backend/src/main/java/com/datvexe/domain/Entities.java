package com.datvexe.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.*;
import java.util.*;
import com.datvexe.domain.States.*;

/** Entity mapping for the route/trip portion of the agreed class diagram. */
public final class Entities {
    private Entities() {}

    @Entity(name = "TinhThanh") @Table(name = "tinh_thanh")
    public static class TinhThanh {
        @Id @Column(name = "ma_tinh_thanh", length = 40) public String maTinhThanh;
        @Column(name = "ten_tinh_thanh", nullable = false, length = 120) public String tenTinhThanh;
        @Column(name = "khu_vuc", length = 80) public String khuVuc;
        public TinhThanh() {}
    }

    @Entity(name = "BenXe") @Table(name = "ben_xe")
    public static class BenXe {
        @Id @Column(name = "ma_ben_xe", length = 40) public String maBenXe;
        @Column(name = "ten_ben_xe", nullable = false, length = 160) public String tenBenXe;
        @Column(name = "dia_chi", nullable = false, length = 255) public String diaChi;
        @Column(name = "so_dien_thoai", length = 30) public String soDienThoai;
        @ManyToOne(optional = false, fetch = FetchType.EAGER) @JoinColumn(name = "ma_tinh_thanh", nullable = false)
        public TinhThanh tinhThanh;
        @Enumerated(EnumType.STRING) @Column(name = "trang_thai", nullable = false, length = 30)
        public TrangThaiBenXe trangThai = TrangThaiBenXe.HOAT_DONG;
        public BenXe() {}
    }

    // Minimal references for entities owned by the transport/company modules.
    @Entity(name = "NhaXe") @Table(name = "nha_xe")
    public static class NhaXe {
        @Id @Column(name = "ma_nha_xe", length = 40) public String maNhaXe;
        @Column(name = "ten_nha_xe", nullable = false, length = 160) public String tenNhaXe;
        public NhaXe() {}
    }

    @Entity(name = "Xe") @Table(name = "xe")
    public static class Xe {
        @Id @Column(name = "ma_xe", length = 40) public String maXe;
        @Column(name = "bien_so", nullable = false, unique = true, length = 30) public String bienSo;
        @Column(name = "so_cho_ngoi", nullable = false) public int soChoNgoi;
        @Enumerated(EnumType.STRING) @Column(name = "trang_thai", nullable = false, length = 30)
        public TrangThaiXe trangThai = TrangThaiXe.SAN_SANG;
        @ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name = "ma_nha_xe") public NhaXe nhaXe;
        public Xe() {}
    }

    @Entity(name = "TuyenXe") @Table(name = "tuyen_xe")
    public static class TuyenXe {
        @Id @Column(name = "ma_tuyen", length = 40) public String maTuyen;
        @Column(name = "ten_tuyen", nullable = false, length = 160) public String tenTuyen;
        @ManyToOne(optional = false, fetch = FetchType.EAGER) @JoinColumn(name = "tram_khoi_hanh", nullable = false)
        public BenXe tramKhoiHanh;
        @ManyToOne(optional = false, fetch = FetchType.EAGER) @JoinColumn(name = "tram_den", nullable = false)
        public BenXe tramDen;
        @OneToMany(mappedBy = "tuyenXe", cascade = CascadeType.ALL, orphanRemoval = true)
        @OrderBy("thuTu ASC") public List<DiemDung> tramTrungGian = new ArrayList<>();
        @Column(name = "thoi_gian_khoi_hanh") public LocalTime thoiGianKhoiHanh;
        @Column(name = "khoang_cach_km", precision = 12, scale = 2) public BigDecimal khoangCachKM;
        @Column(name = "thoi_gian_du_kien", precision = 10, scale = 2) public BigDecimal thoiGianDuKien;
        @Column(name = "gia_co_ban", nullable = false, precision = 14, scale = 2) public BigDecimal giaCoBan;
        @Column(name = "mo_ta", length = 1000) public String moTa;
        @Enumerated(EnumType.STRING) @Column(name = "trang_thai", nullable = false, length = 30)
        public TrangThaiTuyenXe trangThai = TrangThaiTuyenXe.SAP_KHAI_THAC;
        @ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name = "ma_nha_xe") public NhaXe nhaXe;
        public TuyenXe() {}
    }

    @Entity(name = "DiemDung") @Table(name = "diem_dung", uniqueConstraints =
        @UniqueConstraint(name = "uq_diem_dung_thu_tu", columnNames = {"ma_tuyen", "thu_tu"}))
    public static class DiemDung {
        @Id @Column(name = "ma_diem_dung", length = 40) public String maDiemDung;
        @Column(name = "ten_diem_dung", nullable = false, length = 160) public String tenDiemDung;
        @Column(name = "dia_chi", nullable = false, length = 255) public String diaChi;
        @Column(name = "thu_tu", nullable = false) public int thuTu;
        @Column(name = "thoi_gian_dung", nullable = false) public int thoiGianDung;
        @Enumerated(EnumType.STRING) @Column(name = "loai_diem_dung", nullable = false, length = 20)
        public LoaiDiemDung loaiDiemDung;
        @ManyToOne(optional = false, fetch = FetchType.EAGER) @JoinColumn(name = "ma_tuyen", nullable = false)
        public TuyenXe tuyenXe;
        public DiemDung() {}
    }

    @Entity(name = "ChuyenXe") @Table(name = "chuyen_xe")
    public static class ChuyenXe {
        @Id @Column(name = "ma_chuyen", length = 40) public String maChuyen;
        @ManyToOne(optional = false, fetch = FetchType.EAGER) @JoinColumn(name = "ma_tuyen", nullable = false)
        public TuyenXe tuyenXe;
        @ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name = "ma_xe") public Xe xe;
        @Column(name = "ngay_khoi_hanh", nullable = false) public LocalDate ngayKhoiHanh;
        @Column(name = "gio_khoi_hanh", nullable = false) public LocalTime gioKhoiHanh;
        @Column(name = "gio_den_du_kien", nullable = false) public LocalDateTime gioDenDuKien;
        @Enumerated(EnumType.STRING) @Column(name = "trang_thai", nullable = false, length = 30)
        public TrangThaiChuyen trangThai = TrangThaiChuyen.CHUA_KHOI_HANH;
        public ChuyenXe() {}
    }
}

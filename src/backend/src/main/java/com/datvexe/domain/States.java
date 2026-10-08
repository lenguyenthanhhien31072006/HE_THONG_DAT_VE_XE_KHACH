package com.datvexe.domain;

public final class States {
    private States() {}

    public enum TrangThaiBenXe { HOAT_DONG, TAM_NGUNG, DONG_CUA, BAO_TRI }
    public enum TrangThaiTuyenXe { DANG_KHAI_THAC, TAM_NGUNG, NGUNG_KHAI_THAC, SAP_KHAI_THAC }
    public enum LoaiDiemDung { DIEM_DON, DIEM_TRA, CA_HAI }
    public enum TrangThaiChuyen { CHUA_KHOI_HANH, DANG_CHAY, HOAN_TAT, DA_HUY }
    public enum TrangThaiXe { SAN_SANG, DANG_CHAY, BAO_TRI, HONG, NGUNG_HOAT_DONG }
}

# He thong dat ve xe khach truc tuyen

Hệ thống đặt vé xe khách trực tuyến là đồ án môn Công nghệ Phần mềm, được xây dựng nhằm hỗ trợ khách hàng tìm kiếm chuyến xe, lựa chọn ghế, đặt vé và thanh toán trực tuyến.

Bên cạnh chức năng dành cho khách hàng, hệ thống còn hỗ trợ nhà xe quản lý tuyến xe, chuyến xe, phương tiện, nhân viên, giá vé, khuyến mãi và các hoạt động liên quan đến vận hành chuyến xe.

Repo được tổ chức theo hướng tách biệt tài liệu, frontend, backend, kiểm thử và cấu hình triển khai để nhóm có thể phát triển theo từng giai đoạn.

## Muc tieu

- Số hóa quy trình tìm kiếm và đặt vé xe khách.
- Cho phép khách hàng lựa chọn chuyến xe và ghế trực tuyến.
- Hỗ trợ thanh toán trực tuyến.
- Quản lý thông tin vé và lịch sử đặt vé.
- Hỗ trợ hủy vé và hoàn tiền theo chính sách.
- Hỗ trợ nhà xe quản lý tuyến xe, chuyến xe, phương tiện và nhân viên.
- Hỗ trợ khuyến mãi, đánh giá chuyến đi và quản trị dữ liệu hệ thống.

## Chuc nang chinh

### Khach hang

- Đăng ký tài khoản.
- Đăng nhập.
- Quản lý thông tin cá nhân.
- Tìm kiếm chuyến xe.
- Xem thông tin chuyến xe.
- Xem danh sách ghế.
- Chọn ghế.
- Đặt vé.
- Nhập thông tin hành khách.
- Áp dụng mã khuyến mãi.
- Thanh toán.
- Nhận vé điện tử.
- Xem lịch sử đặt vé.
- Hủy vé.
- Yêu cầu hoàn tiền.
- Đánh giá chuyến đi.

### Nha xe

- Quản lý thông tin nhà xe.
- Quản lý tuyến xe.
- Quản lý bến xe và điểm dừng.
- Quản lý chuyến xe.
- Quản lý phương tiện.
- Quản lý ghế.
- Quản lý nhân viên.
- Phân công nhân viên cho chuyến xe.
- Quản lý khuyến mãi.
- Quản lý chính sách hoàn vé.

### Quan tri he thong

- Quản lý người dùng.
- Quản lý nhà xe.
- Duyệt nhà xe.
- Theo dõi hoạt động hệ thống.
- Quản lý dữ liệu dùng chung.

## Cong nghe du kien

| Thanh phan | Cong nghe |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Backend | Java 21 |
| Build Tool | Maven |
| Web Server | Apache Tomcat |
| API | Jakarta Servlet |
| ORM | Hibernate / Jakarta Persistence |
| Database | PostgreSQL |
| Container | Docker, Docker Compose |
| Version Control | Git, GitHub |

## Kien truc tong the

```text
Frontend
Next.js + React + TypeScript
        |
        | HTTP
        v
Backend
Java + Servlet
Controller -> Service -> Repository -> Hibernate/JPA
        |
        v
PostgreSQL
```

## Cau truc thu muc

```text
HE_THONG_DAT_VE_XE_KHACH/
├── docs/
│   ├── requirements/
│   │   ├── SRS/
│   │   └── use-cases/
│   ├── diagrams/
│   │   ├── use-case/
│   │   ├── class-diagram/
│   │   ├── sequence-diagram/
│   │   ├── activity-diagram/
│   │   └── erd/
│   ├── database/
│   │   ├── schema/
│   │   └── seed/
│   └── plans/
├── src/
│   ├── frontend/
│   └── backend/
│       └── src/
│           ├── main/
│           │   ├── java/com/datvexe/
│           │   │   ├── controller/
│           │   │   ├── service/
│           │   │   ├── repository/
│           │   │   ├── domain/
│           │   │   ├── dto/
│           │   │   ├── config/
│           │   │   └── integration/
│           │   ├── resources/
│           │   └── webapp/
│           └── test/
├── tests/
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

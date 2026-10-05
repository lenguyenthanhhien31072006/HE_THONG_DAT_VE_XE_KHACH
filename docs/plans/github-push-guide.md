# Huong dan push repo len GitHub

Tài liệu này dùng cho lần đưa repo `HE_THONG_DAT_VE_XE_KHACH` lên GitHub và thiết lập workflow làm việc nhóm.

## 1. Kiem tra Git

Mở terminal tại thư mục repo:

```bash
cd "D:\HK1 - 2026.2027\web-deb\Web-Mai Anh Tho\HE_THONG_DAT_VE_XE_KHACH"
```

Kiểm tra trạng thái:

```bash
git status
```

Nếu Git báo lỗi `detected dubious ownership`, chạy lệnh sau một lần:

```bash
git config --global --add safe.directory "D:/HK1 - 2026.2027/web-deb/Web-Mai Anh Tho/HE_THONG_DAT_VE_XE_KHACH"
```

Sau đó kiểm tra lại:

```bash
git status
```

## 2. Commit lan dau

```bash
git add .
git commit -m "chore: initialize project repository"
```

## 3. Tao repo tren GitHub

Vào GitHub và tạo repository mới:

```text
HE_THONG_DAT_VE_XE_KHACH
```

Khi tạo repo, không chọn tạo sẵn:

- `README.md`
- `.gitignore`
- License

Vì các file này đã có ở repo local.

## 4. Gan remote GitHub

Thay `YOUR_USERNAME` bằng username hoặc organization của nhóm:

```bash
git remote add origin https://github.com/YOUR_USERNAME/HE_THONG_DAT_VE_XE_KHACH.git
```

Kiểm tra remote:

```bash
git remote -v
```

## 5. Push nhanh main

```bash
git branch -M main
git push -u origin main
```

## 6. Tao nhanh develop

```bash
git checkout -b develop
git push -u origin develop
```

## 7. Tao nhanh lam viec cho tung thanh vien

Ví dụ làm chức năng đặt vé:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/booking
```

Sau khi code xong:

```bash
git add .
git commit -m "feat: implement ticket booking"
git push -u origin feature/booking
```

Sau đó lên GitHub tạo Pull Request từ:

```text
feature/booking -> develop
```

Khi `develop` ổn định, tạo Pull Request:

```text
develop -> main
```

## 8. Goi y mo ta repo tren GitHub

Phần About có thể ghi:

```text
Hệ thống đặt vé xe khách trực tuyến hỗ trợ tìm kiếm chuyến xe, chọn ghế, đặt vé, thanh toán và quản lý hoạt động nhà xe.
```

Hoặc bản tiếng Anh:

```text
Online bus ticket booking and bus operator management system.
```

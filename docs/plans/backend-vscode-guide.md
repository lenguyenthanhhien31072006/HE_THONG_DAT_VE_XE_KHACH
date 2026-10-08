# Chạy và kiểm tra backend trong VS Code trên Windows

Các lệnh bên dưới dùng terminal **Git Bash** của VS Code, mở tại thư mục gốc `HE_THONG_DAT_VE_XE_KHACH`. Dùng nhánh `feat/route-trip-management`.

## 1. Công cụ cần cài

- JDK 21; `JAVA_HOME` trỏ tới JDK 21 và `PATH` có thư mục `bin` của JDK.
- Apache Maven 3.9.9 (hoặc Maven 3.9.x); `PATH` có thư mục `bin` của Maven.
- Docker Desktop đang chạy, dùng Linux containers.
- Python 3 để chạy bộ kiểm tra API; Windows Python launcher `py`.
- VS Code; có thể cài **Extension Pack for Java** để đọc/debug mã Java.

Kiểm tra:

```bash
java -version
mvn -version
docker version
docker compose version
py -3 --version
```

Java được Maven sử dụng phải là 21. Docker chạy Tomcat 10.1/JDK 21, nên không cần cài Tomcat riêng để làm theo hướng dẫn chính này.

## 2. Lấy code mới

```bash
git status
git switch feat/route-trip-management
git pull --ff-only origin feat/route-trip-management
code .
```

Nếu Git báo có thay đổi local ngăn việc pull, lưu/commit phần việc đó trước; không dùng reset để xóa thay đổi.

## 3. Build và chạy

Build WAR và chạy test trước khi tạo container backend:

```bash
mvn -f src/backend/pom.xml -B clean verify
docker compose up -d backend
docker compose ps
curl -i http://localhost:8080/api/tinh-thanh
```

Maven phải báo `BUILD SUCCESS`, `Tests run: 12, Failures: 0, Errors: 0, Skipped: 0`. Sau khi Tomcat khởi động, yêu cầu kiểm tra trả HTTP 200 và JSON (thường là `[]` trên DB mới). Nếu yêu cầu đầu tiên chưa thành công ngay, xem log và thử lại khi Tomcat khởi động xong:

```bash
docker compose logs --tail=80 backend
```

DB mới sẽ chạy schema tự động. Nếu đã có volume DB từ phiên bản cũ và log báo thiếu bảng, áp dụng schema:

```bash
docker exec -i datvexe-postgres psql -U datvexe_user -d datvexe -v ON_ERROR_STOP=1 < docs/database/schema/001_route_trip.sql
docker compose restart backend
```

Sau mỗi lần sửa code Java:

```bash
mvn -f src/backend/pom.xml -B verify
docker compose restart backend
```

Tomcat dùng API gốc `/api`, ví dụ `/api/ben-xe`, `/api/tuyen-xe`. Truy cập `/` không phải giao diện frontend.

## 4. Kiểm tra toàn bộ task

Sau khi API đã sẵn sàng, chạy tại gốc repository:

```bash
py -3 tests/backend/api_smoke.py
```

Nếu Python được cài dưới tên `python` hoặc `python3`, có thể thay `py -3` bằng tên lệnh tương ứng. Kết quả mong đợi:

```text
PASS: station/route CRUD and endpoints
PASS: stop insert/reorder/delete and invalid lists
PASS: trip create, overnight, vehicle assignment/conflicts, reschedule rollback
PASS: search by station/city/date, no trips, cancelled/completed and lifecycle
PASS: validation/404/409 and JSON error responses
PASS: 5 API scenarios, 75 HTTP responses checked
```

Script tạo dữ liệu thử với mã ngẫu nhiên và dọn dữ liệu đó sau lượt chạy. Nó tạo xe mẫu trực tiếp trong PostgreSQL vì task này chưa có API CRUD xe đầy đủ. Các thao tác gán xe, đổi lịch, hủy và tìm chuyến đều được kiểm tra qua HTTP. Chi tiết từng yêu cầu và các test nghiệp vụ ở `tests/backend/README.md`.

## 5. Kiểm tra bằng Postman hoặc Thunder Client

Chọn body JSON, header `Content-Type: application/json`. Tạo dữ liệu theo thứ tự:

1. `POST /api/tinh-thanh` với `{"maTinhThanh":"HCM","tenTinhThanh":"TP. Hồ Chí Minh"}` và `{"maTinhThanh":"LD","tenTinhThanh":"Lâm Đồng"}`.
2. `POST /api/ben-xe` với `{"maBenXe":"BX1","tenBenXe":"Bến 1","diaChi":"HCM","maTinhThanh":"HCM"}` và `{"maBenXe":"BX2","tenBenXe":"Bến 2","diaChi":"Đà Lạt","maTinhThanh":"LD"}`.
3. `POST /api/tuyen-xe` với JSON sau:

```json
{"maTuyen":"TX1","tenTuyen":"HCM - Đà Lạt","tramKhoiHanh":"BX1","tramDen":"BX2","thoiGianKhoiHanh":"08:00:00","thoiGianDuKien":6.5,"giaCoBan":250000,"trangThai":"DANG_KHAI_THAC"}
```

4. `POST /api/chuyen-xe` với `{"maChuyen":"CX1","maTuyen":"TX1","ngayKhoiHanh":"2030-01-01"}`. Mong đợi 201, trạng thái `CHUA_KHOI_HANH`, giờ đến `2030-01-01T14:30:00`.
5. `GET /api/chuyen-xe?from=BX1&to=BX2&date=2030-01-01` trả chuyến `CX1`; thay ngày không có chuyến thì trả `200 []`.
6. `POST /api/chuyen-xe/CX1/huy`, rồi gọi lại tìm kiếm: `CX1` không còn trong kết quả. `GET /api/chuyen-xe/CX1/trang-thai` vẫn trả `DA_HUY`.

Các API CRUD, điểm dừng, trạm đầu/cuối, gán xe và chuyển trạng thái còn lại được liệt kê đầy đủ trong `src/backend/README.md`. Tìm kiếm hiện nhận **mã bến hoặc mã tỉnh/thành**, không nhận tên nhập tự do.

## 6. Nếu dùng Tomcat đã cài trên máy

Tomcat cần là **10.1.x**, chạy bằng **Java 21**. Có thể chạy riêng DB bằng `docker compose up -d postgres`, build WAR như trên, rồi chép WAR vào thư mục `webapps` của Tomcat. Đặt tên WAR là `ROOT.war` để giữ URL `/api`; nếu giữ tên WAR ban đầu, URL sẽ có thêm tên ứng dụng trước `/api`.

Ứng dụng kết nối DB qua `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`. Giá trị phát triển mặc định tương ứng DB Compose tại `jdbc:postgresql://localhost:5432/datvexe`. Bộ kiểm tra HTTP mặc định gọi port 8080; nếu Tomcat dùng port/context khác, đặt `API_BASE_URL` trước khi chạy script.

Tránh chạy Tomcat riêng và container backend cùng port 8080. Nếu chọn container, hãy dừng Tomcat riêng; nếu chọn Tomcat riêng, dừng container backend bằng `docker compose stop backend`.

## 7. Dừng dịch vụ

```bash
docker compose stop
```

Lệnh này giữ dữ liệu DB cho lần chạy sau. Frontend hiện vẫn dùng mock data; kết quả kiểm tra ở trên là kết quả của backend API.

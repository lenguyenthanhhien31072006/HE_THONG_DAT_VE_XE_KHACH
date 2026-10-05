# Git workflow

## Nhanh chinh

- `main`: chứa phiên bản ổn định, dùng để nộp bài hoặc demo.
- `develop`: chứa phiên bản đang tích hợp trong quá trình phát triển.
- `feature/*`: nhánh chức năng của từng thành viên.

## Quy trinh

```bash
git checkout develop
git pull origin develop
git checkout -b feature/ten-chuc-nang
```

Sau khi hoàn thành:

```bash
git add .
git commit -m "feat: mo ta ngan gon chuc nang"
git push -u origin feature/ten-chuc-nang
```

Tạo Pull Request từ `feature/ten-chuc-nang` vào `develop`.

## Luu y

- Không commit trực tiếp lên `main`.
- Không push file `.env` thật.
- Pull code mới từ `develop` trước khi tạo nhánh mới.
- Commit nhỏ, rõ ý, dễ review.

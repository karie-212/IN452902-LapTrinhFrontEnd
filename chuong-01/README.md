# EduHub Web — Ch01 (starter)

Chương 1 môn **IN4529 — Lập trình Front End**. Em sẽ dựng 4 trang HTML cho **EduHub Web** — cổng
câu lạc bộ (CLB) và sự kiện sinh viên Trường Đại học Đồng Tháp — rồi đưa lên Internet bằng GitHub Pages.

Chương này **chỉ viết HTML**, chưa có CSS. Trang trông "trắng trơn" là đúng; Ch02 mới làm đẹp.

## Thư mục có gì

```
starter/
├── index.html               # Khung trang chủ, có các ghi chú TODO(ch1-Tk)
├── content/noi-dung-mau.md  # Toàn bộ chữ cần đưa vào 4 trang (không cần tự nghĩ nội dung)
├── assets/                  # Logo, ảnh minh hoạ, ảnh 6 CLB, og-image.png
└── README.md                # Tệp này
```

Kết quả cuối cùng em cần có: `index.html`, `events.html`, `event-detail.html`, `register.html`.
Mỗi việc cần làm được đánh dấu bằng `<!-- TODO(ch1-T1) -->` … `<!-- TODO(ch1-T6) -->` trong `index.html` —
mã này trùng với đề bài và rubric.

## Bước 1 — Cài công cụ (làm một lần)

1. **Trình duyệt** Chrome hoặc Edge (có DevTools — bấm `F12` để mở).
2. **VS Code**: tải ở <https://code.visualstudio.com>.
3. Trong VS Code, mở tab Extensions (`Ctrl+Shift+X`, macOS `Cmd+Shift+X`), tìm và cài **Live Server**
   (tác giả Ritwick Dey). Extension này mở trang trong trình duyệt và tự tải lại mỗi khi em lưu tệp.
4. **Git**: tải ở <https://git-scm.com>. Mở terminal, chạy lần lượt (thay tên và email của em):
   ```bash
   git config --global user.name "Nguyen Van A"
   git config --global user.email "mssv@sv.dthu.edu.vn"
   ```
5. **Tài khoản GitHub**: đăng ký miễn phí ở <https://github.com/signup> (nên dùng email trường).
6. *(Tuỳ chọn, để tự kiểm tra)* **Node.js 24 LTS**: tải ở <https://nodejs.org>.

## Bước 2 — Tạo repo GitHub và đưa starter lên

1. Vào <https://github.com/new>. Đặt **Repository name** là `EduHubWeb-Ch01-<MSSV>`, chọn **Public**,
   **không** tick "Add a README file" (vì starter đã có). Bấm **Create repository**.
2. Chép thư mục `starter/` ra chỗ em làm bài và đổi tên thành `EduHubWeb-Ch01-<MSSV>`.
3. Mở terminal **trong thư mục đó** (VS Code: menu *Terminal → New Terminal*) và chạy:
   ```bash
   git init
   git add .
   git commit -m "Khởi tạo EduHub Web từ starter Ch01"
   git branch -M main
   git remote add origin https://github.com/<ten-tai-khoan>/EduHubWeb-Ch01-<MSSV>.git
   git push -u origin main
   ```
   Lần đầu `push`, Git sẽ mở trình duyệt để em đăng nhập GitHub.

## Bước 3 — Mở bằng VS Code + Live Server

1. VS Code → *File → Open Folder…* → chọn thư mục `EduHubWeb-Ch01-<MSSV>`.
2. Chuột phải vào `index.html` → **Open with Live Server** (hoặc bấm **Go Live** ở góc phải dưới).
3. Trình duyệt mở `http://127.0.0.1:5500/index.html`. Sửa tệp, bấm `Ctrl+S` → trang tự tải lại.

## Bước 4 — Làm bài

Làm lần lượt theo mã nhiệm vụ. Mở `content/noi-dung-mau.md` để lấy chữ, việc của em là chọn **thẻ** đúng.

| Mã | Việc |
|---|---|
| ch1-T1 | Trang chủ `index.html` với thẻ semantic (`header`, `nav`, `main`, `section`, `article`, `footer`), FAQ bằng `<details>` |
| ch1-T2 | Tạo `events.html` — bảng lịch 8 sự kiện |
| ch1-T3 | Tạo `event-detail.html` — chi tiết một sự kiện |
| ch1-T4 | Tạo `register.html` — form đăng ký thành viên có kiểm tra dữ liệu |
| ch1-T5 | Meta/SEO, Open Graph cho cả 4 trang; bật GitHub Pages |
| ch1-T6 | *(Challenge)* Liên kết "Bỏ qua, đến nội dung chính", Lighthouse ≥ 95 |

Làm xong mỗi nhiệm vụ thì **commit một lần**, ví dụ:
```bash
git add .
git commit -m "Thêm trang lịch sự kiện (ch1-T2)"
git push
```

## Bước 5 — Bật GitHub Pages

1. Trên trang repo GitHub, vào **Settings → Pages**.
2. Mục **Build and deployment → Source** chọn **Deploy from a branch**.
3. **Branch** chọn `main` và thư mục `/ (root)` → **Save**.
4. Chờ 1–2 phút, tải lại trang Settings → Pages sẽ hiện địa chỉ
   `https://<ten-tai-khoan>.github.io/EduHubWeb-Ch01-<MSSV>/`. Mở thử, rồi dán link vào đầu tệp README này.
5. Mỗi lần `git push`, trang trên mạng tự cập nhật sau khoảng một phút.

Lưu ý: GitHub Pages phân biệt chữ hoa/thường — `Events.html` khác `events.html`. Đặt tên tệp toàn chữ thường.

## Tự kiểm tra trước khi nộp

```bash
npx -y html-validate@latest "*.html"   # cần Node.js; không in lỗi là đạt
```

- Bấm thử mọi liên kết trên 4 trang — không có trang 404.
- Ở form: gõ MSSV 9 chữ số hoặc email thiếu `@` → trình duyệt phải chặn không cho gửi.
- Mở DevTools (`F12`) → tab **Lighthouse** → chạy cho chế độ Mobile để xem điểm Accessibility và SEO.

## Nộp bài

Link repo GitHub + link GitHub Pages (theo hướng dẫn trong đề bài).

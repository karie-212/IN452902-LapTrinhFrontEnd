# Nội dung mẫu cho EduHub Web (Ch01)

Đây là **chữ** để em chép vào trang. Việc của em là chọn **thẻ HTML** phù hợp cho từng phần —
tệp này cố ý không có thẻ nào. Ảnh nằm trong thư mục `assets/`.

---

## 1. Dùng chung cho mọi trang

- Tên trang web: **EduHub Web**
- Logo: `assets/logo.svg` (gợi ý alt: "EduHub — về trang chủ")
- Menu: Trang chủ (`index.html`) · Sự kiện (`events.html`) · Câu lạc bộ (`index.html#cau-lac-bo`) · Đăng ký thành viên (`register.html`)
- Chân trang:
  - EduHub Web · Trường Đại học Đồng Tháp · 783 Phạm Hữu Lầu, Cao Lãnh, Đồng Tháp
  - Liên hệ: eduhub@dthu.edu.vn
  - Bài thực hành môn IN4529 — Lập trình Front End.

## 2. Trang chủ — `index.html`

**Tiêu đề lớn:** EduHub Web — Cổng CLB & sự kiện sinh viên

**Giới thiệu:** Nơi sinh viên Trường Đại học Đồng Tháp tìm câu lạc bộ hợp sở thích, xem lịch sự kiện
của cả trường và đăng ký tham gia chỉ trong vài bước.

Ảnh minh hoạ: `assets/hero.svg` — ba sinh viên đứng cạnh bảng "CLB" và bảng "Sự kiện".

### Sự kiện sắp tới (3 sự kiện)

1. **Workshop: Làm website đầu tiên với HTML** — 07:30, thứ Bảy 17/10/2026 · Phòng máy B1.203 · CLB Tin học.
   Hai giờ thực hành: viết trang giới thiệu bản thân và đưa lên GitHub Pages. Ảnh: `assets/club-tin-hoc.svg`.
2. **Ngày hội Hiến máu tình nguyện** — 07:00, thứ Bảy 24/10/2026 · Hội trường lớn · CLB Tình nguyện.
   Mỗi giọt máu cho đi, một cuộc đời ở lại. Có giấy chứng nhận và quà cho người tham gia. Ảnh: `assets/club-tinh-nguyen.svg`.
3. **English Speaking Night: Halloween** — 18:30, thứ Bảy 31/10/2026 · Sảnh nhà A1 · CLB Tiếng Anh.
   Trò chơi, hoá trang và luyện nói tiếng Anh cùng sinh viên các khoa. Ảnh: `assets/club-tieng-anh.svg`.

### Câu lạc bộ (6 CLB)

| CLB | Mô tả ngắn | Ảnh |
|---|---|---|
| CLB Tin học | Học lập trình, làm dự án nhỏ và luyện thi Olympic Tin học sinh viên. | `club-tin-hoc.svg` |
| CLB Tình nguyện | Hiến máu, Tiếp sức mùa thi, Mùa hè xanh và Xuân tình nguyện. | `club-tinh-nguyen.svg` |
| CLB Tiếng Anh | Sinh hoạt English Speaking Club hằng tuần, luyện thi chứng chỉ. | `club-tieng-anh.svg` |
| CLB Âm nhạc | Guitar, thanh nhạc, biểu diễn trong các đêm văn nghệ của trường. | `club-am-nhac.svg` |
| CLB Bóng đá | Tập luyện mỗi chiều thứ Tư, tổ chức giải bóng đá sinh viên hằng năm. | `club-bong-da.svg` |
| CLB Kỹ năng mềm | Thuyết trình, làm việc nhóm, viết CV và chuẩn bị phỏng vấn xin việc. | `club-ky-nang-mem.svg` |

### Câu hỏi thường gặp

- **Ai được đăng ký thành viên EduHub?** — Tất cả sinh viên đang học tại Trường Đại học Đồng Tháp, chỉ cần mã số sinh viên và email.
- **Tham gia sự kiện có mất phí không?** — Phần lớn sự kiện miễn phí. Sự kiện có phí sẽ ghi rõ ở trang chi tiết.
- **Một sinh viên được tham gia mấy câu lạc bộ?** — Không giới hạn, nhưng nên chọn tối đa hai CLB để có thời gian sinh hoạt đều đặn.

## 3. Lịch sự kiện — `events.html`

**Tiêu đề:** Lịch sự kiện · Học kỳ I, năm học 2026–2027.

| Thời gian | Sự kiện | Câu lạc bộ | Địa điểm | Số chỗ |
|---|---|---|---|---|
| 07:30, T7 17/10/2026 | Workshop: Làm website đầu tiên với HTML | CLB Tin học | Phòng máy B1.203 | 60 |
| 07:00, T7 24/10/2026 | Ngày hội Hiến máu tình nguyện | CLB Tình nguyện | Hội trường lớn | 300 |
| 18:30, T7 31/10/2026 | English Speaking Night: Halloween | CLB Tiếng Anh | Sảnh nhà A1 | 80 |
| 07:00, CN 08/11/2026 | Giải bóng đá sinh viên Khoa Công nghệ và Kỹ thuật 2026 | CLB Bóng đá | Sân bóng đá của trường | 160 |
| 19:00, T7 14/11/2026 | Đêm nhạc Tri ân thầy cô 20/11 | CLB Âm nhạc | Hội trường lớn | 400 |
| 14:00, T7 21/11/2026 | Kỹ năng thuyết trình trước đám đông | CLB Kỹ năng mềm | Phòng B2.105 | 100 |
| 08:00, T7 05/12/2026 | Olympic Tin học sinh viên cấp trường | CLB Tin học | Phòng máy B1.201–B1.203 | 120 |
| 07:00, CN 13/12/2026 | Ra quân Chiến dịch Xuân tình nguyện 2027 | CLB Tình nguyện | Sân trường | 200 |

Gợi ý giá trị `datetime` cho thẻ `<time>`: `2026-10-17T07:30+07:00` (năm-tháng-ngàyTgiờ:phút + múi giờ Việt Nam).

## 4. Chi tiết sự kiện — `event-detail.html`

**Workshop: Làm website đầu tiên với HTML** — do CLB Tin học tổ chức. Ảnh: `assets/club-tin-hoc.svg`.

Thông tin chung:
- Thời gian: 07:30 – 09:30, thứ Bảy 17/10/2026
- Địa điểm: Phòng máy B1.203, Trường Đại học Đồng Tháp
- Số chỗ: 60 (còn 12 chỗ)
- Chi phí: Miễn phí

Nội dung: Buổi workshop dành cho sinh viên chưa từng viết code. Sau hai giờ, mỗi bạn có một trang web
giới thiệu bản thân chạy trên Internet.
1. Trình duyệt hiển thị một trang web như thế nào.
2. Viết trang HTML đầu tiên trong VS Code.
3. Thêm ảnh, liên kết và danh sách sở thích.
4. Đưa trang lên GitHub Pages và chia sẻ đường link.

Cần chuẩn bị:
- Máy tính xách tay (nếu có) đã cài VS Code.
- Một tài khoản GitHub — tạo miễn phí tại https://github.com/signup
- Một tấm ảnh chân dung nhỏ để đưa vào trang.

## 5. Đăng ký thành viên — `register.html`

| Ô nhập | Bắt buộc | Ràng buộc |
|---|---|---|
| Mã số sinh viên | Có | Đúng 10 chữ số, ví dụ 0024410123 |
| Họ và tên | Có | 2–100 ký tự |
| Email | Có | Đúng dạng email, ví dụ mssv@sv.dthu.edu.vn |
| Mật khẩu | Có | Ít nhất 8 ký tự |
| Ngày sinh | Không | Kiểu ngày |
| Câu lạc bộ muốn tham gia | Không | Chọn 1 trong 6 CLB |
| Năm học hiện tại | Không | Năm 1 / Năm 2 / Năm 3 / Năm 4 |
| Giới thiệu ngắn về bản thân | Không | Tối đa 500 ký tự |
| Tôi đồng ý với nội quy sinh hoạt câu lạc bộ | Có | Ô đánh dấu |

Nút: **Đăng ký** và **Nhập lại**.

## 6. Mô tả cho meta description / Open Graph

- Trang chủ: Cổng thông tin câu lạc bộ và sự kiện dành cho sinh viên Trường Đại học Đồng Tháp: xem lịch sự kiện, tìm CLB phù hợp và đăng ký thành viên.
- Lịch sự kiện: Lịch các sự kiện sắp tới của câu lạc bộ sinh viên Trường Đại học Đồng Tháp, học kỳ I năm học 2026–2027.
- Chi tiết: Workshop 2 giờ của CLB Tin học: viết trang web giới thiệu bản thân bằng HTML và đưa lên GitHub Pages.
- Đăng ký: Đăng ký tài khoản thành viên EduHub Web dành cho sinh viên Trường Đại học Đồng Tháp.
- Ảnh chia sẻ: `assets/og-image.png` (1200×630).

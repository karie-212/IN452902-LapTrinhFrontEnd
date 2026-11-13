// Câu 2: viết JavaScript tại đây

const API_URL = 'http://localhost:4000';

// Hàm có sẵn: đổi giờ UTC sang giờ Việt Nam, vd "08:00 12/09/2026"
const formatDateTime = (iso) =>
  new Date(iso).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit', minute: '2-digit',
    day: '2-digit', month: '2-digit', year: 'numeric',
  });

// Câu 2a: số chỗ còn lại, vd "Còn 12/40 chỗ" hoặc "Hết chỗ"
const formatSeats = (event) => {
  const remaining = event.capacity - event.registeredCount;
  if (remaining <= 0) {
    return 'Hết chỗ';
  }
  return `Còn ${remaining}/${event.capacity} chỗ`;
};

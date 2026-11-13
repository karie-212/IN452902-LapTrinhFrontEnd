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

// Câu 2b: tạo 1 card <article>
const createEventCard = (event) => {
  const card = document.createElement('article');
  card.className = 'event-card';

  const img = document.createElement('img');
  img.setAttribute('src', 'img/event.svg');
  img.setAttribute('alt', `Ảnh minh hoạ sự kiện ${event.name}`);
  img.setAttribute('width', '320');
  img.setAttribute('height', '180');

  const title = document.createElement('h2');
  title.className = 'event-name';
  const link = document.createElement('a');
  link.setAttribute('href', `event-detail.html?id=${encodeURIComponent(event.id)}`);
  link.textContent = event.name;
  title.append(link);

  const timeP = document.createElement('p');
  timeP.className = 'event-time';
  const time = document.createElement('time');
  time.setAttribute('datetime', event.startTime);
  time.textContent = formatDateTime(event.startTime);
  timeP.append(time);

  const location = document.createElement('p');
  location.className = 'event-location';
  location.textContent = event.location;

  const seats = document.createElement('p');
  seats.className = 'event-seats';
  const seatsText = formatSeats(event);
  if (seatsText === 'Hết chỗ') {
    const badge = document.createElement('span');
    badge.className = 'badge-full';
    badge.textContent = seatsText;
    seats.append(badge);
  } else {
    seats.textContent = seatsText;
  }

  card.append(img, title, timeP, location, seats);
  return card;
};

// Câu 2b: thay toàn bộ card trong #event-list
const renderEvents = (events) => {
  const list = document.querySelector('#event-list');
  const cards = events.map((event) => createEventCard(event));
  list.replaceChildren(...cards);
};


import roomOne from '../../assets/themist/images/rooms/room-1.jpg';
import roomTwo from '../../assets/themist/images/rooms/room-2.jpg';
import roomThree from '../../assets/themist/images/rooms/room-3.jpg';
import roomFour from '../../assets/themist/images/rooms/room-4.jpg';
import roomFive from '../../assets/themist/images/rooms/room-5.jpg';
import slideOne from '../../assets/themist/images/slider/slide-1.jpg';
import slideTwo from '../../assets/themist/images/slider/slide-2.jpg';
import restaurantImage from '../../assets/themist/images/restaurant/restaurant-about.jpg';
import spaImage from '../../assets/themist/images/spa/spa-service-1.jpg';
import laundryImage from '../../assets/themist/images/spa/spa-service-3.jpg';
import transportImage from '../../assets/themist/images/contact-us.jpg';
export const API_URL = process.env.REACT_APP_API_URL;
export const roomImages = [roomOne, roomTwo, roomThree, roomFour, roomFive];
export const heroImages = { slideOne, slideTwo };
export const serviceOptions = [
  {
    value: 'room_service',
    title: 'Room Service',
    text: 'Fresh meals, snacks, and amenities delivered to your room.',
    image: restaurantImage,
    icon: 'ri-restaurant-2-line'
  },
  {
    value: 'laundry',
    title: 'Laundry',
    text: 'Pickup and press service for guest clothing and linens.',
    image: laundryImage,
    icon: 'ri-t-shirt-line'
  },
  {
    value: 'wakeup_call',
    title: 'Wakeup Call',
    text: 'Schedule a reliable wakeup call before travel or meetings.',
    image: slideTwo,
    icon: 'ri-alarm-line'
  },
  {
    value: 'transportation',
    title: 'Transportation',
    text: 'Airport transfer, city rides, and local travel assistance.',
    image: transportImage,
    icon: 'ri-taxi-line'
  }
];
export const fallbackRooms = [
  {
    _id: 'sample-suite',
    roomNumber: '301',
    type: 'suite',
    price: 280,
    capacity: 4,
    status: 'available',
    description: 'Spacious suite with lounge seating, skyline views, and premium guest amenities.',
    amenities: ['King bed', 'Lounge', 'Breakfast', 'City view'],
    images: []
  },
  {
    _id: 'sample-deluxe',
    roomNumber: '204',
    type: 'deluxe',
    price: 190,
    capacity: 3,
    status: 'available',
    description: 'Deluxe room with warm interiors, work desk, and a calm private balcony.',
    amenities: ['Queen bed', 'Balcony', 'Wi-Fi', 'Workspace'],
    images: []
  },
  {
    _id: 'sample-double',
    roomNumber: '118',
    type: 'double',
    price: 145,
    capacity: 2,
    status: 'occupied',
    description: 'Comfortable double room with soft lighting and practical storage.',
    amenities: ['Twin beds', 'Wi-Fi', 'Smart TV', 'Mini bar'],
    images: []
  }
];
export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch (error) {
    return {};
  }
}
export function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
export async function apiRequest(path, options = {}) {
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...authHeaders(),
    ...(options.headers || {})
  };
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }
  return data;
}
export function titleCase(value = '') {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
export function formatCurrency(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}
export function formatDate(value) {
  if (!value) return 'Not set';
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
export function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Number.isFinite(nights) && nights > 0 ? nights : 1;
}
export function roomImage(room, index = 0) {
  const raw = Array.isArray(room?.images) ? room.images[0] : '';
  if (raw && raw.startsWith('http')) return raw;
  if (raw && raw.startsWith('/')) return `${API_URL.replace('/api', '')}${raw}`;
  return roomImages[index % roomImages.length];
}
export function normalizeRoom(room, index = 0) {
  const source = room || fallbackRooms[index % fallbackRooms.length];
  return {
    id: source._id || source.id,
    roomNumber: source.roomNumber || `10${index + 1}`,
    type: source.type || 'deluxe',
    title: `${titleCase(source.type || 'deluxe')} Room`,
    price: Number(source.price || 0),
    capacity: Number(source.capacity || 2),
    description: source.description || 'A comfortable hotel room prepared for a relaxed stay.',
    amenities: Array.isArray(source.amenities) && source.amenities.length
      ? source.amenities
      : ['Wi-Fi', 'Air conditioning', 'Room service', 'Smart TV'],
    status: source.status || 'available',
    image: roomImage(source, index),
    raw: source
  };
}
export function normalizeBooking(booking, index = 0) {
  const room = booking?.roomId || {};
  const checkInDate = booking?.checkInDate || booking?.checkIn;
  const checkOutDate = booking?.checkOutDate || booking?.checkOut;
  return {
    id: booking?._id || booking?.id || `booking-${index + 1}`,
    roomId: room?._id || room?.id || booking?.roomId,
    roomName: room?.roomNumber ? `Room ${room.roomNumber}` : titleCase(room?.type || 'Room'),
    roomType: titleCase(room?.type || 'room'),
    roomPrice: Number(room?.price || 0),
    checkInDate,
    checkOutDate,
    nights: getNights(checkInDate, checkOutDate),
    guests: booking?.guests || 1,
    totalAmount: Number(booking?.totalAmount || 0),
    bookingStatus: booking?.bookingStatus || 'pending',
    paymentStatus: booking?.paymentStatus || 'unpaid',
    specialRequests: booking?.specialRequests || '',
    raw: booking
  };
}
export function statusClass(status = '') {
  const key = status.toLowerCase();
  if (key === 'confirmed' || key === 'paid' || key === 'completed' || key === 'available') return 'success';
  if (key === 'pending' || key === 'unpaid' || key === 'in_progress') return 'warning';
  if (key === 'cancelled' || key === 'maintenance') return 'danger';
  if (key === 'occupied') return 'info';
  return 'neutral';
}
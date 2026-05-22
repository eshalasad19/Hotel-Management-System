import { userAsset } from '../../../../utils/userAssets';

export const rooms = [
  {
    image: userAsset('images/rooms/room-1.jpg'),
    discount: '5% OFF',
    title: 'Superior Rooms',
    description:
      'Our Superior Room offers a comfortable and welcoming space, ideal for business or leisure travelers.',
    bed: 'Double Bed',
    guests: '1-2 Persons',
    size: '215–325 sq.ft.',
    tv: '32 Inch TV',
    price: '$129',
  },
  {
    image: userAsset('images/rooms/room-2.jpg'),
    discount: '10% OFF',
    badge: 'Popular',
    title: 'Deluxe Rooms',
    description:
      'The Deluxe Room provides extra space and added comfort for a relaxing stay. Guests can enjoy our amenities.',
    bed: 'Queen Bed',
    guests: '1-2 Persons',
    size: '300–450 sq.ft.',
    tv: '32 Inch TV',
    price: '$149',
  },
  {
    image: userAsset('images/rooms/room-3.jpg'),
    discount: '10% OFF',
    title: 'Premium Rooms',
    description: 'The Premium Room offers extra space, comfort, and premium amenities for a relaxing stay.',
    bed: 'King Size Bed',
    guests: '3-4 Persons',
    size: '430–645 sq.ft.',
    tv: '50 Inch TV',
    price: '$199',
  },
  {
    image: userAsset('images/rooms/room-4.jpg'),
    discount: '15% OFF',
    title: 'Executive Rooms',
    description:
      'Designed for business and upscale travelers, the Executive Room combines elegance and functionality.',
    bed: 'Twin Bed',
    guests: '3-4 Persons',
    size: '645–1,015 sq.ft.',
    tv: '55 Inch TV',
    price: '$249',
  },
  {
    image: userAsset('images/rooms/room-5.jpg'),
    discount: '20% OFF',
    badge: 'Most Loved',
    title: 'Honeymoon Suite',
    description: 'Spacious suite with separate living and sleeping areas and premium furnishings.',
    bed: 'Queen Bed',
    guests: '1 Couple',
    size: '1,015–3,100 sq.ft.',
    tv: '60 Inch TV',
    price: '$399',
  },
];

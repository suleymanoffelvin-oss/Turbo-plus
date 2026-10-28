import { mockListings } from '@/lib/mock-data';

export default function ElanDetail({ params }: { params: { id: string } }) {
  const listing = mockListings.find((l) => l.id === params.id) || mockListings[0];
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
      <h1>{listing.title}</h1>
      <p style={{ fontSize: 24, color: '#f97316', fontWeight: 'bold' }}>{listing.price.toLocaleString()} AZN</p>
      <p>İl: {listing.year} | Yürüş: {listing.mileage.toLocaleString()} km</p>
      <a href="tel:+994501234567" style={{ display: 'inline-block', marginTop: 16, background: '#f97316', color: 'white', padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
        Zəng et
      </a>
    </div>
  );
}

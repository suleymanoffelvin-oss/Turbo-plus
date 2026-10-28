import Link from 'next/link';
import { mockListings } from '@/lib/mock-data';

export default function ElanlarPage() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px' }}>
      <h1>Elanlar</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginTop: 24 }}>
        {mockListings.map((item) => (
          <Link key={item.id} href={`/elanlar/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ height: 160, background: '#e5e7eb', borderRadius: 8, marginBottom: 12 }} />
              <h3 style={{ margin: '0 0 8px' }}>{item.title}</h3>
              <p style={{ color: '#f97316', fontWeight: 'bold', margin: 0 }}>{item.price.toLocaleString()} AZN</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

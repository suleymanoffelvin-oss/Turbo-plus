import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ color: '#f97316' }}>TurboPlus</h1>
      <p>Azərbaycan üçün tamamilə pulsuz avtomobil elan platforması.</p>
      <div style={{ marginTop: 24 }}>
        <Link href="/elanlar" style={{ background: '#f97316', color: 'white', padding: '12px 24px', borderRadius: 8, textDecoration: 'none' }}>
          Elanlara bax
        </Link>
      </div>
    </div>
  );
}

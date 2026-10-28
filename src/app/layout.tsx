export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#fafafa' }}>
        {children}
      </body>
    </html>
  );
}

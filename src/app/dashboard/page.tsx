import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Şəxsi kabinet</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm text-gray-500">Aktiv elanlar</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">0</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm text-gray-500">Baxışlar</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">0</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="text-sm text-gray-500">Favoritlər</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">0</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <p className="text-gray-600 mb-4">Hələ heç bir elanınız yoxdur</p>
        <Link
          href="/elan-yerlesdir"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          İlk elanınızı yerləşdirin
        </Link>
      </div>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Real autentifikasiya və elan idarəetməsi Supabase bağlantısından sonra aktiv olacaq.
      </p>
    </div>
  );
}

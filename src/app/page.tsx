import Link from "next/link";
import HeroSearch from "@/components/HeroSearch";
import ListingCard from "@/components/ListingCard";
import { mockListings } from "@/lib/mock-data";

export default function HomePage() {
  const premiumListings = mockListings.filter((l) => l.isPremium).slice(0, 4);
  const latestListings = mockListings.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-orange-50 via-white to-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              Tamamilə pulsuz platforma
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Avtomobil axtarışını
              <span className="block text-orange-500">daha ağıllı edin</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Etibarlı satıcılar • Ağıllı qiymət • Daha təmiz təcrübə
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <HeroSearch />
          </div>

          {/* Trust points */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900">12 400+</div>
              <div className="text-gray-500 text-sm mt-1">Aktiv elan</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900">Etibar</div>
              <div className="text-gray-500 text-sm mt-1">Yoxlanılmış satıcılar</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900">Ağıllı</div>
              <div className="text-gray-500 text-sm mt-1">Qiymət analizi</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-orange-500">0 ₼</div>
              <div className="text-gray-500 text-sm mt-1">Elan yerləşdirmə</div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Premium elanlar</h2>
          <Link href="/elanlar?premium=true" className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center gap-1">
            Hamısına bax
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {premiumListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Son elanlar</h2>
            <Link href="/elanlar" className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center gap-1">
              Hamısına bax
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latestListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Niyə TurboPlus?</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Turbo.az-dan fərqli olaraq biz etibar, ağıllı qiymət və təmiz təcrübə üzərində qurulmuşuq</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Etibar sistemi</h3>
            <p className="text-sm text-gray-600">Yoxlanılmış satıcılar, reytinq və saxta elanlara qarşı qoruma</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Ağıllı qiymət</h3>
            <p className="text-sm text-gray-600">Hər elanda bazar qiyməti göstəricisi — ədalətli qiyməti dərhal görürsən</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Tamamilə pulsuz</h3>
            <p className="text-sm text-gray-600">Elan yerləşdirmək, VIP etmək və irəli çəkmək — hamısı pulsuz</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Maşınını satmaq istəyirsən?</h2>
          <p className="text-orange-100 mb-6">Elan yerləşdirmək tamamilə pulsuzdur. Heç bir ödəniş yoxdur.</p>
          <Link
            href="/elan-yerlesdir"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-xl hover:bg-orange-50 transition shadow-lg"
          >
            Pulsuz elan yerləşdir
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

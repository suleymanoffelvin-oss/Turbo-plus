import { mockListings, formatPrice, formatMileage, formatDate } from "@/lib/mock-data";
import Link from "next/link";
import { notFound } from "next/navigation";
import ListingCard from "@/components/ListingCard";
import FavoriteButton from "@/components/FavoriteButton";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    notFound();
  }

  // Similar listings (same brand or similar price)
  const similar = mockListings
    .filter((l) => l.id !== listing.id && (l.brand === listing.brand || Math.abs(l.price - listing.price) < 10000))
    .slice(0, 4);

  // Mock price analysis
  const marketAvg = Math.round(listing.price * (0.92 + Math.random() * 0.16));
  const priceDiff = listing.price - marketAvg;
  const priceStatus =
    priceDiff < -2000
      ? { label: "Yaxşı qiymət", color: "text-green-700 bg-green-50 border-green-200", desc: "Bazar ortalamasından aşağı" }
      : priceDiff > 3000
      ? { label: "Bir qədər yüksək", color: "text-orange-700 bg-orange-50 border-orange-200", desc: "Bazar ortalamasından yuxarı" }
      : { label: "Ədalətli qiymət", color: "text-blue-700 bg-blue-50 border-blue-200", desc: "Bazar ortalamasına yaxın" };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-orange-500">Ana səhifə</Link>
        <span>/</span>
        <Link href="/elanlar" className="hover:text-orange-500">Elanlar</Link>
        <span>/</span>
        <span className="text-gray-900">{listing.brand} {listing.model}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="relative aspect-[16/10] bg-gray-50">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <FavoriteButton listingId={listing.id} />
              </div>
              {listing.isPremium && (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  PREMIUM
                </span>
              )}
            </div>
            {listing.images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {listing.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-20 h-14 object-cover rounded-lg border border-gray-200 hover:border-orange-400 cursor-pointer"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Specs */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Texniki göstəricilər</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "İl", value: listing.year },
                { label: "Yürüş", value: formatMileage(listing.mileage) },
                { label: "Yanacaq", value: listing.fuelType },
                { label: "Sürət qutusu", value: listing.transmission },
                { label: "Mühərrik", value: `${listing.engineVolume} L` },
                { label: "At gücü", value: listing.horsePower ? `${listing.horsePower} a.g.` : "—" },
                { label: "Kuzov", value: listing.bodyType || "—" },
                { label: "Rəng", value: listing.color || "—" },
                { label: "Şəhər", value: listing.city },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                  <div className="text-xs text-gray-500">{item.label}</div>
                  <div className="font-semibold text-gray-900 mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Təsvir</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {listing.description || "Satıcı ətraflı məlumat yazmayıb."}
            </p>
          </div>

          {/* Features */}
          {listing.features && listing.features.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Xüsusiyyətlər</h2>
              <div className="flex flex-wrap gap-2">
                {listing.features.map((f) => (
                  <span key={f} className="bg-orange-50 text-orange-700 text-sm px-3 py-1 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column - sticky */}
        <div className="space-y-5">
          {/* Price card */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
            <div className="flex items-start justify-between mb-1">
              <h1 className="text-xl font-bold text-gray-900">
                {listing.brand} {listing.model}
              </h1>
            </div>
            <p className="text-sm text-gray-500 mb-4">{listing.year} • {formatMileage(listing.mileage)}</p>

            <div className="text-3xl font-bold text-gray-900 mb-3">
              {formatPrice(listing.price, listing.currency)}
            </div>

            {/* Smart Price Analysis */}
            <div className={`rounded-xl border p-3 mb-5 ${priceStatus.color}`}>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{priceStatus.label}</span>
                <span className="text-xs opacity-80">Ağıllı qiymət</span>
              </div>
              <p className="text-xs mt-1 opacity-90">{priceStatus.desc}</p>
              <p className="text-xs mt-1 opacity-70">Bazar ortalaması: ~{formatPrice(marketAvg)}</p>
            </div>

            {/* Seller info */}
            <div className="border-t border-gray-100 pt-4 mb-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                  {listing.sellerName?.[0] || "S"}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{listing.sellerName || "Satıcı"}</div>
                  <div className="text-xs text-gray-500">{listing.sellerType || "Şəxsi"}</div>
                </div>
              </div>

              {listing.sellerType === "Salon" && (
                <div className="flex items-center gap-1.5 text-sm text-blue-600 mb-3">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Yoxlanılmış satıcı
                </div>
              )}

              {/* Rating mock */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className={`w-4 h-4 ${star <= 4 ? "text-orange-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-1">4.0 (12 rəy)</span>
              </div>
            </div>

            {/* Contact buttons */}
            <div className="space-y-2">
              <a
                href={`tel:${listing.phone || "+994501234567"}`}
                className="flex items-center justify-center gap-2 w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Zəng et
              </a>
              <button className="flex items-center justify-center gap-2 w-full h-12 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Mesaj yaz
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              Elan tarixi: {formatDate(listing.createdAt)} • {listing.views || 0} baxış
            </p>

            {/* Report */}
            <button className="w-full mt-4 text-xs text-gray-400 hover:text-red-500 transition">
              Elanı şikayət et
            </button>
          </div>
        </div>
      </div>

      {/* Similar listings */}
      {similar.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Oxşar elanlar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {similar.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

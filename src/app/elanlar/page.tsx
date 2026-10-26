import ListingCard from "@/components/ListingCard";
import ListingsFilter from "@/components/ListingsFilter";
import { mockListings } from "@/lib/mock-data";
import Link from "next/link";
import { Suspense } from "react";

interface SearchParams {
  brand?: string;
  model?: string;
  city?: string;
  priceTo?: string;
  premium?: string;
  isNew?: string;
  fuel?: string;
  transmission?: string;
}

export default async function ElanlarPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  let filtered = [...mockListings];

  if (params.brand) {
    filtered = filtered.filter((l) => l.brand === params.brand);
  }
  if (params.model) {
    filtered = filtered.filter((l) => l.model === params.model);
  }
  if (params.city) {
    filtered = filtered.filter((l) => l.city === params.city);
  }
  if (params.priceTo) {
    filtered = filtered.filter((l) => l.price <= Number(params.priceTo));
  }
  if (params.premium === "true") {
    filtered = filtered.filter((l) => l.isPremium);
  }
  if (params.isNew === "true") {
    filtered = filtered.filter((l) => l.isNew);
  }
  if (params.fuel) {
    filtered = filtered.filter((l) => l.fuelType === params.fuel);
  }
  if (params.transmission) {
    filtered = filtered.filter((l) => l.transmission === params.transmission);
  }

  // Sort: premium first, then newest
  filtered.sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <Suspense fallback={<div className="bg-white rounded-xl border p-5 h-96 animate-pulse" />}>
            <ListingsFilter />
          </Suspense>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {params.premium === "true" ? "Premium elanlar" : "Bütün elanlar"}
              <span className="text-gray-500 text-base font-normal ml-2">
                ({filtered.length} elan)
              </span>
            </h1>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg mb-2">Heç bir elan tapılmadı</p>
              <p className="text-gray-400 text-sm mb-4">Filterləri dəyişib yenidən yoxlayın</p>
              <Link href="/elanlar" className="text-blue-600 hover:underline font-medium">
                Filtrləri sıfırla
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

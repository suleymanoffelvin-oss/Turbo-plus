import Link from "next/link";
import { CarListing } from "@/types";
import { formatPrice, formatMileage } from "@/lib/mock-data";
import FavoriteButton from "./FavoriteButton";

interface ListingCardProps {
  listing: CarListing;
}

// Mock fair price logic (later will be real)
function getPriceStatus(price: number, year: number): { label: string; color: string } {
  // Simple mock: newer cars with lower price = good deal
  if (year >= 2022 && price < 35000) return { label: "Yaxşı qiymət", color: "text-green-600 bg-green-50" };
  if (price > 60000) return { label: "Yüksək", color: "text-orange-600 bg-orange-50" };
  return { label: "Normal", color: "text-gray-500 bg-gray-50" };
}

export default function ListingCard({ listing }: ListingCardProps) {
  const priceStatus = getPriceStatus(listing.price, listing.year);

  return (
    <Link
      href={`/elanlar/${listing.id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-200 relative"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {listing.isPremium && (
            <span className="bg-orange-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow">
              PREMIUM
            </span>
          )}
          {listing.isNew && (
            <span className="bg-emerald-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow">
              YENİ
            </span>
          )}
        </div>

        <div className="absolute top-2.5 right-2.5 z-10">
          <FavoriteButton listingId={listing.id} size="sm" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition line-clamp-1">
            {listing.brand} {listing.model}
          </h3>
          <span className="text-xs text-gray-400 whitespace-nowrap">{listing.year}</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <p className="text-xl font-bold text-gray-900">
            {formatPrice(listing.price, listing.currency)}
          </p>
          <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${priceStatus.color}`}>
            {priceStatus.label}
          </span>
        </div>

        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-500 mb-3">
          <span>{listing.engineVolume} L</span>
          <span>•</span>
          <span>{listing.fuelType}</span>
          <span>•</span>
          <span>{listing.transmission}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{formatMileage(listing.mileage)}</span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {listing.city}
          </span>
        </div>

        {/* Trust indicator */}
        {listing.sellerType === "Salon" && (
          <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-[11px] text-blue-600 font-medium">Yoxlanılmış satıcı</span>
          </div>
        )}
      </div>
    </Link>
  );
}

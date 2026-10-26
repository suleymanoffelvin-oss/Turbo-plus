"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { brands, cities } from "@/lib/mock-data";

export default function HeroSearch() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [city, setCity] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (city) params.set("city", city);
    if (priceTo) params.set("priceTo", priceTo);
    router.push(`/elanlar?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Marka</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none bg-gray-50"
          >
            <option value="">Hamısı</option>
            {brands.map((b) => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Şəhər</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none bg-gray-50"
          >
            <option value="">Hamısı</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Maks. qiymət</label>
          <select
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            className="w-full h-11 px-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none bg-gray-50"
          >
            <option value="">Limitsiz</option>
            <option value="15000">15 000 ₼</option>
            <option value="25000">25 000 ₼</option>
            <option value="35000">35 000 ₼</option>
            <option value="50000">50 000 ₼</option>
            <option value="80000">80 000 ₼</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Axtar
          </button>
        </div>
      </div>
    </form>
  );
}

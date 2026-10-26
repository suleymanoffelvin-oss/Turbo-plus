"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { brands, cities, fuelTypes, transmissions, bodyTypes } from "@/lib/mock-data";

export default function ListingsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    brand: searchParams.get("brand") || "",
    model: searchParams.get("model") || "",
    city: searchParams.get("city") || "",
    fuel: searchParams.get("fuel") || "",
    transmission: searchParams.get("transmission") || "",
    priceTo: searchParams.get("priceTo") || "",
    premium: searchParams.get("premium") || "",
  });

  const selectedBrand = brands.find((b) => b.name === filters.brand);
  const models = selectedBrand?.models || [];

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.push(`/elanlar?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({
      brand: "",
      model: "",
      city: "",
      fuel: "",
      transmission: "",
      priceTo: "",
      premium: "",
    });
    router.push("/elanlar");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">Filterlər</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-orange-500 hover:underline"
        >
          Təmizlə
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marka</label>
          <select
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value, model: "" })}
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">Hamısı</option>
            {brands.map((b) => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
          <select
            value={filters.model}
            onChange={(e) => setFilters({ ...filters, model: e.target.value })}
            disabled={!filters.brand}
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-400 outline-none disabled:bg-gray-50"
          >
            <option value="">Hamısı</option>
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Şəhər</label>
          <select
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">Hamısı</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Yanacaq</label>
          <select
            value={filters.fuel}
            onChange={(e) => setFilters({ ...filters, fuel: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">Hamısı</option>
            {fuelTypes.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sürət qutusu</label>
          <select
            value={filters.transmission}
            onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">Hamısı</option>
            {transmissions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Maks. qiymət</label>
          <select
            value={filters.priceTo}
            onChange={(e) => setFilters({ ...filters, priceTo: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
          >
            <option value="">Limitsiz</option>
            <option value="15000">15 000 AZN</option>
            <option value="25000">25 000 AZN</option>
            <option value="35000">35 000 AZN</option>
            <option value="50000">50 000 AZN</option>
            <option value="80000">80 000 AZN</option>
            <option value="100000">100 000 AZN</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="premium"
            checked={filters.premium === "true"}
            onChange={(e) => setFilters({ ...filters, premium: e.target.checked ? "true" : "" })}
            className="rounded"
          />
          <label htmlFor="premium" className="text-sm text-gray-700">Yalnız Premium</label>
        </div>

        <button
          onClick={applyFilters}
          className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg transition"
        >
          Filterləri tətbiq et
        </button>
      </div>
    </div>
  );
}

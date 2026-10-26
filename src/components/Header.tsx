"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getFavorites } from "@/lib/favorites";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    setFavCount(getFavorites().length);
    const interval = setInterval(() => setFavCount(getFavorites().length), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">
                Turbo<span className="text-orange-500">Plus</span>
              </span>
              <p className="text-[10px] text-gray-400 -mt-1 hidden sm:block">Sürətli. Etibarlı. Sənin.</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/elanlar" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition">
              Elanlar
            </Link>
            <Link href="/elanlar?premium=true" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition">
              Premium
            </Link>
            <Link href="/favoritler" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition relative">
              Seçilmişlər
              {favCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {favCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/elan-yerlesdir"
              className="hidden sm:inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Elan yerləşdir
            </Link>

            <Link
              href="/giris"
              className="text-sm font-medium text-gray-600 hover:text-orange-500 transition px-2 py-2"
            >
              Giriş
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-50"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              <Link href="/elanlar" className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Bütün elanlar
              </Link>
              <Link href="/elanlar?premium=true" className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Premium elanlar
              </Link>
              <Link href="/favoritler" className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 rounded-lg flex items-center justify-between" onClick={() => setMobileMenuOpen(false)}>
                Seçilmişlər
                {favCount > 0 && <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">{favCount}</span>}
              </Link>
              <Link href="/elan-yerlesdir" className="px-3 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                + Elan yerləşdir (Pulsuz)
              </Link>
              <Link href="/giris" className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Giriş / Qeydiyyat
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

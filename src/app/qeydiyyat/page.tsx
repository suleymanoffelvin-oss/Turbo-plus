"use client";

import Link from "next/link";
import { useState } from "react";

export default function QeydiyyatPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Şifrələr eyni deyil");
      return;
    }
    alert("Qeydiyyat funksiyası tezliklə aktiv olacaq (Supabase bağlantısından sonra)");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Qeydiyyat</h1>
          <p className="text-gray-600 mt-1">Yeni hesab yaradın</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-4 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ad və soyad *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Elvin Süleymanov"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">E-poçt *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="email@example.com"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon *</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+994 50 123 45 67"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Şifrə *</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Minimum 6 simvol"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Şifrəni təsdiqlə *</label>
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Şifrəni təkrar yazın"
              className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input type="checkbox" id="terms" required className="mt-1" />
            <label htmlFor="terms" className="text-sm text-gray-600">
              <Link href="/qaydalar" className="text-blue-600 hover:underline">İstifadə qaydaları</Link> və{" "}
              <Link href="/mexfilik" className="text-blue-600 hover:underline">Məxfilik siyasəti</Link> ilə razıyam
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition mt-2"
          >
            Qeydiyyatdan keç
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Artıq hesabınız var?{" "}
          <Link href="/giris" className="text-blue-600 font-medium hover:underline">
            Daxil olun
          </Link>
        </p>
      </div>
    </div>
  );
}

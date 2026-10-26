"use client";

import { useState } from "react";
import { brands, cities, fuelTypes, transmissions, bodyTypes } from "@/lib/mock-data";
import Link from "next/link";

export default function ElanYerlesdirPage() {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedBrand = brands.find((b) => b.name === brand);
  const models = selectedBrand?.models || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Elanınız qəbul edildi!</h1>
        <p className="text-gray-600 mb-6">
          Elanınız yoxlanıldıqdan sonra dərc olunacaq. Bu adətən bir neçə dəqiqə çəkir.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/elanlar" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
            Elanlara bax
          </Link>
          <button
            onClick={() => { setSubmitted(false); setStep(1); }}
            className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
          >
            Yeni elan yerləşdir
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Elan yerləşdir (Pulsuz)</h1>
        <p className="text-gray-600 mt-1">Maşınınızı satmaq üçün məlumatları doldurun</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= s ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              {s}
            </div>
            <div className={`h-1 flex-1 rounded ${step > s ? "bg-blue-600" : "bg-gray-200"} ${s === 3 ? "hidden" : ""}`} />
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-6">
        {step === 1 && (
          <>
            <h2 className="text-lg font-semibold text-gray-900">1. Əsas məlumatlar</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Marka *</label>
                <select
                  required
                  value={brand}
                  onChange={(e) => { setBrand(e.target.value); setModel(""); }}
                  className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Seçin</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Model *</label>
                <select
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!brand}
                  className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-50"
                >
                  <option value="">Seçin</option>
                  {models.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">İl *</label>
                <input type="number" required min="1990" max="2026" placeholder="2022" className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Yürüş (km) *</label>
                <input type="number" required min="0" placeholder="45000" className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Qiymət (AZN) *</label>
                <input type="number" required min="0" placeholder="35000" className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Şəhər *</label>
                <select required className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Seçin</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button type="button" onClick={() => setStep(2)} className="px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                Növbəti →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-lg font-semibold text-gray-900">2. Texniki məlumatlar</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Yanacaq növü *</label>
                <select required className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Seçin</option>
                  {fuelTypes.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sürət qutusu *</label>
                <select required className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Seçin</option>
                  {transmissions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kuzov növü *</label>
                <select required className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="">Seçin</option>
                  {bodyTypes.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Rəng</label>
                <input type="text" placeholder="Ağ" className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mühərrik həcmi (L)</label>
                <input type="number" step="0.1" placeholder="2.0" className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">At gücü</label>
                <input type="number" placeholder="150" className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Təsvir</label>
              <textarea
                rows={4}
                placeholder="Maşın haqqında ətraflı məlumat yazın..."
                className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button type="button" onClick={() => setStep(1)} className="px-6 h-11 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                ← Geri
              </button>
              <button type="button" onClick={() => setStep(3)} className="px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                Növbəti →
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-lg font-semibold text-gray-900">3. Şəkillər və əlaqə</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Şəkillər (maksimum 10)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition cursor-pointer">
                <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-gray-600">Şəkilləri bura sürükləyin və ya klikləyin</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG — hər biri max 5 MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Adınız *</label>
                <input type="text" required placeholder="Elvin" className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefon *</label>
                <input type="tel" required placeholder="+994 50 123 45 67" className="w-full h-11 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" required className="mt-1" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                <Link href="/qaydalar" className="text-blue-600 hover:underline">İstifadə qaydaları</Link> ilə razıyam
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <button type="button" onClick={() => setStep(2)} className="px-6 h-11 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                ← Geri
              </button>
              <button type="submit" className="px-6 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition">
                Elanı yerləşdir
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

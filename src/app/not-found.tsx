import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200">404</h1>
        <h2 className="text-xl font-semibold text-gray-900 mt-2">Səhifə tapılmadı</h2>
        <p className="text-gray-600 mt-2 mb-6">Axtardığınız səhifə mövcud deyil və ya silinib.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition"
        >
          Ana səhifəyə qayıt
        </Link>
      </div>
    </div>
  );
}

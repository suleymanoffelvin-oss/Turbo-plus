// Bu fayl Supabase hesabı açdıqdan sonra aktiv ediləcək.
// İndi mock data istifadə edirik.

/*
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
*/

// Müvəqqəti placeholder
export function createClient() {
  console.warn("Supabase hələ qoşulmayıb. Mock data istifadə olunur.");
  return null;
}

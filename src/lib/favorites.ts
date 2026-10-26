"use client";

const FAVORITES_KEY = "turboplus_favorites";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addFavorite(id: string): void {
  const favs = getFavorites();
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  }
}

export function removeFavorite(id: string): void {
  const favs = getFavorites().filter((f) => f !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: string): boolean {
  if (isFavorite(id)) {
    removeFavorite(id);
    return false;
  } else {
    addFavorite(id);
    return true;
  }
}

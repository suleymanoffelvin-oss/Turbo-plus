"use client";

import { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "@/lib/favorites";

interface FavoriteButtonProps {
  listingId: string;
  className?: string;
  size?: "sm" | "md";
}

export default function FavoriteButton({ listingId, className = "", size = "md" }: FavoriteButtonProps) {
  const [fav, setFav] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFav(isFavorite(listingId));
  }, [listingId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleFavorite(listingId);
    setFav(newState);
  };

  if (!mounted) {
    return (
      <button className={`p-2 rounded-full bg-white/90 shadow ${className}`} aria-label="Favorit">
        <svg className={size === "sm" ? "w-4 h-4" : "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full bg-white/90 shadow hover:bg-white transition ${className}`}
      aria-label={fav ? "Favoritlərdən çıxar" : "Favoritlərə əlavə et"}
    >
      <svg
        className={`${size === "sm" ? "w-4 h-4" : "w-5 h-5"} ${fav ? "text-red-500 fill-red-500" : "text-gray-600"}`}
        fill={fav ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}

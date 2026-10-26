export interface CarListing {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: "AZN" | "USD";
  mileage: number;
  fuelType: "Benzin" | "Dizel" | "Hibrid" | "Elektro" | "Qaz";
  transmission: "Mexanika" | "Avtomat" | "Robot" | "Variator";
  bodyType: string;
  color: string;
  engineVolume: number;
  horsePower: number;
  location: string;
  city: string;
  description: string;
  images: string[];
  isPremium: boolean;
  isNew: boolean;
  sellerType: "Şəxsi" | "Salon";
  sellerName: string;
  sellerPhone: string;
  createdAt: string;
  views: number;
  features: string[];
}

export interface Brand {
  id: string;
  name: string;
  models: string[];
}

export interface SearchFilters {
  brand?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  priceFrom?: number;
  priceTo?: number;
  mileageTo?: number;
  fuelType?: string;
  transmission?: string;
  city?: string;
  bodyType?: string;
  sellerType?: string;
  isNew?: boolean;
}

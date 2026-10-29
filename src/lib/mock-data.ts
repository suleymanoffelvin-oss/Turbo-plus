import type { Brand, CarListing } from '@/types';

export const brands: Brand[] = [
  { id: 'toyota', name: 'Toyota', models: ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Prius'] },
  { id: 'hyundai', name: 'Hyundai', models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent'] },
  { id: 'kia', name: 'Kia', models: ['Sportage', 'Sorento', 'Optima', 'Cerato', 'Rio'] },
  { id: 'mercedes-benz', name: 'Mercedes-Benz', models: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE'] },
  { id: 'bmw', name: 'BMW', models: ['3 Series', '5 Series', '7 Series', 'X3', 'X5'] },
  { id: 'volkswagen', name: 'Volkswagen', models: ['Golf', 'Passat', 'Polo', 'Tiguan', 'Touareg'] },
  { id: 'nissan', name: 'Nissan', models: ['Altima', 'Qashqai', 'X-Trail', 'Patrol', 'Sunny'] },
  { id: 'chevrolet', name: 'Chevrolet', models: ['Cruze', 'Malibu', 'Aveo', 'Captiva', 'Cobalt'] },
  { id: 'lada', name: 'LADA', models: ['Granta', 'Vesta', 'Niva', '2107'] },
];

export const cities: string[] = [
  'Bakı', 'Sumqayıt', 'Gəncə', 'Mingəçevir', 'Şəki', 'Şirvan',
  'Lənkəran', 'Naxçıvan', 'Quba', 'Qəbələ', 'Şamaxı', 'Xaçmaz',
];

export const fuelTypes: CarListing['fuelType'][] = ['Benzin', 'Dizel', 'Hibrid', 'Elektro', 'Qaz'];
export const transmissions: CarListing['transmission'][] = ['Mexanika', 'Avtomat', 'Robot', 'Variator'];
export const bodyTypes: string[] = ['Sedan', 'Hetçbek', 'Universal', 'SUV', 'Kupe', 'Kabriolet', 'Minivan', 'Pikap'];

const numberFormatter = new Intl.NumberFormat('az-AZ');

export function formatPrice(price: number, currency: CarListing['currency'] = 'AZN'): string {
  return `${numberFormatter.format(price)} ${currency}`;
}

export function formatMileage(mileage: number): string {
  return `${numberFormatter.format(mileage)} km`;
}

export const mockListings = [
  { id: '1', title: 'Toyota Camry 2020', price: 28500, year: 2020, mileage: 45000 },
  { id: '2', title: 'Hyundai Elantra 2021', price: 22000, year: 2021, mileage: 32000 },
  { id: '3', title: 'Kia Sportage 2019', price: 26000, year: 2019, mileage: 58000 },
];

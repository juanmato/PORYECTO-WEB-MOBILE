import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a unique ID for services
 * @returns A unique service ID with prefix
 */
export function generateServiceId(): string {
  return `srv-${uuidv4()}`;
}

/**
 * Generates a unique ID for quotes
 * @returns A unique quote ID with prefix
 */
export function generateQuoteId(): string {
  return `q-${uuidv4()}`;
}

/**
 * Generates a unique ID for insumos (supplies)
 * @returns A unique insumo ID with prefix
 */
export function generateInsumoId(): string {
  return `ins-${uuidv4()}`;
}

/**
 * Generates a unique ID for insumo packs
 * @returns A unique insumo pack ID with prefix
 */
export function generateInsumoPackId(): string {
  return `pack-${uuidv4()}`;
}

/**
 * Generates a generic unique ID without prefix
 * @returns A UUID v4 string
 */
export function generateId(): string {
  return uuidv4();
}

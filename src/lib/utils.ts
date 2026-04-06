import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge className values with Tailwind CSS conflict resolution
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format price to European format: "12,50 €"
 */
export function formatPrice(price: number): string {
  if (typeof price !== "number" || isNaN(price)) {
    return "0,00 €";
  }
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Format discount percentage: "-15%"
 */
export function formatDiscount(price: number, comparePrice: number): string {
  if (!comparePrice || comparePrice <= price) {
    return "";
  }
  const discountPercent = Math.round(((comparePrice - price) / comparePrice) * 100);
  return `-${discountPercent}%`;
}

/**
 * Convert text to URL-friendly slug
 */
export function slugify(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncate(text: string, length: number = 100): string {
  if (!text || text.length <= length) {
    return text;
  }
  return text.slice(0, length).trim() + "...";
}

/**
 * Calculate shipping cost based on subtotal and bottle count
 * Free shipping over 150€
 */
export function getShippingCost(subtotal: number, bottleCount: number): number {
  if (subtotal >= 150) {
    return 0;
  }

  // Base cost: 5€ for up to 6 bottles
  let cost = 5;

  // Additional 0.50€ per bottle over 6
  if (bottleCount > 6) {
    cost += (bottleCount - 6) * 0.5;
  }

  // Maximum shipping cost: 25€
  return Math.min(cost, 25);
}

/**
 * Calculate volume discount based on quantity
 */
export function calculateVolumeDiscount(quantity: number, unitPrice: number): number {
  let discountPercentage = 0;

  if (quantity >= 12) {
    discountPercentage = 0.15; // 15% off for 12+ bottles
  } else if (quantity >= 6) {
    discountPercentage = 0.1; // 10% off for 6+ bottles
  } else if (quantity >= 3) {
    discountPercentage = 0.05; // 5% off for 3+ bottles
  }

  return unitPrice * quantity * discountPercentage;
}

/**
 * Get image URL with optional transformation
 */
export function getImageUrl(path: string): string {
  if (!path) {
    return "/images/placeholder.jpg";
  }

  // If it's already a full URL, return as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // If it starts with /, it's relative to public folder
  if (path.startsWith("/")) {
    return path;
  }

  // Otherwise prepend /images/
  return `/images/${path}`;
}

/**
 * Get critic color for rating badges
 */
export function getCriticColor(critic: string): string {
  const criticLower = critic.toLowerCase();

  const colorMap: { [key: string]: string } = {
    decanter: "bg-amber-100 text-amber-900 border-amber-300",
    "wine enthusiast": "bg-red-100 text-red-900 border-red-300",
    "james suckling": "bg-purple-100 text-purple-900 border-purple-300",
    "robert parker": "bg-orange-100 text-orange-900 border-orange-300",
    vivino: "bg-blue-100 text-blue-900 border-blue-300",
    "wine spectator": "bg-rose-100 text-rose-900 border-rose-300",
    "parker report": "bg-yellow-100 text-yellow-900 border-yellow-300",
    default: "bg-slate-100 text-slate-900 border-slate-300",
  };

  return colorMap[criticLower] || colorMap.default;
}

/**
 * Get critic abbreviation
 */
export function getCriticAbbreviation(critic: string): string {
  const abbreviationMap: { [key: string]: string } = {
    decanter: "DC",
    "wine enthusiast": "WE",
    "james suckling": "JS",
    "robert parker": "RP",
    vivino: "VV",
    "wine spectator": "WS",
    "parker report": "PR",
  };

  const lowerCritic = critic.toLowerCase();
  if (abbreviationMap[lowerCritic]) {
    return abbreviationMap[lowerCritic];
  }

  // Generate abbreviation from first letters
  return critic
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
}

/**
 * Format date to Spanish locale
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}

/**
 * Format date with time
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
}

/**
 * Calculate average rating
 */
export function calculateAverageRating(ratings: number[]): number {
  if (!ratings || ratings.length === 0) {
    return 0;
  }
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

/**
 * Generate star rating display
 */
export function generateStars(rating: number, maxStars: number = 5): number[] {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(1); // Full star
    } else if (i - 0.5 <= rating) {
      stars.push(0.5); // Half star
    } else {
      stars.push(0); // Empty star
    }
  }
  return stars;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-()]{8,}$/;
  return phoneRegex.test(phone);
}

/**
 * Format phone number to Spanish format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 9) {
    return `+34 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return phone;
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Format large numbers (1000 -> 1K, 1000000 -> 1M)
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

/**
 * Get initials from name
 */
export function getInitials(firstName: string, lastName?: string): string {
  const first = firstName.charAt(0).toUpperCase();
  const last = lastName?.charAt(0).toUpperCase() || "";
  return first + last;
}

/**
 * Compare two versions (returns -1, 0, or 1)
 */
export function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }

  return 0;
}

/**
 * Parse query parameters from URL
 */
export function parseQueryParams(queryString: string): Record<string, string | string[]> {
  const params: Record<string, string | string[]> = {};
  const pairs = queryString.replace("?", "").split("&");

  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key) {
      const decodedKey = decodeURIComponent(key);
      const decodedValue = decodeURIComponent(value || "");

      if (params[decodedKey]) {
        if (Array.isArray(params[decodedKey])) {
          (params[decodedKey] as string[]).push(decodedValue);
        } else {
          params[decodedKey] = [params[decodedKey] as string, decodedValue];
        }
      } else {
        params[decodedKey] = decodedValue;
      }
    }
  });

  return params;
}

/**
 * Build query string from object
 */
export function buildQueryString(params: Record<string, string | string[] | number | boolean>): string {
  const queryParts: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => {
        queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
      });
    } else {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  });

  return queryParts.length > 0 ? "?" + queryParts.join("&") : "";
}

/**
 * Deep merge objects
 */
export function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (sourceValue === null || sourceValue === undefined) {
      continue;
    }

    if (typeof sourceValue === "object" && !Array.isArray(sourceValue) && typeof targetValue === "object" && !Array.isArray(targetValue)) {
      result[key] = deepMerge(targetValue as Record<string, unknown>, sourceValue as Record<string, unknown>) as unknown as T[Extract<keyof T, string>];
    } else {
      result[key] = sourceValue as unknown as T[Extract<keyof T, string>];
    }
  }

  return result;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number) {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: unknown[]) {
    const later = () => {
      timeout = null;
      (func as (...args: unknown[]) => unknown)(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(func: T, limit: number) {
  let inThrottle: boolean;

  return function executedFunction(...args: unknown[]) {
    if (!inThrottle) {
      (func as (...args: unknown[]) => unknown)(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Sleep for specified milliseconds (async)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate random ID
 */
export function generateId(prefix?: string): string {
  const id = Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
  return prefix ? `${prefix}-${id}` : id;
}

/**
 * Check if value is empty
 */
export function isEmpty(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === "object" && Object.keys(value).length === 0)
  );
}

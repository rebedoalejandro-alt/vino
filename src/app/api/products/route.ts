import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import type { Product } from "@/types";

interface FilteredProduct extends Product {
  slug?: string;
  averageRating?: number;
  isOrganic?: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
  immediateShipping?: boolean;
  minRating?: number;
}

// Helper to calculate average rating
function getAverageRating(product: Product): number {
  if (!product.ratings || product.ratings.length === 0) return 0;
  const sum = product.ratings.reduce((acc, rating) => acc + rating.score, 0);
  return sum / product.ratings.length / 10; // Normalize from 100-point scale to 5-point
}

// Helper to generate slug from product name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Helper to filter products
function filterProducts(
  products: FilteredProduct[],
  filters: {
    type?: string;
    region?: string;
    bodega?: string;
    grape?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    isOrganic?: boolean;
    isNew?: boolean;
    isRecommended?: boolean;
    immediateShipping?: boolean;
    minRating?: number;
  }
): FilteredProduct[] {
  return products.filter((product) => {
    // Wine type filter
    if (filters.type && product.wineType !== filters.type) {
      return false;
    }

    // Region filter
    if (filters.region && product.region?.id !== filters.region) {
      return false;
    }

    // Bodega filter
    if (filters.bodega && product.bodega?.id !== filters.bodega) {
      return false;
    }

    // Grape filter
    if (filters.grape && !product.grapes?.some((g) => g.id === filters.grape)) {
      return false;
    }

    // Price range filter
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }

    // Search filter (by name and description)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const descriptionMatch = product.description
        .toLowerCase()
        .includes(searchLower);
      const bodeganameMatch = product.bodega?.name
        .toLowerCase()
        .includes(searchLower);
      if (!nameMatch && !descriptionMatch && !bodeganameMatch) {
        return false;
      }
    }

    // Rating filter
    if (filters.minRating !== undefined) {
      const avgRating = getAverageRating(product);
      if (avgRating < filters.minRating) {
        return false;
      }
    }

    // Mock filters (not stored in mock data)
    if (filters.isOrganic && !product.isOrganic) {
      return false;
    }
    if (filters.isNew && !product.isNew) {
      return false;
    }
    if (filters.isRecommended && !product.isRecommended) {
      return false;
    }
    if (filters.immediateShipping && !product.immediateShipping) {
      return false;
    }

    return true;
  });
}

// Helper to sort products
function sortProducts(
  products: FilteredProduct[],
  sortBy: string
): FilteredProduct[] {
  const sorted = [...products];

  switch (sortBy) {
    case "precio-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "precio-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "rating":
      return sorted.sort(
        (a, b) => getAverageRating(b) - getAverageRating(a)
      );
    case "relevancia":
    default:
      return sorted;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Get query parameters
    const type = searchParams.get("type") || undefined;
    const region = searchParams.get("region") || undefined;
    const bodega = searchParams.get("bodega") || undefined;
    const grape = searchParams.get("grape") || undefined;
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined;
    const sort = searchParams.get("sort") || "relevancia";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") || "20"))
    );
    const search = searchParams.get("search") || undefined;
    const isOrganic = searchParams.get("isOrganic") === "true";
    const isNew = searchParams.get("isNew") === "true";
    const isRecommended = searchParams.get("isRecommended") === "true";
    const immediateShipping = searchParams.get("immediateShipping") === "true";
    const minRating = searchParams.get("minRating")
      ? parseFloat(searchParams.get("minRating")!)
      : undefined;

    // Add mock properties and slug to products
    const productsWithSlug: FilteredProduct[] = MOCK_PRODUCTS.map((product) => ({
      ...product,
      slug: generateSlug(product.name),
      averageRating: getAverageRating(product),
      isOrganic: false,
      isNew: false,
      isRecommended: product.featured,
      immediateShipping: product.stock > 0,
    }));

    // Apply filters
    let filtered = filterProducts(productsWithSlug, {
      type,
      region,
      bodega,
      grape,
      minPrice,
      maxPrice,
      search,
      isOrganic,
      isNew,
      isRecommended,
      immediateShipping,
      minRating,
    });

    // Apply sorting
    filtered = sortProducts(filtered, sort);

    // Calculate pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedProducts = filtered.slice(offset, offset + limit);

    // Validate page number
    if (page > totalPages && total > 0) {
      return NextResponse.json(
        {
          error: "Page out of range",
          page,
          totalPages,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

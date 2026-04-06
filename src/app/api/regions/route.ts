import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") || "20"))
    );
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));

    // Get unique regions with product counts
    const regionsMap = new Map();

    MOCK_PRODUCTS.forEach((product) => {
      if (product.region) {
        if (!regionsMap.has(product.region.id)) {
          regionsMap.set(product.region.id, {
            ...product.region,
            productCount: 0,
          });
        }
        regionsMap.get(product.region.id).productCount += 1;
      }
    });

    const regions = Array.from(regionsMap.values());

    // Pagination
    const total = regions.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedRegions = regions.slice(offset, offset + limit);

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
      regions: paginatedRegions,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching regions:", error);
    return NextResponse.json(
      { error: "Failed to fetch regions" },
      { status: 500 }
    );
  }
}

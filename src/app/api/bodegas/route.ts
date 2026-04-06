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

    // Get unique bodegas with product counts
    const bodegasMap = new Map();

    MOCK_PRODUCTS.forEach((product) => {
      if (product.bodega) {
        if (!bodegasMap.has(product.bodega.id)) {
          bodegasMap.set(product.bodega.id, {
            ...product.bodega,
            productCount: 0,
          });
        }
        bodegasMap.get(product.bodega.id).productCount += 1;
      }
    });

    const bodegas = Array.from(bodegasMap.values());

    // Pagination
    const total = bodegas.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedBodegas = bodegas.slice(offset, offset + limit);

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
      bodegas: paginatedBodegas,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching bodegas:", error);
    return NextResponse.json(
      { error: "Failed to fetch bodegas" },
      { status: 500 }
    );
  }
}

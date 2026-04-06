import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

// Helper to get all unique bodegas and regions
function getUniqueBodegasAndRegions() {
  const bodegas = new Map();
  const regions = new Map();

  MOCK_PRODUCTS.forEach((product) => {
    if (product.bodega && !bodegas.has(product.bodega.id)) {
      bodegas.set(product.bodega.id, product.bodega);
    }
    if (product.region && !regions.has(product.region.id)) {
      regions.set(product.region.id, product.region);
    }
  });

  return {
    bodegas: Array.from(bodegas.values()),
    regions: Array.from(regions.values()),
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "10"))
    );

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: "Query must be at least 2 characters" },
        { status: 400 }
      );
    }

    const queryLower = query.toLowerCase();

    // Search products
    const productResults = MOCK_PRODUCTS.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(queryLower);
      const descriptionMatch = product.description
        .toLowerCase()
        .includes(queryLower);
      const bodegaMatch = product.bodega?.name
        .toLowerCase()
        .includes(queryLower);
      const regionMatch = product.region?.name
        .toLowerCase()
        .includes(queryLower);
      const grapeMatch = product.grapes?.some((g) =>
        g.name.toLowerCase().includes(queryLower)
      );

      return nameMatch || descriptionMatch || bodegaMatch || regionMatch || grapeMatch;
    }).slice(0, limit);

    // Get bodegas and regions
    const { bodegas, regions } = getUniqueBodegasAndRegions();

    // Search bodegas
    const bodegaResults = bodegas
      .filter((bodega) =>
        bodega.name.toLowerCase().includes(queryLower) ||
        bodega.description.toLowerCase().includes(queryLower)
      )
      .slice(0, limit);

    // Search regions
    const regionResults = regions
      .filter((region) =>
        region.name.toLowerCase().includes(queryLower) ||
        region.description.toLowerCase().includes(queryLower)
      )
      .slice(0, limit);

    return NextResponse.json({
      query,
      results: {
        products: productResults.map((p) => ({
          id: p.id,
          type: "producto",
          title: p.name,
          subtitle: p.bodega?.name,
          image: p.image,
          price: p.price,
        })),
        bodegas: bodegaResults.map((b) => ({
          id: b.id,
          type: "bodega",
          title: b.name,
          subtitle: `${b.country} - ${b.region}`,
          image: b.image,
        })),
        regions: regionResults.map((r) => ({
          id: r.id,
          type: "region",
          title: r.name,
          subtitle: r.country,
          description: r.description,
        })),
      },
      resultCounts: {
        products: productResults.length,
        bodegas: bodegaResults.length,
        regions: regionResults.length,
        total: productResults.length + bodegaResults.length + regionResults.length,
      },
    });
  } catch (error) {
    console.error("Error searching:", error);
    return NextResponse.json(
      { error: "Failed to search" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import type { Review } from "@/types";

// Mock reviews storage (in production, would use Prisma)
const mockReviews: Review[] = [];

// Helper to generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Get reviews for product
    const productReviews = mockReviews.filter(
      (review) => review.productId === productId
    );

    // Calculate average rating
    const averageRating =
      productReviews.length > 0
        ? productReviews.reduce((acc, review) => acc + review.rating, 0) /
          productReviews.length
        : 0;

    // Count reviews by rating
    const ratingDistribution = {
      5: productReviews.filter((r) => r.rating === 5).length,
      4: productReviews.filter((r) => r.rating === 4).length,
      3: productReviews.filter((r) => r.rating === 3).length,
      2: productReviews.filter((r) => r.rating === 2).length,
      1: productReviews.filter((r) => r.rating === 1).length,
    };

    return NextResponse.json({
      productId,
      reviews: productReviews,
      stats: {
        totalReviews: productReviews.length,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution,
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, rating, title, comment, authorName, authorEmail } = body;

    // Validate required fields
    if (!productId || !rating || !title || !comment || !authorName || !authorEmail) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Validate rating
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be an integer between 1 and 5" },
        { status: 400 }
      );
    }

    // Validate email
    if (!isValidEmail(authorEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate text fields
    if (title.length < 3 || title.length > 100) {
      return NextResponse.json(
        { error: "Title must be between 3 and 100 characters" },
        { status: 400 }
      );
    }

    if (comment.length < 10 || comment.length > 5000) {
      return NextResponse.json(
        { error: "Comment must be between 10 and 5000 characters" },
        { status: 400 }
      );
    }

    // Create review
    const review: Review = {
      id: generateId(),
      productId,
      product,
      authorName: authorName.trim(),
      authorEmail: authorEmail.toLowerCase(),
      rating,
      title: title.trim(),
      content: comment.trim(),
      verified: false, // In production, verify purchase first
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Store review (in production, save to database)
    mockReviews.push(review);

    return NextResponse.json(
      {
        review,
        message: "Review submitted successfully. Thank you for your feedback!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

// Mock stock alerts storage (in production, would use Prisma)
interface StockAlert {
  id: string;
  email: string;
  productId: string;
  createdAt: Date;
  notified: boolean;
}

const stockAlerts: StockAlert[] = [];

// Helper to generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, productId } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.toLowerCase().trim();

    if (!isValidEmail(trimmedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate product ID
    if (!productId || typeof productId !== "string") {
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

    // Check if product is already out of stock
    if (product.stock > 0) {
      return NextResponse.json(
        {
          error: "This product is currently in stock",
          stock: product.stock,
        },
        { status: 400 }
      );
    }

    // Check if alert already exists for this email/product
    const existingAlert = stockAlerts.find(
      (alert) => alert.email === trimmedEmail && alert.productId === productId
    );

    if (existingAlert) {
      return NextResponse.json(
        {
          message: "You are already registered for stock alerts for this product",
          alertId: existingAlert.id,
        },
        { status: 200 }
      );
    }

    // Create stock alert
    const alert: StockAlert = {
      id: generateId(),
      email: trimmedEmail,
      productId,
      createdAt: new Date(),
      notified: false,
    };

    // Store alert (in production, save to database and set up email notification)
    stockAlerts.push(alert);

    return NextResponse.json(
      {
        message: "Stock alert registered successfully. We will notify you when the product is back in stock.",
        alertId: alert.id,
        productName: product.name,
        email: trimmedEmail,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering stock alert:", error);
    return NextResponse.json(
      { error: "Failed to register stock alert" },
      { status: 500 }
    );
  }
}

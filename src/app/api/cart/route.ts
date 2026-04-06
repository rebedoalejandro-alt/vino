import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import type { CartItem } from "@/types";

const CART_COOKIE_NAME = "casa-del-vino-cart";

// Helper to get cart from cookie
function getCartFromCookie(request: NextRequest): CartItem[] {
  const cartCookie = request.cookies.get(CART_COOKIE_NAME);
  if (!cartCookie?.value) {
    return [];
  }
  try {
    return JSON.parse(decodeURIComponent(cartCookie.value));
  } catch {
    return [];
  }
}

// Helper to set cart cookie
function setCartCookie(response: NextResponse, cart: CartItem[]): void {
  response.cookies.set(CART_COOKIE_NAME, encodeURIComponent(JSON.stringify(cart)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
}

// Helper to calculate cart totals
function calculateTotals(cart: CartItem[]) {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over 100
  const tax = subtotal * 0.21; // 21% VAT (Spanish rate)
  const total = subtotal + shipping + tax;

  return { subtotal, shipping, tax, total };
}

export async function GET(request: NextRequest) {
  try {
    const cart = getCartFromCookie(request);
    const { subtotal, shipping, tax, total } = calculateTotals(cart);

    return NextResponse.json({
      items: cart,
      subtotal,
      shipping,
      tax,
      total,
      itemCount: cart.length,
    });
  } catch (error) {
    console.error("Error getting cart:", error);
    return NextResponse.json(
      { error: "Failed to get cart" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId || !quantity || quantity < 1) {
      return NextResponse.json(
        { error: "Invalid product or quantity" },
        { status: 400 }
      );
    }

    // Find product from mock data
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Check stock
    if (product.stock < quantity) {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 }
      );
    }

    // Get existing cart
    const cart = getCartFromCookie(request);

    // Check if item already in cart
    const existingItem = cart.find((item) => item.productId === productId);

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        return NextResponse.json(
          { error: "Insufficient stock" },
          { status: 400 }
        );
      }
      existingItem.quantity = newQuantity;
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `${productId}-${Date.now()}`,
        productId,
        product,
        quantity,
        price: product.price,
        addedAt: new Date(),
      };
      cart.push(newItem);
    }

    // Create response
    const { subtotal, shipping, tax, total } = calculateTotals(cart);
    const response = NextResponse.json({
      items: cart,
      subtotal,
      shipping,
      tax,
      total,
      itemCount: cart.length,
      message: "Item added to cart",
    });

    // Set cart cookie
    setCartCookie(response, cart);

    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { itemId, quantity } = body;

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    // Get existing cart
    const cart = getCartFromCookie(request);

    if (quantity && quantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    // Find and update item
    const item = cart.find((i) => i.id === itemId);
    if (!item) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    // Check stock
    if (quantity > item.product.stock) {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 }
      );
    }

    item.quantity = quantity;

    // Create response
    const { subtotal, shipping, tax, total } = calculateTotals(cart);
    const response = NextResponse.json({
      items: cart,
      subtotal,
      shipping,
      tax,
      total,
      itemCount: cart.length,
      message: "Cart updated",
    });

    // Set cart cookie
    setCartCookie(response, cart);

    return response;
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { itemId } = body;

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    // Get existing cart
    let cart = getCartFromCookie(request);

    // Filter out the item
    cart = cart.filter((i) => i.id !== itemId);

    // Create response
    const { subtotal, shipping, tax, total } = calculateTotals(cart);
    const response = NextResponse.json({
      items: cart,
      subtotal,
      shipping,
      tax,
      total,
      itemCount: cart.length,
      message: "Item removed from cart",
    });

    // Set cart cookie
    setCartCookie(response, cart);

    return response;
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}

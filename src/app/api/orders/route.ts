import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { Order, OrderItem, Address, PaymentMethod, CartItem } from "@/types";

// Mock orders storage (in production, would use Prisma)
const mockOrders: Order[] = [];

// Helper to generate order number
function generateOrderNumber(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

// Helper to generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Filter orders by user email (in production, would query database)
    const userOrders = mockOrders.filter(
      (order) => order.customer.email === session.user!.email
    );

    return NextResponse.json({
      orders: userOrders,
      count: userOrders.length,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const body = await request.json();
    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      customerInfo,
    } = body;

    // Validate required fields
    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Cart cannot be empty" },
        { status: 400 }
      );
    }

    if (!shippingAddress || !paymentMethod) {
      return NextResponse.json(
        { error: "Shipping address and payment method are required" },
        { status: 400 }
      );
    }

    // Validate address
    const requiredAddressFields = ["street", "city", "state", "postalCode", "country"];
    const validateAddress = (addr: Address) => {
      return requiredAddressFields.every(
        (field) => addr[field as keyof Address]
      );
    };

    if (!validateAddress(shippingAddress)) {
      return NextResponse.json(
        { error: "Invalid shipping address" },
        { status: 400 }
      );
    }

    // Validate payment method
    const validPaymentMethods: PaymentMethod[] = ["tarjeta", "transferencia", "paypal", "klarna"];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return NextResponse.json(
        { error: "Invalid payment method" },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce(
      (acc: number, item: CartItem) => acc + item.price * item.quantity,
      0
    );
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.21;
    const total = subtotal + shipping + tax;

    // Create order items
    const orderItems: OrderItem[] = items.map((item: CartItem) => ({
      id: generateId(),
      orderId: "",
      productId: item.productId,
      product: item.product,
      quantity: item.quantity,
      price: item.price,
      name: item.product.name,
    }));

    // Create order
    const order: Order = {
      id: generateId(),
      orderNumber: generateOrderNumber(),
      items: orderItems,
      customer: {
        id: generateId(),
        email: session.user!.email,
        firstName: customerInfo?.firstName || "",
        lastName: customerInfo?.lastName || "",
        phone: customerInfo?.phone || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      subtotal,
      shipping,
      tax,
      total,
      status: "pendiente",
      paymentMethod,
      paymentStatus: "pendiente",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Store order (in production, save to database)
    mockOrders.push(order);

    // Update order items with order ID
    orderItems.forEach((item) => {
      item.orderId = order.id;
    });

    return NextResponse.json(
      {
        order,
        message: "Order created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

// Mock newsletter subscribers storage (in production, would use Prisma or email service)
const subscribers: Set<string> = new Set();

// Helper to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

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

    // Check if already subscribed
    if (subscribers.has(trimmedEmail)) {
      return NextResponse.json(
        {
          message: "You are already subscribed to our newsletter",
          email: trimmedEmail,
        },
        { status: 200 }
      );
    }

    // Add subscriber (in production, would also send confirmation email)
    subscribers.add(trimmedEmail);

    return NextResponse.json(
      {
        message: "Successfully subscribed to the newsletter",
        email: trimmedEmail,
        subscriberCount: subscribers.size,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}

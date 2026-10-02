import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getOverrides, setOverrides, PortfolioOverrides } from "@/lib/store";
import { revalidatePath } from "next/cache";

export async function GET() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(getOverrides());
}

export async function PUT(request: Request) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: PortfolioOverrides = await request.json();

    // Validate structure
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Sanitize - only allow known keys
    const sanitized: PortfolioOverrides = {};
    if (body.personal && typeof body.personal === "object") {
      sanitized.personal = body.personal;
    }
    if (Array.isArray(body.experience)) {
      sanitized.experience = body.experience;
    }
    if (Array.isArray(body.projects)) {
      sanitized.projects = body.projects;
    }
    if (Array.isArray(body.skills)) {
      sanitized.skills = body.skills;
    }
    if (Array.isArray(body.leadership)) {
      sanitized.leadership = body.leadership.filter(
        (item): item is string => typeof item === "string"
      );
    }

    setOverrides(sanitized);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getResumeUrl, setResumeUrl } from "@/lib/store";
import { revalidatePath } from "next/cache";

export async function GET() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ url: getResumeUrl() });
}

export async function PUT(request: Request) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url } = await request.json();

    if (typeof url !== "string") {
      return NextResponse.json({ error: "URL must be a string" }, { status: 400 });
    }

    let finalUrl = url;
    // Automatically format Google Drive URLs to preview mode for iframe compatibility
    if (finalUrl.includes("drive.google.com/file/d/")) {
      finalUrl = finalUrl.replace(/\/view.*$/, "/preview");
    }

    // Basic URL validation if not empty
    if (finalUrl && !finalUrl.startsWith("http://") && !finalUrl.startsWith("https://") && !finalUrl.startsWith("/")) {
      return NextResponse.json(
        { error: "URL must start with http://, https://, or /" },
        { status: 400 }
      );
    }

    setResumeUrl(finalUrl);
    revalidatePath("/");
    return NextResponse.json({ success: true, url: finalUrl });
  } catch (err: any) {
    const errorMsg = err?.message || "Invalid request";
    // Check if it's a Vercel read-only filesystem error or missing directory error
    if (errorMsg.includes("EROFS") || errorMsg.includes("read-only") || errorMsg.includes("ENOENT")) {
      return NextResponse.json({ error: "Vercel's filesystem is read-only. Run the admin panel locally (npm run dev) to save changes." }, { status: 400 });
    }
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }
}

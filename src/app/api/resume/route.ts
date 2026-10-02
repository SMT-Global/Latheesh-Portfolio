import { NextResponse } from "next/server";
import { getResumeUrl } from "@/lib/store";

export async function GET() {
  const url = getResumeUrl();
  return NextResponse.json({ url });
}

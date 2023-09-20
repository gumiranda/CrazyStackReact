import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/routeDriver/add`, {
    method: "POST",
    headers: request?.headers,
    body: JSON.stringify(await request.json()),
  });
  return NextResponse.json(await response.json());
}

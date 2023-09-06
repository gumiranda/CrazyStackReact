import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const text = url.searchParams.get("text");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mapRoute/places?text=${text}`,
    { headers: request?.headers }
  );
  const responseJson = await response.json();
  return NextResponse.json(responseJson);
}

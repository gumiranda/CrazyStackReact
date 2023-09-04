import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const text = url.searchParams.get("text");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mapRoute/places?text=${text}`
  );
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/mapRoute/places?text=${text}`);
  const test = await response.json();
  console.log(test);
  return NextResponse.json(test);
}

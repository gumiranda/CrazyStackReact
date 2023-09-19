import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const originId = url.searchParams.get("originId");
  const destinationId = url.searchParams.get("destinationId");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mapRoute/directions?originId=${originId}&destinationId=${destinationId}`,

    {
      headers: request?.headers,
      next: {
        revalidate: 60, //cache bem grande, valor bem grande
      },
    }
  );
  return NextResponse.json(await response.json());
}

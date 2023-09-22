import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { routeId: string } }
) {
  const id = params.routeId;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mapRoute/load?_id=${id}`,
    { headers: request?.headers, next: { revalidate: 60 } }
  );
  return NextResponse.json(await response.json());
}

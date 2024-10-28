import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ routeId: string }> }
) {
  const params = await props.params;
  const id = params.routeId;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mapRoute/load?_id=${id}`,
    { headers: request?.headers, next: { revalidate: 60 } }
  );
  return NextResponse.json(await response.json());
}

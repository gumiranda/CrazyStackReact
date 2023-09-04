import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mapRoute/loadByPage?page=${page ?? 1}`,
    {
      next: {
        revalidate: 1, //cache bem grande, valor bem grande,
        tags: ["routes"], //revalidação de cache sob demanda
      },
    }
  );
  return NextResponse.json(await response.json());
}

export async function POST(request: Request) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mapRoute/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(await request.json()),
  });
  revalidateTag("routes");
  return NextResponse.json(await response.json());
}

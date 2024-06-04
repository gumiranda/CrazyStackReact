import { NextRequest, NextResponse } from "next/server";
import { parseJSON } from "./shared/libs";
import { calculateDaysToNextPayment } from "./shared/libs/utils/layoutPayAsync";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("belezixadmin.token");
  const user = request.cookies.get("belezixadmin.user");
  const pathname = request.nextUrl.pathname;
  const baseUrl = request.nextUrl.origin;
  if (token?.value && user?.value) {
    if (pathname.includes("pix")) {
      return NextResponse.next();
    }
    const parsedUser = parseJSON(user.value);
    if (!parsedUser?._id) {
      return handleLogout(baseUrl, request);
    }
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/load?_id=${parsedUser._id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        cache: "force-cache",
      }
    );
    if (!result.ok) {
      return handleLogout(baseUrl, request);
    }
    const data = await result.json();
    if (!data || Object.keys(data).length === 0) {
      return handleLogout(baseUrl, request);
    }
    const daysToNextCharge = calculateDaysToNextPayment(data?.payDay);
    if (daysToNextCharge < 0) {
      return NextResponse.redirect(`${baseUrl}/payment/pix`);
    }
    if (pathname === "/") {
      return NextResponse.redirect(`${baseUrl}/home`);
    }
    console.log({ daysToNextCharge });
    return NextResponse.next();
  }
  if (pathname !== "/" && pathname !== "/login" && pathname !== "/signup") {
    return NextResponse.redirect(`${baseUrl}/`);
  }
  return NextResponse.next();
}
function handleLogout(baseUrl: string, request: NextRequest) {
  const response = NextResponse.redirect(`${baseUrl}/`);
  const cookies = request.cookies.getAll();
  cookies.forEach((cookie) => {
    response.cookies.delete(cookie.name);
  });
  return response;
}
export const config = {
  matcher: ["/home/:path*", "/categorys/:path*", "/services/:path*"],
  unstable_allowDynamic: ["/node_modules/lodash.mergewith/**"],
};

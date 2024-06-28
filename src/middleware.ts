import { NextRequest, NextResponse } from "next/server";
import { parseJSON } from "./shared/libs";
import { calculateDaysToNextPayment } from "./shared/libs/utils/layoutPayAsync";

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("belezixadmin.token");
  const user = request.cookies.get("belezixadmin.user");
  const cache = request.cookies.get("belezixadmin.cache");
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

    let data;
    if (cache?.value) {
      data = parseJSON(cache.value);
    }

    if (!data || !data._id || data._id !== parsedUser._id) {
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

      data = await result.json();
      if (!data || Object.keys(data).length === 0) {
        return handleLogout(baseUrl, request);
      }

      const response = NextResponse.next();
      response.cookies.set("belezixadmin.cache", JSON.stringify(data), {
        maxAge: 86400, // 1 day in seconds
        path: "/",
      });
      const photo = data.photo;

      if (
        photo?.url?.length > 0 &&
        photo?._id &&
        new Date(photo?.expiresIn).getTime() > new Date().getTime()
      ) {
        response.cookies.set("belezixadmin.photo", JSON.stringify({ url: photo?.url }), {
          path: "/",
        });
      }
      const daysToNextCharge = calculateDaysToNextPayment(data.payDay);
      if (daysToNextCharge < 0) {
        return NextResponse.redirect(`${baseUrl}/payment/pix`);
      }

      if (pathname === "/") {
        return NextResponse.redirect(`${baseUrl}/home`);
      }

      return response;
    }

    const daysToNextCharge = calculateDaysToNextPayment(data.payDay);
    if (daysToNextCharge < 0) {
      return NextResponse.redirect(`${baseUrl}/payment/pix`);
    }

    if (pathname === "/") {
      return NextResponse.redirect(`${baseUrl}/home`);
    }

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
  matcher: [
    // "/login/:path*",
    // "/signup/:path*",
    "/home/:path*",
    "/categorys/:path*",
    "/services/:path*",
    "/appointments/:path*",
    "/requests/:path*",
    "/users/:path*",
    "/clients/:path*",
    "/mapRoutes/:path*",
    "/owners/:path*",
    "/routeDrivers/:path*",
    "/clients/:path*",
  ],
  unstable_allowDynamic: ["/node_modules/lodash.mergewith/**"],
};

import { NextRequest, NextResponse } from "next/server";
import { parseJSON } from "./shared/libs";
import { calculateDaysToNextPayment } from "./shared/libs/utils/layoutPayAsync";

export default async function middleware(request: NextRequest) {
  console.log("🚀 Middleware Start - Path:", request.nextUrl.pathname);

  const token = request.cookies.get("belezixadmin.token");
  const user = request.cookies.get("belezixadmin.user");
  const cache = request.cookies.get("belezixadmin.cache");
  const pathname = request.nextUrl.pathname;
  const baseUrl = request.nextUrl.origin;

  console.log("📍 Cookies:", {
    hasToken: !!token,
    hasUser: !!user,
    hasCache: !!cache,
  });

  if (token?.value && user?.value) {
    console.log("🔑 Token and User found");

    if (pathname.includes("pix")) {
      console.log("💰 PIX path detected, proceeding");
      return NextResponse.next();
    }
    const parsedUser = parseJSON(user.value);
    console.log("👤 Parsed User:", { userId: parsedUser?._id });

    if (!parsedUser?._id) {
      console.log("❌ Invalid user, logging out");
      return handleLogout(baseUrl, request);
    }

    let data: any;
    if (cache?.value) {
      data = parseJSON(cache.value);
      console.log("📦 Cache found:", { cacheUserId: data?._id });
    }

    if (!data || !data._id || data._id !== parsedUser._id) {
      console.log("🔄 Cache invalid or missing, fetching user data");
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
        console.log("❌ API request failed, logging out");
        return handleLogout(baseUrl, request);
      }

      data = await result.json();
      console.log("📥 API data received:", { hasData: !!data });

      if (!data || Object.keys(data).length === 0) {
        console.log("❌ Empty API response, logging out");
        return handleLogout(baseUrl, request);
      }

      const response = NextResponse.next();
      response.cookies.set("belezixadmin.cache", JSON.stringify(data), {
        maxAge: 86400,
        path: "/",
      });
      const photo = data.photo;

      console.log("🖼️ Photo check:", {
        hasPhoto: !!photo?.url,
        photoExpired: photo?.expiresIn
          ? new Date(photo.expiresIn).getTime() < new Date().getTime()
          : true,
      });

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
      console.log("💳 Payment check:", { daysToNextCharge });

      if (daysToNextCharge < 0) {
        console.log("💰 Payment required, redirecting to PIX");
        return NextResponse.redirect(`${baseUrl}/payment/pix`);
      }

      if (pathname === "/") {
        console.log("🏠 Root path, redirecting to home");
        return NextResponse.redirect(`${baseUrl}/home`);
      }

      return response;
    }

    const daysToNextCharge = calculateDaysToNextPayment(data.payDay);
    console.log("💳 Payment check (cached):", { daysToNextCharge });

    if (daysToNextCharge < 0) {
      console.log("💰 Payment required (cached), redirecting to PIX");
      return NextResponse.redirect(`${baseUrl}/payment/pix`);
    }

    if (pathname === "/") {
      console.log("🏠 Root path (cached), redirecting to home");
      return NextResponse.redirect(`${baseUrl}/home`);
    }

    return NextResponse.next();
  }

  console.log("🚫 No authentication, checking public routes");
  if (pathname !== "/" && pathname !== "/login" && pathname !== "/signup") {
    console.log("⛔ Protected route access attempt, redirecting to root");
    return NextResponse.redirect(`${baseUrl}/`);
  }

  console.log("✅ Public route access allowed");
  return NextResponse.next();
}

function handleLogout(baseUrl: string, request: NextRequest) {
  console.log("🔒 Handling logout");
  const response = NextResponse.redirect(`${baseUrl}/`);
  const cookies = request.cookies.getAll();
  cookies.forEach((cookie) => {
    console.log("🍪 Deleting cookie:", cookie.name);
    response.cookies.delete(cookie.name);
  });
  return response;
}

export const config = {
  matcher: [
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

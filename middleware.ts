import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas públicas (que não precisam de autenticação)
const publicRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/api/auth",
];

// Rotas protegidas
const protectedRoutes = [
  "/",
  "/devices",
  "/security",
  "/settings",
  "/api/devices",
  "/api/security",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifica se é uma rota pública
  const isPublicRoute = publicRoutes.some((route) => 
    pathname.startsWith(route)
  );

  // Verifica se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some((route) => 
    pathname.startsWith(route)
  );

  // Verifica se tem cookie de sessão
  const hasSessionCookie = request.cookies.has("next-auth.session-token") || 
                           request.cookies.has("next-auth.csrf-token");

  // Se é rota protegida e NÃO tem sessão
  if (isProtectedRoute && !hasSessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Se é rota de login e JÁ tem sessão
  if (pathname === "/login" && hasSessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configurar em quais rotas o middleware vai rodar
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
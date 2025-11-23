import {NextRequest, NextResponse} from "next/server";

export function proxy(req: NextRequest) {
    const url = new URL(req.url);

    if (
        !url.pathname.startsWith("/_next") &&
        !url.pathname.startsWith("/favicon") &&
        !url.pathname.startsWith("/robots.txt") &&
        !url.pathname.startsWith("/sitemap.xml") &&
        !url.pathname.match(/\.[a-zA-Z0-9]+$/) && // e.g. .png, .jpg, .css
        /[A-Z]/.test(url.pathname)
    ) {
        return NextResponse.redirect(new URL(url.pathname.toLowerCase(), url), 301);
    } else {
        return NextResponse.next();
    }
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: '/((?!api|trpc|_next|_vercel|_netlify|.*\\..*).*)'
};
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { startPersistence } from "@/lib/store";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dhanmondi Rooms — ধানমন্ডিতে বাসা, মেস ও সাবলেট" },
      {
        name: "description",
        content:
          "ধানমন্ডিতে বাসা, মেস, সাবলেট ও রুমমেট খুঁজুন। যাচাইকৃত লিস্টিং, সরাসরি হোস্টের সাথে যোগাযোগ, ব্রোকারেজ ছাড়াই বিজ্ঞাপন।",
      },
      { name: "theme-color", content: "#1f5bff" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  useEffect(() => {
    startPersistence();
  }, []);

  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
          <Toaster position="top-center" />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

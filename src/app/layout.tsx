import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit, Plus_Jakarta_Sans, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/shared/components/theme-provider";

const fontHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudentConnect",
  description: "Platform informasi akademik untuk mahasiswa, dosen, dan admin.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c9cf0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        fontSans.variable,
        fontMono.variable,
        fontHeading.variable,
      )}
    >
      <body className="min-h-full">
        <ThemeProvider>
          <div className="mx-auto flex min-h-dvh w-full max-w-160 flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

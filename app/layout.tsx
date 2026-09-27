import "./globals.css";
import { cookies } from "next/headers";
import Providers from "@/providers";
import Header from "@/components/Header";

export const metadata = {
  title: "Drug Candidates",
  description: "Drug candidate portfolio demo",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  return (
    <html lang="en">
      <body className="app-shell">
        <Providers>
          <Header authenticated={cookieStore.has("auth")} />
          {children}
        </Providers>
      </body>
    </html>
  );
}

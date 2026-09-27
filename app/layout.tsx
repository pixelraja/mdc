import "./globals.css";
import Providers from "@/providers";
import Header from "@/components/Header";

export const metadata = {
  title: "Drug Candidates",
  description: "Drug candidate portfolio demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-shell">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

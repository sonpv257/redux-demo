import type { Metadata } from "next";
import { AppProvider } from "@/provider/Appprovider";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

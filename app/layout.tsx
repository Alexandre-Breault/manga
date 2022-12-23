import DarkMode from "../src/components/DarkMode";
import "../styles/globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Providers>
          <div className="bg-white">
            <div>
              <DarkMode />
            </div>
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

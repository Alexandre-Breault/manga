import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-gray-900">
        <div className="container mx-auto">
          <div className="flex justify-center flex-col bg-gray-700">
            <h1 className="mb-4 text-center text-4xl md:text-5xl lg:text-6xl">
              Manga
            </h1>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

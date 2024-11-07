import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-blue-800 via-blue-700 to-blue-800">
        {children}
      </body>
    </html>
  );
}

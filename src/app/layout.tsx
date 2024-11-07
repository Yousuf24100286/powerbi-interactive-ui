import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-6xl w-full mx-auto p-3 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
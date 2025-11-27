import './globals.css';

export const metadata = {
  title: 'To-Do List App',
  description: 'Manage your daily tasks',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Removed Inter font, using default system sans-serif */}
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
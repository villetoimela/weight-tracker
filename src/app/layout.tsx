import './globals.css';

export const metadata = {
  title: 'Weight Tracker',
  description: 'Track your weight easily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

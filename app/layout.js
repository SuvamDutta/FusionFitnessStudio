import './globals.css';
import Link from 'next/link';
import { LayoutDashboard, Users, CreditCard, ShoppingBag, Settings } from 'lucide-react';
import { cookies } from 'next/headers';
import LogoutButton from './components/LogoutButton';

export const metadata = {
  title: 'Fusion Gym Management',
  description: 'Premium Gym Management System',
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('auth-token');

  return (
    <html lang="en">
      <body>
        <div className="layout-container">
          {isLoggedIn && (
            <aside className="sidebar">
              <div className="sidebar-logo">FUSION GYM</div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                <Link href="/" className="nav-link">
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
                <Link href="/members" className="nav-link">
                  <Users size={20} />
                  Members & Payments
                </Link>
                <Link href="/expenses" className="nav-link">
                  <CreditCard size={20} />
                  Expenses
                </Link>
                <Link href="/supplements" className="nav-link">
                  <ShoppingBag size={20} />
                  Supplements
                </Link>
              </nav>
              <LogoutButton />
            </aside>
          )}
          <main className="main-content" style={{ padding: isLoggedIn ? '2rem' : '0' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

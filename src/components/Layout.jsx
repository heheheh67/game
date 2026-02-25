import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, User, LogOut, Plus, Menu, X, Heart, ShoppingCart, Package } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
    updateCartCount();

    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const handleLogin = () => {
    base44.auth.redirectToLogin(window.location.href);
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  // Hide layout on business profile for cleaner look
  if (currentPageName === 'BusinessProfile') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <span className="font-bold text-xl text-gray-900 hidden sm:block">LocalLove</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to={createPageUrl('Home')}
                className={`text-sm font-medium transition-colors ${
                  currentPageName === 'Home' ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                Discover
              </Link>
              {user && (
                <Link
                  to={createPageUrl('MyBusiness')}
                  className={`text-sm font-medium transition-colors ${
                    currentPageName === 'MyBusiness'
                      ? 'text-emerald-600'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  My Dashboard
                </Link>
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {user && (
                <Link to={createPageUrl('Wishlist')}>
                  <Button variant="ghost" size="icon">
                    <Heart className="w-5 h-5" />
                  </Button>
                </Link>
              )}

              <Link to={createPageUrl('Cart')}>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500 text-white text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to={createPageUrl('AddBusiness')} className="hidden sm:block">
                <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Business
                </Button>
              </Link>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold"
                    >
                      {user.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="font-medium text-gray-900">{user.full_name || 'User'}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl('MyBusiness')} className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        My Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl('Orders')} className="cursor-pointer">
                        <Package className="w-4 h-4 mr-2" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl('Wishlist')} className="cursor-pointer">
                        <Heart className="w-4 h-4 mr-2" />
                        My Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={handleLogin} variant="outline" className="rounded-full">
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <button type="button" className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link
                to={createPageUrl('Home')}
                className="block py-2 text-gray-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="w-5 h-5 inline mr-2" />
                Discover
              </Link>
              {user && (
                <Link
                  to={createPageUrl('MyBusiness')}
                  className="block py-2 text-gray-700 hover:text-emerald-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5 inline mr-2" />
                  My Dashboard
                </Link>
              )}
              <Link
                to={createPageUrl('AddBusiness')}
                className="block py-2 text-gray-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Plus className="w-5 h-5 inline mr-2" />
                Add Business
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-white fill-current" />
            </div>
            <span className="font-bold text-gray-900">LocalLove</span>
          </div>
          <p className="text-gray-500 text-sm">Supporting local businesses, building stronger communities.</p>
        </div>
      </footer>
    </div>
  );
}

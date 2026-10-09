'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import MobileBottomBar from '@/components/MobileBottomBar';
import SearchModal from '@/components/SearchModal';

export default function SiteLayoutShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // If in admin panel, render standalone full-screen view without public header/footer/widgets
  if (isAdmin) {
    return (
      <div className="admin-standalone-root">
        {children}
      </div>
    );
  }

  // Public customer website layout
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <MobileBottomBar />
      <SearchModal />
    </>
  );
}

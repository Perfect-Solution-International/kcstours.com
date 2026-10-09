export const metadata = {
  title: 'KCSTours Admin CMS | Island Operations & Reservation Management',
  description: 'KCSTours Sri Lanka internal management portal for operations, bookings, fleet logistics, tour packages, and customer inquiries.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin-portal-wrapper">
      {children}
    </div>
  );
}

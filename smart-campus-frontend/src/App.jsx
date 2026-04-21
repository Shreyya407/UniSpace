import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login      from './pages/Login';
import Layout     from './components/Layout';
import Dashboard  from './pages/Dashboard';
import Resources  from './pages/Resources';
import MyBookings from './pages/MyBookings';
import AdminPanel from './pages/AdminPanel';
import Logs       from './pages/Logs';
import Profile    from './pages/Profile';

// ── Auth + role guard ─────────────────────────────────────────────────────
function ProtectedRoute({ children, pageTitle, adminOnly = false }) {
  const raw = localStorage.getItem('user');
  if (!raw) return <Navigate to="/login" replace />;

  const user = JSON.parse(raw);
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Layout pageTitle={pageTitle}>{children}</Layout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/"      element={<Navigate to="/dashboard" replace />} />

        {/* Shared (all authenticated users) */}
        <Route path="/dashboard" element={
          <ProtectedRoute pageTitle="Dashboard"><Dashboard /></ProtectedRoute>
        }/>

        <Route path="/profile" element={
          <ProtectedRoute pageTitle="Profile"><Profile /></ProtectedRoute>
        }/>

        {/* Student / Faculty only */}
        <Route path="/resources" element={
          <ProtectedRoute pageTitle="Resources"><Resources /></ProtectedRoute>
        }/>

        <Route path="/bookings" element={
          <ProtectedRoute pageTitle="My Bookings"><MyBookings /></ProtectedRoute>
        }/>

        {/* Admin only */}
        <Route path="/requests" element={
          <ProtectedRoute pageTitle="Booking Requests" adminOnly><AdminPanel /></ProtectedRoute>
        }/>

        <Route path="/logs" element={
          <ProtectedRoute pageTitle="System Logs" adminOnly><Logs /></ProtectedRoute>
        }/>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
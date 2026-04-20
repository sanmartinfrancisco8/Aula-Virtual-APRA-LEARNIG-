/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Courses } from './pages/Courses';
import { Users } from './pages/Users';
import { Files } from './pages/Files';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Grades } from './pages/Grades';
import { VirtualRoom } from './pages/VirtualRoom';
import { Announcements } from './pages/Announcements';
import { Syllabus } from './pages/Syllabus';
import { Messages } from './pages/Messages';

// Helper for protected routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        
        <Route path="/*" element={
          <ProtectedRoute>
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/syllabus" element={<Syllabus />} />
                <Route path="/grades" element={<Grades />} />
                <Route path="/virtual-room" element={<VirtualRoom />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/users" element={<Users />} />
                <Route path="/files" element={<Files />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

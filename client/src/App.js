import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Notification from './components/Notification';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './pages/Posts/PostDetail';
import CreatePost from './pages/Posts/CreatePost';
import EditPost from './pages/Posts/EditPost';
import PostList from './pages/Posts/PostList';
import Profile from './pages/Profile';

const App = () => {
  return (
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header />
              <Navigation />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/posts" element={<PostList />} />
                  <Route path="/posts/create" element={
                    <ProtectedRoute>
                      <CreatePost />
                    </ProtectedRoute>
                  } />
                  <Route path="/posts/:id" element={<PostDetail />} />
                  <Route path="/posts/:id/edit" element={
                    <ProtectedRoute>
                      <EditPost />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              <Footer />
              <Notification />
            </div>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
  );
};

export default App;
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import BareLayout from './BareLayout';
import AuthGuard from './AuthGuard';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import UploadPage from './UploadPage';
import MyImagesPage from './MyImagesPage';
import ProfilePage from './ProfilePage';
import RulesPage from './RulesPage';
import PrivacyPage from './PrivacyPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import HelpPage from './HelpPage';
import ImagePage from './ImagePage';
import NotFoundPage from './NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/anasayfa" replace />} />
        <Route path="/anasayfa" element={<HomePage />} />
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/kayit" element={<RegisterPage />} />
        <Route path="/sifremi-unuttum" element={<ForgotPasswordPage />} />
        <Route path="/yukle" element={<UploadPage />} />
        <Route
          path="/gorsellerim"
          element={
            <AuthGuard>
              <MyImagesPage />
            </AuthGuard>
          }
        />
        <Route
          path="/profil"
          element={
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          }
        />
        <Route path="/kurallar" element={<RulesPage />} />
        <Route path="/gizlilik" element={<PrivacyPage />} />
        <Route path="/hakkimizda" element={<AboutPage />} />
        <Route path="/iletisim" element={<ContactPage />} />
        <Route path="/yardim" element={<HelpPage />} />
      </Route>

      <Route element={<BareLayout />}>
        <Route path="/gorsel/:id" element={<ImagePage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { AppLayout } from "./components/layout/AppLayout";

// Páginas públicas
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

// Páginas protegidas
import { DashboardPage } from "./pages/DashboardPage";
import { ServiciosPage } from "./pages/ServiciosPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { CreateServicePage } from "./pages/CreateServicePage";
import { NotFoundPage } from "./pages/NotFoundPage";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas Públicas */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/servicios" element={<ServiciosPage />} />
              <Route path="/servicios/:id" element={<ServiceDetailPage />} />
              <Route
                path="/servicios/crear"
                element={<CreateServicePage />}
              />
              {/* TODO: Agregar más rutas según rol */}
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

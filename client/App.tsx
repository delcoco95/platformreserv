import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import ClientDashboard from "./pages/ClientDashboard";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import ProfessionalsList from "./pages/ProfessionalsList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TestData from "./pages/TestData";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/recherche" element={<SearchResults />} />
              <Route path="/professionnels" element={<ProfessionalsList />} />
              <Route
                path="/professionnel/:id"
                element={<ProfessionalProfile />}
              />
              <Route
                path="/espace-client"
                element={
                  <ProtectedRoute requiredUserType="client">
                    <ClientDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/espace-professionnel"
                element={
                  <ProtectedRoute requiredUserType="professionnel">
                    <ProfessionalDashboard />
                  </ProtectedRoute>
                }
              />
                            <Route path="/connexion" element={<Login />} />
              <Route path="/inscription" element={<Signup />} />
              <Route path="/test-data" element={<TestData />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

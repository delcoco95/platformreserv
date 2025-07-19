import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import ClientDashboard from "./pages/ClientDashboard";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/recherche" element={<SearchResults />} />
            <Route
              path="/professionnel/:id"
              element={<ProfessionalProfile />}
            />
            <Route path="/espace-client" element={<ClientDashboard />} />
            <Route path="/professionnels" element={<ProfessionalDashboard />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

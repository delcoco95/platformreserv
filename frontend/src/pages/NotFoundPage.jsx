import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">
            Page non trouvée
          </h2>
          <p className="text-gray-600 mt-2">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline inline-flex items-center gap-2 ml-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

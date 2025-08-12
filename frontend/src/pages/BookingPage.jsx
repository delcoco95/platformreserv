import { useParams } from 'react-router-dom';

const BookingPage = () => {
  const { serviceId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Réserver un service
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card p-8">
              <h2 className="text-xl font-semibold mb-6">Détails du service</h2>
              <p className="text-gray-600">Service ID: {serviceId}</p>
              <p className="text-gray-600 mt-4">
                Page de réservation en cours de développement...
              </p>
            </div>
            
            <div className="card p-8">
              <h2 className="text-xl font-semibold mb-6">Récapitulatif</h2>
              <p className="text-gray-600">
                Formulaire de réservation à venir avec :
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
                <li>Sélection de la date</li>
                <li>Choix du créneau</li>
                <li>Paiement sécurisé</li>
                <li>Confirmation par email</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

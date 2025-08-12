import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = [
    {
      id: 1,
      question: "Comment fonctionne BookAuto ?",
      answer: "BookAuto vous permet de rechercher des professionnels qualifiés, de consulter leurs services et tarifs, puis de réserver directement en ligne avec paiement sécurisé."
    },
    {
      id: 2,
      question: "Les professionnels sont-ils vérifiés ?",
      answer: "Oui, tous nos professionnels partenaires sont vérifiés. Nous contrôlons leurs qualifications, assurances et références avant de les accepter sur la plateforme."
    },
    {
      id: 3,
      question: "Comment puis-je annuler un rendez-vous ?",
      answer: "Vous pouvez annuler un rendez-vous depuis votre tableau de bord jusqu'à 24h avant la date prévue. Les conditions de remboursement dépendent du délai d'annulation."
    },
    {
      id: 4,
      question: "Le paiement est-il sécurisé ?",
      answer: "Absolument ! Nous utilisons Stripe pour tous les paiements, garantissant une sécurité bancaire maximale. Seule une avance de 25% est demandée à la réservation."
    },
    {
      id: 5,
      question: "Que faire en cas de problème avec un professionnel ?",
      answer: "Notre service client est disponible pour résoudre tout conflit. Vous pouvez nous contacter via votre tableau de bord ou par email."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h1>
            <p className="text-xl text-gray-600">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="card">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleItem(faq.id)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openItems.has(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {openItems.has(faq.id) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <button className="btn btn-primary">
              Contactez-nous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

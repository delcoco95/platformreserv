import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set())

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (openItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqData = [
    {
      category: "Questions générales",
      items: [
        {
          question: "Qu'est-ce que BOOKAUTO ?",
          answer: "BOOKAUTO est une plateforme en ligne qui met en relation les clients avec des professionnels qualifiés dans les domaines de l'automobile, la plomberie, la serrurerie et l'électricité."
        },
        {
          question: "Comment fonctionne la plateforme ?",
          answer: "Inscrivez-vous gratuitement, parcourez les profils des professionnels, consultez leurs services et tarifs, puis contactez-les directement pour organiser une intervention."
        },
        {
          question: "L'inscription est-elle gratuite ?",
          answer: "Oui, l'inscription est entièrement gratuite pour les clients. Les professionnels peuvent également s'inscrire gratuitement pour proposer leurs services."
        }
      ]
    },
    {
      category: "Pour les clients",
      items: [
        {
          question: "Comment réserver un service ?",
          answer: "Après inscription, parcourez la liste des professionnels, consultez leurs profils et services, puis utilisez les coordonnées fournies pour les contacter directement."
        },
        {
          question: "Comment annuler une réservation ?",
          answer: "Vous pouvez annuler une réservation depuis votre tableau de bord ou en contactant directement le professionnel. Les conditions d'annulation peuvent varier selon le professionnel."
        },
        {
          question: "Comment payer pour un service ?",
          answer: "Les modalités de paiement sont définies directement avec le professionnel. BOOKAUTO facilite la mise en relation mais n'intervient pas dans les transactions financières."
        },
        {
          question: "Que faire si j'ai un problème avec un professionnel ?",
          answer: "Contactez notre service client via la page Contact. Nous ferons de notre mieux pour résoudre le conflit et améliorer la qualité de service."
        }
      ]
    },
    {
      category: "Pour les professionnels",
      items: [
        {
          question: "Comment devenir professionnel partenaire ?",
          answer: "Créez un compte professionnel en fournissant vos informations d'entreprise, votre numéro SIRET, et une description de vos services. Votre profil sera ensuite visible aux clients."
        },
        {
          question: "Quels documents sont nécessaires pour l'inscription ?",
          answer: "Vous devez fournir votre numéro SIRET, l'adresse de votre entreprise, et une description détaillée de vos services et compétences."
        },
        {
          question: "Y a-t-il des frais pour les professionnels ?",
          answer: "L'inscription de base est gratuite. Des options premium peuvent être disponibles pour améliorer la visibilité de votre profil."
        },
        {
          question: "Comment gérer mes disponibilités ?",
          answer: "Depuis votre tableau de bord professionnel, vous pouvez définir vos créneaux de disponibilité, vos tarifs, et gérer vos réservations."
        }
      ]
    },
    {
      category: "Sécurité et qualité",
      items: [
        {
          question: "Comment BOOKAUTO vérifie-t-il les professionnels ?",
          answer: "Nous vérifions les informations d'entreprise fournies, notamment le numéro SIRET. Nous encourageons également les clients à laisser des avis pour maintenir la qualité du service."
        },
        {
          question: "Mes données personnelles sont-elles sécurisées ?",
          answer: "Oui, nous utilisons des protocoles de sécurité avancés pour protéger vos données. Consultez notre politique de confidentialité pour plus de détails."
        },
        {
          question: "Comment signaler un profil suspect ?",
          answer: "Utilisez la fonction de signalement disponible sur chaque profil professionnel ou contactez-nous directement via la page Contact."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Foire aux questions</h1>
          <p className="text-xl text-gray-600">
            Trouvez rapidement des réponses à vos questions
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">{section.category}</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {section.items.map((item, itemIndex) => {
                  const globalIndex = `${sectionIndex}-${itemIndex}`
                  const isOpen = openItems.has(globalIndex)
                  
                  return (
                    <div key={itemIndex}>
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900 pr-4">
                            {item.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </h2>
          <p className="text-gray-600 mb-6">
            Notre équipe support est là pour vous aider
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <HelpCircle className="h-5 w-5 mr-2" />
            Contactez-nous
          </a>
        </div>
      </div>
    </div>
  )
}

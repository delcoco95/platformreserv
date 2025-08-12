import { Scale, Building, Mail, Phone } from 'lucide-react'

export default function Legal() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Scale className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mentions légales</h1>
          <p className="text-xl text-gray-600">
            Informations légales de la plateforme BOOKAUTO
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Éditeur du site */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Building className="h-6 w-6 text-blue-600 mr-2" />
              Éditeur du site
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-2">
                <p><strong>Dénomination sociale :</strong> BOOKAUTO SAS</p>
                <p><strong>Forme juridique :</strong> Société par Actions Simplifiée</p>
                <p><strong>Capital social :</strong> 10 000 €</p>
                <p><strong>SIRET :</strong> 12345678901234</p>
                <p><strong>RCS :</strong> Paris B 123 456 789</p>
                <p><strong>TVA intracommunautaire :</strong> FR12345678901</p>
              </div>
            </div>
          </section>

          {/* Siège social */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Siège social</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p>123 rue de la République<br />
              75001 Paris<br />
              France</p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 mr-3" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-3" />
                <span>contact@bookauto.fr</span>
              </div>
            </div>
          </section>

          {/* Directeur de publication */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Directeur de publication</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p>Monsieur Jean DUPONT, Président de la société BOOKAUTO SAS</p>
            </div>
          </section>

          {/* Hébergement */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hébergement</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p><strong>Hébergeur :</strong> OVH SAS<br />
              2 rue Kellermann<br />
              59100 Roubaix<br />
              France<br />
              Téléphone : 09 72 10 10 07</p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Propriété intellectuelle</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
                les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est 
                formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </div>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation de responsabilité</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                BOOKAUTO s'efforce de fournir sur le site www.bookauto.fr des informations aussi précises que possible. 
                Toutefois, il ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans 
                la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
              </p>
              <p>
                BOOKAUTO agit en tant qu'intermédiaire entre les clients et les professionnels. La société n'est pas 
                responsable de la qualité des prestations fournies par les professionnels partenaires.
              </p>
            </div>
          </section>

          {/* Protection des données */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Protection des données personnelles</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée en 2004 et au 
                Règlement Général sur la Protection des Données (RGPD), vous bénéficiez d'un droit d'accès et 
                de rectification aux informations qui vous concernent.
              </p>
              <p>
                Pour exercer ce droit, vous pouvez vous adresser à BOOKAUTO SAS - 123 rue de la République, 
                75001 Paris ou par email à : privacy@bookauto.fr
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                Le site www.bookauto.fr utilise des cookies pour améliorer l'expérience utilisateur et réaliser 
                des statistiques de fréquentation. En continuant votre navigation sur ce site, vous acceptez 
                l'utilisation de cookies.
              </p>
              <p>
                Vous pouvez paramétrer votre navigateur pour refuser les cookies. Cependant, certaines 
                fonctionnalités du site pourraient ne pas fonctionner correctement.
              </p>
            </div>
          </section>

          {/* Loi applicable */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Loi applicable</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                Les présentes mentions légales sont régies par le droit français. En cas de litige, 
                les tribunaux français seront seuls compétents.
              </p>
            </div>
          </section>

          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

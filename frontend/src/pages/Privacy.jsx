import { Shield, Eye, Lock, Users, FileText } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique de confidentialité</h1>
          <p className="text-xl text-gray-600">
            Comment nous protégeons et utilisons vos données personnelles
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-6 w-6 text-blue-600 mr-2" />
              Introduction
            </h2>
            <div className="prose prose-gray max-w-none">
              <p>
                La présente politique de confidentialité décrit comment BOOKAUTO SAS ("nous", "notre" ou "nos") 
                collecte, utilise et protège vos informations personnelles lorsque vous utilisez notre plateforme.
              </p>
              <p>
                Nous nous engageons à protéger votre vie privée et à respecter le Règlement Général sur la 
                Protection des Données (RGPD) et la loi française "Informatique et libertés".
              </p>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-6 w-6 text-blue-600 mr-2" />
              Données que nous collectons
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations de compte</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Nom et prénom</li>
                  <li>• Adresse email</li>
                  <li>• Mot de passe (chiffré)</li>
                  <li>• Numéro de téléphone (optionnel)</li>
                  <li>• Adresse postale</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations professionnelles (pour les professionnels)</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Nom de l'entreprise</li>
                  <li>• Numéro SIRET</li>
                  <li>• Adresse de l'entreprise</li>
                  <li>• Spécialité professionnelle</li>
                  <li>• Description des services</li>
                  <li>• Photos de réalisations (optionnelles)</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Données d'utilisation</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• Historique de navigation sur la plateforme</li>
                  <li>• Réservations et communications</li>
                  <li>• Avis et évaluations</li>
                  <li>• Données techniques (adresse IP, navigateur, etc.)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Utilisation des données */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              Comment nous utilisons vos données
            </h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900">Fourniture du service</h3>
                <p className="text-gray-600">
                  Création et gestion de votre compte, mise en relation avec les professionnels, 
                  traitement des réservations et communications.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900">Amélioration de la plateforme</h3>
                <p className="text-gray-600">
                  Analyse des performances, développement de nouvelles fonctionnalités, 
                  personnalisation de l'expérience utilisateur.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900">Communication</h3>
                <p className="text-gray-600">
                  Envoi de notifications importantes, support client, newsletter (avec votre consentement).
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">Sécurité et conformité</h3>
                <p className="text-gray-600">
                  Prévention de la fraude, respect des obligations légales, protection de la plateforme.
                </p>
              </div>
            </div>
          </section>

          {/* Partage des données */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Partage de vos données</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                Nous ne vendons jamais vos données personnelles. Nous ne les partageons que dans les cas suivants :
              </p>
              <ul>
                <li><strong>Avec les professionnels</strong> : Vos coordonnées sont partagées uniquement lors d'une demande de contact ou réservation</li>
                <li><strong>Prestataires techniques</strong> : Hébergement, analyse, support client (sous contrat de confidentialité)</li>
                <li><strong>Obligations légales</strong> : Si requis par la loi ou les autorités compétentes</li>
                <li><strong>Protection des droits</strong> : Pour protéger nos droits, notre propriété ou la sécurité des utilisateurs</li>
              </ul>
            </div>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Lock className="h-6 w-6 text-blue-600 mr-2" />
              Sécurité de vos données
            </h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="prose prose-gray max-w-none">
                <p>
                  Nous mettons en place des mesures de sécurité appropriées pour protéger vos données :
                </p>
                <ul>
                  <li>Chiffrement des données sensibles (mots de passe, communications)</li>
                  <li>Accès restreint aux données personnelles</li>
                  <li>Surveillance et détection des intrusions</li>
                  <li>Sauvegardes régulières et sécurisées</li>
                  <li>Formation du personnel à la protection des données</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vos droits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Droit d'accès</h3>
                  <p className="text-sm text-gray-600">Obtenir une copie de vos données personnelles</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Droit de rectification</h3>
                  <p className="text-sm text-gray-600">Corriger les données inexactes ou incomplètes</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Droit à l'effacement</h3>
                  <p className="text-sm text-gray-600">Demander la suppression de vos données</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Droit à la portabilité</h3>
                  <p className="text-sm text-gray-600">Récupérer vos données dans un format structuré</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Droit d'opposition</h3>
                  <p className="text-sm text-gray-600">Vous opposer au traitement de vos données</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Droit de limitation</h3>
                  <p className="text-sm text-gray-600">Limiter le traitement de vos données</p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies et technologies similaires</h2>
            <div className="prose prose-gray max-w-none">
              <p>
                Nous utilisons des cookies et technologies similaires pour :
              </p>
              <ul>
                <li><strong>Cookies essentiels</strong> : Nécessaires au fonctionnement de la plateforme</li>
                <li><strong>Cookies de performance</strong> : Analyse de l'utilisation pour améliorer le service</li>
                <li><strong>Cookies de préférences</strong> : Mémorisation de vos choix et paramètres</li>
              </ul>
              <p>
                Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </div>
          </section>

          {/* Conservation */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conservation des données</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                Nous conservons vos données personnelles uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées :
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Comptes actifs</strong> : Tant que votre compte existe</li>
                <li>• <strong>Données de facturation</strong> : 10 ans (obligation légale)</li>
                <li>• <strong>Logs de sécurité</strong> : 1 an maximum</li>
                <li>• <strong>Données marketing</strong> : 3 ans après le dernier contact</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                Pour exercer vos droits ou pour toute question concernant cette politique de confidentialité, 
                vous pouvez nous contacter :
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email :</strong> privacy@bookauto.fr</p>
                <p><strong>Courrier :</strong> BOOKAUTO SAS - DPO, 123 rue de la République, 75001 Paris</p>
                <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
              </div>
            </div>
          </section>

          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-200">
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            <p className="mt-2">
              Si vous n'êtes pas satisfait de notre réponse, vous pouvez contacter la CNIL : 
              <a href="https://www.cnil.fr" className="text-blue-600 hover:underline ml-1">www.cnil.fr</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

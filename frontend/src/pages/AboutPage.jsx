const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              À propos de BookAuto
            </h1>
            <p className="text-xl text-gray-600">
              La plateforme qui révolutionne la prise de rendez-vous
            </p>
          </div>

          <div className="prose prose-lg mx-auto">
            <p>
              BookAuto est née d'un constat simple : il est souvent difficile de trouver 
              le bon professionnel au bon moment. Notre mission est de simplifier cette recherche 
              et de faciliter la prise de rendez-vous.
            </p>

            <h2>Notre mission</h2>
            <p>
              Nous connectons les particuliers avec des professionnels qualifiés dans de nombreux 
              domaines : automobile, plomberie, beauté, et bien plus encore.
            </p>

            <h2>Nos valeurs</h2>
            <ul>
              <li><strong>Qualité</strong> : Tous nos professionnels sont vérifiés</li>
              <li><strong>Simplicité</strong> : Une expérience utilisateur intuitive</li>
              <li><strong>Confiance</strong> : Paiement sécurisé et garanties</li>
              <li><strong>Innovation</strong> : Toujours à la pointe de la technologie</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

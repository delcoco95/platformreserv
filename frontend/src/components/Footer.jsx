function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">RendezVousPro</h3>
            <p className="text-gray-300">
              La plateforme simple et efficace pour prendre rendez-vous avec des professionnels.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Automobile</li>
              <li>Plomberie</li>
              <li>Serrurerie</li>
              <li>Et bien plus...</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Centre d'aide</li>
              <li>Contact</li>
              <li>Conditions d'utilisation</li>
              <li>Politique de confidentialité</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 RendezVousPro. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

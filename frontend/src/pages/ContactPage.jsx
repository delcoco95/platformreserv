const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-gray-600">
              Une question ? Nous sommes là pour vous aider
            </p>
          </div>

          <div className="card p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Prénom</label>
                  <input type="text" className="input" placeholder="Jean" />
                </div>
                <div>
                  <label className="label">Nom</label>
                  <input type="text" className="input" placeholder="Dupont" />
                </div>
              </div>
              
              <div>
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="votre@email.com" />
              </div>
              
              <div>
                <label className="label">Sujet</label>
                <select className="input">
                  <option>Question générale</option>
                  <option>Problème technique</option>
                  <option>Devenir partenaire</option>
                  <option>Autre</option>
                </select>
              </div>
              
              <div>
                <label className="label">Message</label>
                <textarea
                  className="input min-h-[120px]"
                  placeholder="Votre message..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary w-full">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

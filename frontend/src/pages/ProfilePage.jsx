import { useAuth } from '@contexts/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon profil</h1>
          
          <div className="card p-8">
            <div className="space-y-6">
              <div>
                <label className="label">Prénom</label>
                <input 
                  type="text" 
                  className="input" 
                  value={user?.firstName || ''} 
                  readOnly 
                />
              </div>
              
              <div>
                <label className="label">Nom</label>
                <input 
                  type="text" 
                  className="input" 
                  value={user?.lastName || ''} 
                  readOnly 
                />
              </div>
              
              <div>
                <label className="label">Email</label>
                <input 
                  type="email" 
                  className="input" 
                  value={user?.email || ''} 
                  readOnly 
                />
              </div>
              
              <div>
                <label className="label">Type de compte</label>
                <input 
                  type="text" 
                  className="input" 
                  value={user?.userType === 'client' ? 'Client' : 'Professionnel'} 
                  readOnly 
                />
              </div>
              
              <button className="btn btn-primary">
                Modifier le profil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

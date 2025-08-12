import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, Phone, Building, ArrowRight } from 'lucide-react';
import { useAuth } from '@contexts/AuthContext';
import LoadingSpinner from '@components/LoadingSpinner';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const defaultUserType = searchParams.get('type') || 'client';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      userType: defaultUserType,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      // Champs professionnels
      companyName: '',
      profession: 'automobile'
    }
  });

  const userType = watch('userType');
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      clearError();
      
      // Préparer les données
      const userData = {
        email: data.email,
        password: data.password,
        userType: data.userType,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone
      };

      // Ajouter les informations business pour les professionnels
      if (data.userType === 'professionnel') {
        userData.businessInfo = {
          companyName: data.companyName,
          profession: data.profession
        };
      }

      await registerUser(userData);
      navigate('/dashboard');
    } catch (error) {
      // L'erreur est gérée par le contexte
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">RP</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Créer un compte
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Rejoignez la communauté BookAuto
          </p>
        </div>

        {/* Formulaire */}
        <div className="card p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Type d'utilisateur */}
            <div>
              <label className="label">Type de compte</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  userType === 'client' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    {...register('userType')}
                    type="radio"
                    value="client"
                    className="sr-only"
                  />
                  <User className="w-5 h-5 mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Client</div>
                    <div className="text-xs text-gray-500">Je cherche des services</div>
                  </div>
                </label>
                <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  userType === 'professionnel' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    {...register('userType')}
                    type="radio"
                    value="professionnel"
                    className="sr-only"
                  />
                  <Building className="w-5 h-5 mr-3 text-blue-600" />
                  <div>
                    <div className="font-medium">Professionnel</div>
                    <div className="text-xs text-gray-500">Je propose des services</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Prénom</label>
                <input
                  {...register('firstName', {
                    required: 'Le prénom est requis',
                    minLength: {
                      value: 2,
                      message: 'Minimum 2 caractères'
                    }
                  })}
                  type="text"
                  className={`input ${errors.firstName ? 'input-error' : ''}`}
                  placeholder="Jean"
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="label">Nom</label>
                <input
                  {...register('lastName', {
                    required: 'Le nom est requis',
                    minLength: {
                      value: 2,
                      message: 'Minimum 2 caractères'
                    }
                  })}
                  type="text"
                  className={`input ${errors.lastName ? 'input-error' : ''}`}
                  placeholder="Dupont"
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="label">Adresse email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('email', {
                    required: 'L\'email est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Adresse email invalide'
                    }
                  })}
                  type="email"
                  className={`input pl-12 ${errors.email ? 'input-error' : ''}`}
                  placeholder="votre@email.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <label className="label">Téléphone (optionnel)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('phone', {
                    pattern: {
                      value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
                      message: 'Numéro de téléphone invalide'
                    }
                  })}
                  type="tel"
                  className={`input pl-12 ${errors.phone ? 'input-error' : ''}`}
                  placeholder="06 12 34 56 78"
                  autoComplete="tel"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* Champs spécifiques aux professionnels */}
            {userType === 'professionnel' && (
              <>
                <div>
                  <label className="label">Nom de l'entreprise</label>
                  <input
                    {...register('companyName', {
                      required: userType === 'professionnel' ? 'Le nom de l\'entreprise est requis' : false
                    })}
                    type="text"
                    className={`input ${errors.companyName ? 'input-error' : ''}`}
                    placeholder="Ma Super Entreprise"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="label">Secteur d'activité</label>
                  <select
                    {...register('profession')}
                    className="input"
                  >
                    <option value="automobile">Automobile</option>
                    <option value="plomberie">Plomberie</option>
                    <option value="serrurerie">Serrurerie</option>
                    <option value="electricite">Électricité</option>
                    <option value="jardinage">Jardinage</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </>
            )}

            {/* Mots de passe */}
            <div>
              <label className="label">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('password', {
                    required: 'Le mot de passe est requis',
                    minLength: {
                      value: 6,
                      message: 'Le mot de passe doit contenir au moins 6 caractères'
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className={`input pl-12 pr-12 ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="label">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('confirmPassword', {
                    required: 'Veuillez confirmer votre mot de passe',
                    validate: value => 
                      value === password || 'Les mots de passe ne correspondent pas'
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`input pl-12 pr-12 ${errors.confirmPassword ? 'input-error' : ''}`}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Conditions */}
            <div className="flex items-start">
              <input
                {...register('acceptTerms', {
                  required: 'Vous devez accepter les conditions d\'utilisation'
                })}
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
              />
              <label className="ml-2 text-sm text-gray-700">
                J'accepte les{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                  politique de confidentialité
                </Link>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
            )}

            {/* Erreur globale */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Bouton d'inscription */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="btn btn-primary w-full py-3 text-base font-semibold group"
            >
              {(isSubmitting || loading) ? (
                <LoadingSpinner size="sm" text="" />
              ) : (
                <>
                  Créer mon compte
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Lien vers connexion */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Déjà un compte ?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

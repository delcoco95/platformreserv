import { useAuth } from '../contexts/AuthContext'
import ProfessionalDashboard from './ProfessionalDashboard'
import ClientDashboard from './ClientDashboard'

const Dashboard = () => {
  const { user } = useAuth()

  // Rediriger vers le bon dashboard selon le type d'utilisateur
  if (user?.userType === 'professionnel') {
    return <ProfessionalDashboard />
  } else {
    return <ClientDashboard />
  }
}

export default Dashboard

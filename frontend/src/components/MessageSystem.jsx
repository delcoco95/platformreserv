import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Send, User, Phone, Mail } from 'lucide-react'

const MessageSystem = ({ conversationId, recipientInfo, onClose }) => {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadMessages()
  }, [conversationId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const loadMessages = async () => {
    try {
      // Simulation de messages - dans un vrai cas, on ferait un appel API
      setMessages([
        {
          id: 1,
          senderId: recipientInfo.id,
          senderName: recipientInfo.name,
          content: 'Bonjour, merci pour votre demande de réservation. Je peux vous proposer plusieurs créneaux.',
          timestamp: '2024-01-14 14:30',
          isFromMe: false
        },
        {
          id: 2,
          senderId: user.id,
          senderName: `${user.firstName} ${user.lastName}`,
          content: 'Parfait ! Quels créneaux avez-vous de disponible la semaine prochaine ?',
          timestamp: '2024-01-14 14:35',
          isFromMe: true
        },
        {
          id: 3,
          senderId: recipientInfo.id,
          senderName: recipientInfo.name,
          content: 'Je peux vous proposer mardi 16 janvier à 14h ou mercredi 17 janvier à 10h30. Ces créneaux vous conviennent-ils ?',
          timestamp: '2024-01-14 14:40',
          isFromMe: false
        }
      ])
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setLoading(true)
    try {
      const message = {
        id: Date.now(),
        senderId: user.id,
        senderName: `${user.firstName} ${user.lastName}`,
        content: newMessage.trim(),
        timestamp: new Date().toLocaleString(),
        isFromMe: true
      }

      setMessages([...messages, message])
      setNewMessage('')

      // Dans un vrai cas, on enverrait le message via l'API
      // await messageService.sendMessage(conversationId, newMessage)
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hier"
    } else {
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long' 
      })
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{recipientInfo.name}</h3>
            {recipientInfo.profession && (
              <p className="text-sm text-gray-500 capitalize">{recipientInfo.profession}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {recipientInfo.phone && (
            <a 
              href={`tel:${recipientInfo.phone}`}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Appeler"
            >
              <Phone className="h-4 w-4" />
            </a>
          )}
          {recipientInfo.email && (
            <a 
              href={`mailto:${recipientInfo.email}`}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Envoyer un email"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const showDate = index === 0 || 
            formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp)
          
          return (
            <div key={message.id}>
              {/* Separator de date */}
              {showDate && (
                <div className="flex justify-center mb-4">
                  <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}
              
              {/* Message */}
              <div className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isFromMe
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.isFromMe ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input de nouveau message */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={sendMessage} className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default MessageSystem

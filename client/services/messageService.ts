import api from "../lib/api";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
  conversationId: string;
}

interface Conversation {
  conversationId: string;
  lastMessage: {
    content: string;
    createdAt: string;
    senderId: string;
  };
  unreadCount: number;
  otherUser: {
    _id: string;
    email: string;
    userType: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
  };
}

class MessageService {
  // Envoyer un message
  async sendMessage(receiverId: string, content: string): Promise<Message> {
    return await api.post<Message>("/messages", {
      receiverId,
      content,
    });
  }

  // Récupérer les conversations
  async getConversations(): Promise<Conversation[]> {
    return await api.get<Conversation[]>("/messages/conversations");
  }

  // Récupérer les messages d'une conversation
  async getMessages(otherUserId: string): Promise<Message[]> {
    return await api.get<Message[]>(`/messages/${otherUserId}`);
  }

  // Marquer les messages comme lus
  async markAsRead(otherUserId: string): Promise<void> {
    await api.put(`/messages/${otherUserId}/read`, {});
  }

  // Listener pour les changements de conversations (polling simple)
  onConversationsChange(callback: (conversations: Conversation[]) => void): () => void {
    let intervalId: NodeJS.Timeout;

    const fetchConversations = async () => {
      try {
        const conversations = await this.getConversations();
        callback(conversations);
      } catch (error) {
        console.error("Erreur lors de la récupération des conversations:", error);
      }
    };

    // Récupération initiale
    fetchConversations();

    // Polling toutes les 5 secondes
    intervalId = setInterval(fetchConversations, 5000);

    // Fonction de nettoyage
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }

  // Listener pour les changements de messages (polling simple)
  onMessagesChange(otherUserId: string, callback: (messages: Message[]) => void): () => void {
    let intervalId: NodeJS.Timeout;

    const fetchMessages = async () => {
      try {
        const messages = await this.getMessages(otherUserId);
        callback(messages);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages:", error);
      }
    };

    // Récupération initiale
    fetchMessages();

    // Polling toutes les 2 secondes
    intervalId = setInterval(fetchMessages, 2000);

    // Fonction de nettoyage
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }
}

export const messageService = new MessageService();
export type { Message, Conversation };

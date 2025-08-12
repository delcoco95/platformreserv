import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Send, MessageCircle } from "lucide-react";
import {
  messageService,
  Message,
  Conversation,
} from "../../services/messageService";
import { useAuth } from "../../contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface ChatWindowProps {
  conversation: Conversation;
}

export const ChatWindow = ({ conversation }: ChatWindowProps) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!conversation) return;

    const unsubscribe = messageService.onMessagesChange(
      conversation.otherUser._id,
      (data) => {
        setMessages(data);
        setLoading(false);
        scrollToBottom();

        // Marquer les messages comme lus
        messageService.markAsRead(conversation.otherUser._id);
      },
    );

    return () => unsubscribe();
  }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      await messageService.sendMessage(
        conversation.otherUser._id,
        newMessage.trim(),
      );
      setNewMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
    } finally {
      setSending(false);
    }
  };

  const getUserDisplayName = (user: any) => {
    if (user.userType === "client") {
      return (
        `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
      );
    }
    return user.companyName || user.email;
  };

  const getUserInitials = (user: any) => {
    if (user.userType === "client") {
      return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}` || "C";
    }
    return user.companyName?.[0] || "P";
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center space-y-2">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm text-muted-foreground">
                Chargement des messages...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10">
              {getUserInitials(conversation.otherUser)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              {getUserDisplayName(conversation.otherUser)}
            </CardTitle>
            <CardDescription>
              {conversation.otherUser.userType === "client"
                ? "Client"
                : "Professionnel"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto space-y-4 mb-4"
          style={{ maxHeight: "400px" }}
        >
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Début de conversation
              </h3>
              <p className="text-muted-foreground text-sm">
                Envoyez votre premier message pour commencer la conversation
              </p>
            </div>
          ) : (
            messages.map((message) => {
              const isOwnMessage = message.senderId === currentUser?.uid;

              return (
                <div
                  key={message.id}
                  className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-3 py-2 ${
                      isOwnMessage
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isOwnMessage
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {formatDistanceToNow(new Date(message.createdAt), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input pour nouveau message */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tapez votre message..."
            disabled={sending}
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim() || sending}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

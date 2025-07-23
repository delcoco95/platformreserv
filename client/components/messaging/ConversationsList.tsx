import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MessageCircle, User, Building } from "lucide-react";
import { messageService, Conversation } from "../../services/messageService";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface ConversationsListProps {
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
}

export const ConversationsList = ({
  onSelectConversation,
  selectedConversationId,
}: ConversationsListProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = messageService.onConversationsChange((data) => {
      setConversations(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
      <Card>
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center space-y-2">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm text-muted-foreground">Chargement...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Conversations
        </CardTitle>
        <CardDescription>
          Vos échanges avec les {conversations.length > 0 ? "utilisateurs" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {conversations.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune conversation</h3>
            <p className="text-muted-foreground text-sm">
              Vos conversations apparaîtront ici une fois que vous commencerez à
              échanger
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {conversations.map((conversation) => (
              <Button
                key={conversation.conversationId}
                variant={
                  selectedConversationId === conversation.conversationId
                    ? "secondary"
                    : "ghost"
                }
                className="w-full justify-start h-auto p-3"
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10">
                        {getUserInitials(conversation.otherUser)}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.otherUser.userType === "professionnel" && (
                      <Building className="absolute -bottom-1 -right-1 h-4 w-4 bg-background rounded-full p-0.5" />
                    )}
                  </div>

                  <div className="flex-1 text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">
                        {getUserDisplayName(conversation.otherUser)}
                      </h4>
                      {conversation.unreadCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="h-5 w-5 p-0 text-xs"
                        >
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {conversation.lastMessage.content}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(
                          new Date(conversation.lastMessage.createdAt),
                          {
                            addSuffix: true,
                            locale: fr,
                          },
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

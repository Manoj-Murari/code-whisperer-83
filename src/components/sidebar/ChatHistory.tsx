import { motion } from 'framer-motion';
import { MessageSquare, Plus } from 'lucide-react';
import { useChatStore } from '@/hooks/useChatStore';
import { Button } from '@/components/ui/button';
import { agentPersonas } from '@/lib/dummy-data';

export function ChatHistory() {
  const { conversations, currentConversationId, loadConversation, createNewConversation } =
    useChatStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Conversations
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={createNewConversation}
          className="h-6 w-6 hover:bg-primary/10"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-1">
        {conversations.map((conv) => {
          const isActive = conv.id === currentConversationId;
          const persona = agentPersonas.find((p) => p.id === conv.personaId);

          return (
            <motion.button
              key={conv.id}
              onClick={() => loadConversation(conv.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left p-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary/10 border border-primary/50'
                  : 'bg-muted/20 border border-transparent hover:bg-muted/40 hover:border-primary/20'
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare
                  className={`flex-shrink-0 h-4 w-4 mt-0.5 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">{conv.title}</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    {persona && <span className="text-xs">{persona.icon}</span>}
                    <span className="text-xs text-muted-foreground">
                      {new Date(conv.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

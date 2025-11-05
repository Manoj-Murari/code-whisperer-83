import { motion } from 'framer-motion';
import { MessageSquare, Plus } from 'lucide-react';
import { useChatStore } from '@/hooks/useChatStore';
import { Button } from '@/components/ui/button';
import { agentPersonas } from '@/lib/dummy-data';

export function ChatHistory() {
  const { conversations, currentConversationId, loadConversation, createNewConversation } =
    useChatStore();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-medium text-muted-foreground tracking-wide">
          History
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={createNewConversation}
          className="h-6 w-6 hover:bg-muted"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="space-y-0.5">
        {conversations.map((conv) => {
          const isActive = conv.id === currentConversationId;
          const persona = agentPersonas.find((p) => p.id === conv.personaId);

          return (
            <motion.button
              key={conv.id}
              onClick={() => loadConversation(conv.id)}
              whileHover={{ backgroundColor: 'hsl(0 0% 96%)' }}
              whileTap={{ scale: 0.98 }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-muted'
                  : 'hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start gap-2">
                <MessageSquare
                  className={`flex-shrink-0 h-3.5 w-3.5 mt-0.5 ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-foreground truncate">{conv.title}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
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

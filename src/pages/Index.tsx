import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LeftSidebar } from '@/components/sidebar/LeftSidebar';
import { ContextPanel } from '@/components/context/ContextPanel';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { ThinkingIndicator } from '@/components/chat/ThinkingIndicator';
import { ChatInput } from '@/components/chat/ChatInput';
import { useChatStore } from '@/hooks/useChatStore';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { currentMessages, selectedPersona } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-b border-border/50 bg-background/95 backdrop-blur-lg p-4"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedPersona.gradient} flex items-center justify-center text-sm shadow-lg`}
              >
                {selectedPersona.icon}
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">{selectedPersona.name}</h2>
                <p className="text-xs text-muted-foreground">{selectedPersona.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Clear Chat
            </Button>
          </div>
        </motion.div>

        {/* Messages Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 py-6"
          style={{
            background: 'radial-gradient(circle at 50% 0%, hsl(189 100% 50% / 0.05), transparent 70%)',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {currentMessages.map((message, index) => (
                <MessageBubble key={message.id} message={message} index={index} />
              ))}
            </AnimatePresence>

            <ThinkingIndicator />

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Scroll to Bottom Button */}
        <AnimatePresence>
          {currentMessages.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-24 right-8"
            >
              <Button
                onClick={scrollToBottom}
                size="icon"
                className="rounded-full shadow-lg shadow-primary/30 bg-primary/20 backdrop-blur-md border border-primary/50 hover:bg-primary/30"
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <ChatInput />
      </div>

      {/* Right Context Panel */}
      <ContextPanel />
    </div>
  );
};

export default Index;

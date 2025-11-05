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
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="border-b border-border bg-background px-8 py-5"
        >
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center text-base">
                {selectedPersona.icon}
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground tracking-tight">{selectedPersona.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedPersona.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted">
              Clear Chat
            </Button>
          </div>
        </motion.div>

        {/* Messages Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-8 py-8"
        >
          <div className="max-w-3xl mx-auto">
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="absolute bottom-24 right-8"
            >
              <Button
                onClick={scrollToBottom}
                size="icon"
                className="rounded-full shadow-sm bg-muted border border-border hover:bg-muted/80"
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

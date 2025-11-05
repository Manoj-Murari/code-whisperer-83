import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatStore } from '@/hooks/useChatStore';
import { motion } from 'framer-motion';

export function ChatInput() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage, startAgentThinking, stopAgentThinking, isAgentThinking } = useChatStore();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isAgentThinking) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    addMessage({
      role: 'user',
      content: userMessage,
    });

    // Simulate agent thinking
    setTimeout(() => {
      startAgentThinking([
        'Processing your request...',
        'Analyzing context...',
        'Generating response...',
      ]);

      // Simulate agent response after 2 seconds
      setTimeout(() => {
        stopAgentThinking();
        addMessage({
          role: 'agent',
          content: `I understand you want to: "${userMessage}"\n\nThis is a demo interface. In the production version, I would:\n- Connect to the actual AI agent backend\n- Process your request using the selected persona\n- Return real analysis, code, or test results\n\nFor now, I'm showing you the beautiful UI that will power these interactions! 🚀`,
        });
      }, 2000);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border/50 bg-background/95 backdrop-blur-lg p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Codex to analyze a repo, write tests, fix a bug..."
              className="min-h-[52px] max-h-[120px] resize-none rounded-xl bg-muted/50 border-primary/20 focus:border-primary/50 transition-colors pr-12"
              disabled={isAgentThinking}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
              disabled={isAgentThinking}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isAgentThinking}
              className="h-[52px] px-6 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
            >
              <Send className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <div className="mt-2 text-xs text-muted-foreground text-center">
          <kbd className="px-1.5 py-0.5 rounded bg-muted/50 border border-border/50">⌘ + Enter</kbd> to
          send
        </div>
      </div>
    </div>
  );
}

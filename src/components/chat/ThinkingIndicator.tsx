import { motion } from 'framer-motion';
import { useChatStore } from '@/hooks/useChatStore';

export function ThinkingIndicator() {
  const { isAgentThinking, thinkingSteps, selectedPersona } = useChatStore();

  if (!isAgentThinking) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-4 mb-6"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl shadow-lg shadow-primary/20 animate-glow-pulse">
        {selectedPersona.icon}
      </div>

      <div className="bg-card/60 backdrop-blur-md border border-primary/20 rounded-2xl rounded-tl-sm px-6 py-4 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-primary">Thinking...</span>
        </div>

        {thinkingSteps.length > 0 && (
          <div className="space-y-1 mt-3">
            {thinkingSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-glow-pulse" />
                {step}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { useChatStore } from '@/hooks/useChatStore';

export function ThinkingIndicator() {
  const { isAgentThinking, thinkingSteps, selectedPersona } = useChatStore();

  if (!isAgentThinking) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className="flex gap-4 mb-8"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-foreground flex items-center justify-center text-base">
        {selectedPersona.icon}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">Thinking...</span>
        </div>

        {thinkingSteps.length > 0 && (
          <div className="space-y-0.5 mt-2">
            {thinkingSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                {step}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
